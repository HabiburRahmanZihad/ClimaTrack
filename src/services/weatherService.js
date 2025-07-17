import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city) => {
    const res = await axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
    return res.data;
};

export const fetchForecastByCity = async (city) => {
    const res = await axios.get(`${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`);
    return res.data;
};

export const geocodeCity = async (city) => {
    try {
        // Try geocoding API first
        const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        if (!res.data.length) throw new Error('City not found');
        return res.data[0]; // { lat, lon }
    } catch (error) {
        // Fallback: use current weather API to get coordinates
        console.log('Geocoding failed, using weather API fallback');
        const weatherRes = await axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
        return {
            lat: weatherRes.data.coord.lat,
            lon: weatherRes.data.coord.lon
        };
    }
};

// Function to use the free 5-day forecast API
export const fetchWeeklyForecast = async (lat, lon, city = null) => {
    let url;
    if (city && (!lat || !lon)) {
        url = `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;
    } else {
        url = `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    const res = await axios.get(url);
    const forecastData = res.data.list;
    const dailyData = {};

    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyData[date]) {
            dailyData[date] = {
                temps: [],
                humidity: [],
                wind_speed: [],
                weather: item.weather[0],
                dt: item.dt
            };
        }
        dailyData[date].temps.push(item.main.temp);
        dailyData[date].humidity.push(item.main.humidity);
        dailyData[date].wind_speed.push(item.wind.speed);
    });

    let dailyForecast = Object.values(dailyData).map(day => ({
        dt: day.dt,
        temp: {
            day: day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length
        },
        humidity: day.humidity.reduce((sum, hum) => sum + hum, 0) / day.humidity.length,
        wind_speed: day.wind_speed.reduce((sum, wind) => sum + wind, 0) / day.wind_speed.length,
        weather: [day.weather]
    }));

    // Fill in missing days if less than 7
    const missingDays = 7 - dailyForecast.length;
    if (missingDays > 0) {
        const lastDay = dailyForecast[dailyForecast.length - 1];
        for (let i = 1; i <= missingDays; i++) {
            const nextDt = lastDay.dt + 86400 * i; // Add 1 day in seconds
            dailyForecast.push({
                dt: nextDt,
                temp: { day: lastDay.temp.day },
                humidity: lastDay.humidity,
                wind_speed: lastDay.wind_speed,
                weather: lastDay.weather
            });
        }
    }

    return dailyForecast;
};