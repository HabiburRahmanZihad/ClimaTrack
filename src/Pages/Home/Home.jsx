

import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from '../../services/weatherService';
import Lottie from 'lottie-react';
import weatherAnimation from '../../assets/animation/clouds loop.json';
import { motion } from 'framer-motion';
import WeatherSummary from './WeatherSummary';
import WeatherDetails from './WeatherDetails';



const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchDefaultCity = async () => {
            setLoading(true);
            try {
                const data = await fetchWeatherByCity('Chittagong');
                setWeather(data);
            } catch {
                setError('Failed to load default city.');
            } finally {
                setLoading(false);
            }
        };
        fetchDefaultCity();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError('');
        setWeather(null);

        try {
            const data = await fetchWeatherByCity(city.trim());
            setWeather(data);
            setCity('');
        } catch {
            setError('City not found. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
        if (error) setError('');
    };

    return (
        <main className="w-full px-4 sm:px-6 md:px-8 mt-10 text-center space-y-8">
            <header className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-bold font-serif text-primary">
                    Weather Dashboard
                </h2>
                <p className="text-neutral">
                    {dateTime.toLocaleDateString()} — {dateTime.toLocaleTimeString()}
                </p>
            </header>

            <Lottie
                animationData={weatherAnimation}
                loop
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
            />

            <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    className="input input-bordered w-full sm:max-w-sm text-lg px-4 py-3 dark:input-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Enter city"
                    autoFocus
                />

                <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto text-lg px-6 py-3"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner text-base-100"></span>
                    ) : (
                        'Search'
                    )}
                </button>
            </form>

            <div className="min-h-[1.5rem]" aria-live="polite">
                {loading && (
                    <div className="flex justify-center py-4">
                        <span className="loading loading-dots loading-lg text-primary" />
                    </div>
                )}
                {error && (
                    <p className="text-error font-medium" role="alert">
                        {error}
                    </p>
                )}
                {!loading && !weather && !error && (
                    <p className="text-neutral text-center">No weather data available.</p>
                )}
            </div>

            {weather && (
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                    className="bg-gradient-to-br from-blue-600 to-blue-400 dark:from-primary dark:to-accent text-white p-6 rounded-2xl shadow-2xl space-y-6 max-w-4xl mx-auto"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold font-serif">
                                {weather.name}, {weather.sys.country}
                            </h3>
                            <p className="capitalize opacity-90">
                                {weather.weather[0].description}
                            </p>
                        </div>
                        <div className="text-6xl font-extrabold" aria-live="polite">
                            {Math.round(weather.main.temp)}°C
                        </div>
                    </div>

                    <div>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            className="mx-auto w-32 drop-shadow-md"
                        />
                    </div>

                    <WeatherSummary weather={weather} />

                    <button
                        onClick={() => setShowMore((prev) => !prev)}
                        className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-primary transition"
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>

                    {showMore && <WeatherDetails weather={weather} />}
                </motion.section>
            )}
        </main>
    );
};

export default Home;