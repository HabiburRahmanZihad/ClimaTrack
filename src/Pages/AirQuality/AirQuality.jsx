import { useState, useEffect } from 'react';
import { FaSmog, FaWind, FaTint, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// AQI levels info and health recommendations
const AQI_LEVELS = [
    { level: 1, label: 'Good', color: 'text-green-500', advice: 'Air quality is satisfactory.' },
    { level: 2, label: 'Fair', color: 'text-lime-500', advice: 'Air quality is acceptable.' },
    { level: 3, label: 'Moderate', color: 'text-yellow-500', advice: 'Some pollutants may be a moderate health concern.' },
    { level: 4, label: 'Poor', color: 'text-orange-500', advice: 'Sensitive groups should reduce outdoor exertion.' },
    { level: 5, label: 'Very Poor', color: 'text-red-500', advice: 'Everyone may experience health effects; avoid outdoor activity.' },
];

const getAQIDescription = (aqi) => {
    return AQI_LEVELS[aqi - 1] || { label: 'Unknown', color: 'text-gray-500', advice: 'No data available' };
};

// Helper to find main pollutant with highest concentration
const getMainPollutant = (components) => {
    if (!components) return null;
    const entries = Object.entries(components);
    entries.sort(([, a], [, b]) => b - a); // descending by value
    return entries[0]; // [key, value]
};

// Format Unix timestamp to readable string
const formatTimestamp = (dt) => {
    if (!dt) return '';
    const date = new Date(dt * 1000);
    return date.toLocaleString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const AirQuality = () => {
    const [city, setCity] = useState('Chittagong');
    const [aqiData, setAqiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Replace with your own OpenWeatherMap API key in your .env file
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_OPENWEATHERMAP_API_KEY';

    const fetchAirQuality = async (cityName) => {
        setLoading(true);
        setError('');
        setAqiData(null);

        try {
            // 1. Get coordinates from city name
            const geoRes = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
            );
            if (!geoRes.ok) throw new Error('Failed to fetch geolocation');
            const geoData = await geoRes.json();

            if (!geoData.length) {
                throw new Error('City not found');
            }
            const { lat, lon } = geoData[0];

            // 2. Get air pollution data using coords
            const airRes = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );
            if (!airRes.ok) throw new Error('Failed to fetch air quality data');
            const airData = await airRes.json();

            if (!airData.list || !airData.list.length) {
                throw new Error('No air quality data found');
            }

            // Extract data
            const pollution = airData.list[0];
            const { components } = pollution;
            const aqi = pollution.main.aqi;
            const timestamp = pollution.dt;

            // Wind & humidity data require extra call — OpenWeather's air pollution API does NOT include them
            // So we can fetch weather data separately:
            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const weatherData = await weatherRes.json();

            setAqiData({
                aqi,
                components,
                timestamp,
                wind_speed: weatherData.wind?.speed || null,
                humidity: weatherData.main?.humidity || null,
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch air quality data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAirQuality(city);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchAirQuality(city.trim());
        }
    };

    const aqiDescription = aqiData ? getAQIDescription(aqiData.aqi) : null;
    const mainPollutant = aqiData ? getMainPollutant(aqiData.components) : null;

    return (
        <section className="max-w-3xl mx-auto px-4 py-8" aria-label="Air Quality Index">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
                Air Quality Index
            </h2>

            <form onSubmit={handleSubmit} className="flex justify-center mb-6 gap-3" role="search" aria-label="Search city air quality">
                <input
                    type="text"
                    placeholder="Enter city name"
                    aria-label="City name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input input-bordered input-primary w-full sm:w-64 px-3 py-2"
                    disabled={loading}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary px-4 py-2"
                    disabled={loading || !city.trim()}
                    aria-disabled={loading || !city.trim()}
                >
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>

            {error && (
                <p role="alert" className="text-center text-error mb-4">
                    {error}
                </p>
            )}

            {!loading && aqiData && aqiDescription && (
                <motion.div
                    className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="region"
                    aria-live="polite"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xl font-semibold text-base-content">AQI Level</p>
                            <p className={`text-4xl font-extrabold ${aqiDescription.color}`}>
                                {aqiDescription.label} <span className="text-lg font-normal">(AQI: {aqiData.aqi})</span>
                            </p>
                            <p className="mt-1 text-sm italic text-base-content/70">{aqiDescription.advice}</p>
                        </div>
                        <FaSmog className="text-6xl text-accent" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-sm sm:text-base text-base-content">
                        {aqiData.components &&
                            Object.entries(aqiData.components).map(([key, value]) => {
                                const labelMap = {
                                    co: 'CO',
                                    no2: 'NO₂',
                                    o3: 'O₃',
                                    pm2_5: 'PM2.5',
                                    pm10: 'PM10',
                                    so2: 'SO₂',
                                };
                                return (
                                    <div key={key} className="bg-base-200 p-3 rounded-xl">
                                        <p className="font-semibold">{labelMap[key] || key.toUpperCase()}</p>
                                        <p>{value.toFixed(2)} µg/m³</p>
                                    </div>
                                );
                            })}
                    </div>

                    {/* Additional details */}
                    <div className="mt-6 text-base-content/80 space-y-2">
                        {mainPollutant && (
                            <p>
                                <FaInfoCircle className="inline mr-2 text-accent" aria-hidden="true" />
                                Main pollutant: <strong>{mainPollutant[0].toUpperCase()}</strong> ({mainPollutant[1].toFixed(2)} µg/m³)
                            </p>
                        )}

                        {aqiData.timestamp && (
                            <p>
                                <FaInfoCircle className="inline mr-2 text-accent" aria-hidden="true" />
                                Data timestamp: <time dateTime={new Date(aqiData.timestamp * 1000).toISOString()}>{formatTimestamp(aqiData.timestamp)}</time>
                            </p>
                        )}

                        {aqiData.wind_speed !== null && (
                            <p>
                                <FaWind className="inline mr-2 text-accent" aria-hidden="true" />
                                Wind speed: <strong>{aqiData.wind_speed} m/s</strong>
                            </p>
                        )}

                        {aqiData.humidity !== null && (
                            <p>
                                <FaTint className="inline mr-2 text-accent" aria-hidden="true" />
                                Humidity: <strong>{aqiData.humidity}%</strong>
                            </p>
                        )}
                    </div>

                    {/* AQI Legend */}
                    <div className="mt-8 border-t pt-4 text-sm text-center text-base-content/70">
                        <p className="mb-2 font-semibold">AQI Levels Legend</p>
                        <ul className="flex justify-center gap-3 flex-wrap">
                            {AQI_LEVELS.map(({ level, label, color }) => (
                                <li key={level} className={`px-2 py-1 rounded ${color} bg-base-200`}>
                                    {level} = {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            )}

            {loading && (
                <p className="text-center mt-4" aria-live="assertive">
                    Loading air quality data...
                </p>
            )}
        </section>
    );
};

export default AirQuality;