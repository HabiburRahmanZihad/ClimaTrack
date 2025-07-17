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