import {
    WiThermometer,
    WiHumidity,
    WiStrongWind,
    WiSunrise,
    WiSunset,
    WiDayFog,
    WiBarometer,
    WiDirectionUp,
    WiCloudy,
    WiTime3,

    WiDaySunnyOvercast
} from 'react-icons/wi';

import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from '../../services/weatherService';
import Lottie from 'lottie-react';
import weatherAnimation from '../../assets/animation/clouds loop.json';
import { motion } from 'framer-motion'; // <-- Import Framer Motion

const formatTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

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
                    className="input input-bordered w-full sm:max-w-sm text-lg px-4 py-3 dark:input-primary"
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
                {loading && <p className="text-base-content opacity-70">Fetching data...</p>}
                {error && (
                    <p className="text-error font-medium" role="alert">
                        {error}
                    </p>
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
                        <div className="text-6xl font-extrabold">
                            {Math.round(weather.main.temp)}°C
                        </div>
                    </div>

                    <div>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt={weather.weather[0].description}
                            className="mx-auto w-32"
                        />
                    </div>

                    {/* Summary Cards with Icons */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm sm:text-base">
                        {[
                            { label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°C`, icon: <WiThermometer /> },
                            { label: 'Humidity', value: `${weather.main.humidity}%`, icon: <WiHumidity /> },
                            { label: 'Wind Speed', value: `${weather.wind.speed} m/s`, icon: <WiStrongWind /> },
                            { label: 'Sunrise', value: formatTime(weather.sys.sunrise), icon: <WiSunrise /> },
                            { label: 'Sunset', value: formatTime(weather.sys.sunset), icon: <WiSunset /> },
                            { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: <WiDayFog /> },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-md border border-white/20 flex flex-col items-center space-y-1"
                            >
                                <div className="text-3xl text-neutral">{item.icon}</div>
                                <p className="font-semibold text-sm text-primary">{item.label}</p>
                                <p className="text-sm text-neutral">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Show More Toggle Button */}
                    <button
                        onClick={() => setShowMore((prev) => !prev)}
                        className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-primary transition"
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>

                    {/* Expanded Cards with Icons */}
                    {showMore && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm sm:text-base pt-4 border-t border-white/20">
                            {[
                                { label: 'Min Temp', value: `${Math.round(weather.main.temp_min)}°C`, icon: <WiThermometer /> },
                                { label: 'Max Temp', value: `${Math.round(weather.main.temp_max)}°C`, icon: <WiThermometer /> },
                                { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: <WiBarometer /> },
                                { label: 'Wind Direction', value: `${weather.wind.deg}°`, icon: <WiDirectionUp /> },
                                { label: 'Cloudiness', value: `${weather.clouds.all}%`, icon: <WiCloudy /> },
                                { label: 'Timezone', value: `UTC${weather.timezone >= 0 ? '+' : ''}${weather.timezone / 3600}`, icon: <WiTime3 /> },
                                { label: 'Coord', value: `[${weather.coord.lat}, ${weather.coord.lon}]`, icon: <WiCloudy /> },
                                { label: 'Condition ID', value: weather.weather[0].id, icon: <WiDaySunnyOvercast /> },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-md border border-white/20 flex flex-col items-center space-y-1"
                                >
                                    <div className="text-3xl text-neutral">{item.icon}</div>
                                    <p className="font-semibold text-sm text-primary">{item.label}</p>
                                    <p className="text-sm text-neutral">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.section>
            )}

        </main>
    );
};

export default Home;