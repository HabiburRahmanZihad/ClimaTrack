import { useEffect, useState } from 'react';
import { WiDaySunny, WiRain, WiCloud, WiSnow } from 'react-icons/wi';
import { motion } from 'framer-motion';
import { geocodeCity, fetchWeeklyForecast } from '../../services/weatherService';

const iconMap = {
    Clear: <WiDaySunny size={48} />,
    Clouds: <WiCloud size={48} />,
    Rain: <WiRain size={48} />,
    Snow: <WiSnow size={48} />,
};

const Weekly = () => {
    const [city, setCity] = useState('Chittagong');
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load forecast only once on mount
    useEffect(() => {
        loadWeekly(city);
    }, []);

    // Moved city as argument, so useEffect doesn't depend on it
    const loadWeekly = async (inputCity) => {
        setLoading(true);
        setError('');
        try {
            let daily;

            try {
                const geo = await geocodeCity(inputCity);
                daily = await fetchWeeklyForecast(geo.lat, geo.lon);
            } catch (geoError) {
                console.warn('Geocoding failed, using direct city:', geoError.message);
                daily = await fetchWeeklyForecast(null, null, inputCity);
            }

            if (!daily || !Array.isArray(daily) || daily.length === 0) {
                throw new Error('No forecast data found');
            }

            const next7 = daily.slice(0, 7).map((d, index) => {
                const weather = d.weather?.[0] ?? { main: 'Clear', description: 'clear sky' };
                const temp = d.temp?.day ?? 25;
                const humidity = d.humidity ?? 50;
                const windSpeed = d.wind_speed ?? 2;
                const timestamp = (d.dt ?? (Date.now() / 1000)) * 1000;

                return {
                    day: new Date(timestamp).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                    }),
                    temp: Math.round(temp),
                    description: weather.main,
                    icon: iconMap[weather.main] || <WiDaySunny size={48} />,
                    humidity: Math.round(humidity),
                    wind: windSpeed.toFixed(1),
                };
            });

            setForecast(next7);
        } catch (err) {
            console.error('Error fetching forecast:', err);
            setForecast([]);
            setError(`Could not load forecast for "${inputCity}". Please check the city name.`);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            loadWeekly(city.trim());
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold font-serif text-primary mb-6 text-center">
                Weekly Weather Forecast
            </h2>

            {/* Responsive Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
                <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="input input-bordered input-primary w-full sm:w-64 px-3 py-2 text-base"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 w-full sm:w-auto"
                    disabled={loading || !city.trim()}
                >
                    {loading ? 'Loading...' : 'Load'}
                </button>
            </form>

            {error && (
                <div className="text-center mb-4">
                    <p className="text-error">{error}</p>
                </div>
            )}

            {loading && (
                <div className="text-center">
                    <p>Loading forecast...</p>
                    <div className="loading loading-spinner loading-md mt-2"></div>
                </div>
            )}

            {!loading && forecast.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {forecast.map((day, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-base-100 p-5 rounded-2xl shadow-lg border border-base-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-semibold text-primary">{day.day}</h3>
                                <div className="text-4xl text-accent">{day.icon}</div>
                            </div>
                            <p className="text-5xl font-bold text-base-content mb-2">
                                {day.temp}°C
                            </p>
                            <p className="capitalize mb-2 text-base-content">{day.description}</p>
                            <div className="text-sm text-base-content opacity-80 space-y-1">
                                <p>💧 Humidity: {day.humidity}%</p>
                                <p>🌬️ Wind: {day.wind} m/s</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && forecast.length === 0 && !error && (
                <div className="text-center text-base-content opacity-60">
                    <p>No forecast data available. Try searching for a city.</p>
                </div>
            )}
        </section>
    );
};

export default Weekly;