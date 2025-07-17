import { useState } from 'react';
import { fetchWeatherByCity } from '../../services/weatherService';


const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        try {
            setLoading(true);
            const data = await fetchWeatherByCity(city);
            setWeather(data);
            setError('');
        } catch (err) {
            setError('City not found.');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-yellow-300">Check Current Weather</h2>
            <form onSubmit={handleSearch} className="flex gap-2 justify-center">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-4 py-2 border rounded w-full max-w-sm dark:bg-gray-700 dark:text-white"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </form>

            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {weather && (
                <div className="mt-6 p-4 rounded shadow-md bg-white dark:bg-gray-700">
                    <h3 className="text-xl font-bold mb-2">{weather.name}, {weather.sys.country}</h3>
                    <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
                    <p className="capitalize">{weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Home;