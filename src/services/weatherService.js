import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5';

// Fetch current weather data by city name
export const fetchWeatherByCity = async (city) => {
    if (!city) throw new Error('City name is required');
    const res = await axios.get(`${baseUrl}/weather`, {
        params: {
            q: city,
            appid: apiKey,
            units: 'metric',
        },
    });
    return res.data;
};

// Fetch 5-day forecast by city name
export const fetchForecastByCity = async (city) => {
    if (!city) throw new Error('City name is required');
    const res = await axios.get(`${baseUrl}/forecast`, {
        params: {
            q: city,
            appid: apiKey,
            units: 'metric',
        },
    });
    return res.data;
};

// Geocode city name to get lat, lon (with fallback)
export const geocodeCity = async (city) => {
    if (!city) throw new Error('City name is required');

    try {
        // Use OpenWeatherMap geocoding API first
        const res = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: city,
                limit: 1,
                appid: apiKey,
            },
        });

        if (!res.data || res.data.length === 0) throw new Error('City not found');

        // Return first matching city lat/lon
        const { lat, lon } = res.data[0];
        return { lat, lon };
    } catch (error) {
        // Fallback: use current weather API to get coordinates
        console.warn('Geocoding failed, using weather API fallback:', error.message);
        const weatherRes = await axios.get(`${baseUrl}/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric',
            },
        });
        const { lat, lon } = weatherRes.data.coord;
        return { lat, lon };
    }
};

// Fetch and aggregate 7-day forecast data (OpenWeatherMap free tier provides 5-day forecast every 3h)
export const fetchWeeklyForecast = async (lat, lon, city = null) => {
    let params = { appid: apiKey, units: 'metric' };

    if (city && (!lat || !lon)) {
        params.q = city;
    } else if (lat && lon) {
        params.lat = lat;
        params.lon = lon;
    } else {
        throw new Error('Either city or lat/lon coordinates must be provided');
    }

    const res = await axios.get(`${baseUrl}/forecast`, { params });

    if (!res.data || !res.data.list) {
        throw new Error('Invalid forecast data received');
    }

    // Group forecast by day and aggregate temperature, humidity, wind speed
    const dailyData = {};

    res.data.list.forEach((item) => {
        const dateStr = new Date(item.dt * 1000).toDateString();
        if (!dailyData[dateStr]) {
            dailyData[dateStr] = {
                temps: [],
                humidity: [],
                wind_speed: [],
                weather: item.weather[0], // Take first weather object as representative
                dt: item.dt,
            };
        }

        dailyData[dateStr].temps.push(item.main.temp);
        dailyData[dateStr].humidity.push(item.main.humidity);
        dailyData[dateStr].wind_speed.push(item.wind.speed);
    });

    // Calculate averages per day
    const dailyForecast = Object.values(dailyData).map((day) => ({
        dt: day.dt,
        temp: {
            day: day.temps.reduce((sum, val) => sum + val, 0) / day.temps.length,
        },
        humidity: day.humidity.reduce((sum, val) => sum + val, 0) / day.humidity.length,
        wind_speed: day.wind_speed.reduce((sum, val) => sum + val, 0) / day.wind_speed.length,
        weather: [day.weather], // Keep as array for consistency with your original data
    }));

    // Fill missing days to ensure at least 7 days of data
    const requiredDays = 7;
    if (dailyForecast.length < requiredDays) {
        const lastDay = dailyForecast[dailyForecast.length - 1];
        for (let i = 1; i <= requiredDays - dailyForecast.length; i++) {
            const nextDt = lastDay.dt + i * 86400; // Add i days in seconds
            dailyForecast.push({
                dt: nextDt,
                temp: { day: lastDay.temp.day },
                humidity: lastDay.humidity,
                wind_speed: lastDay.wind_speed,
                weather: lastDay.weather,
            });
        }
    }

    return dailyForecast;
};