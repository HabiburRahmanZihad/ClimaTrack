import { useEffect, useState } from 'react';
import { WiDaySunny, WiRain, WiCloud, WiSnow } from 'react-icons/wi';
import { motion } from 'framer-motion';

const mockForecast = [
    { day: 'Monday', temp: 28, description: 'Sunny', icon: <WiDaySunny size={48} />, humidity: 40, wind: 3 },
    { day: 'Tuesday', temp: 24, description: 'Cloudy', icon: <WiCloud size={48} />, humidity: 55, wind: 5 },
    { day: 'Wednesday', temp: 22, description: 'Rainy', icon: <WiRain size={48} />, humidity: 65, wind: 7 },
    { day: 'Thursday', temp: 18, description: 'Snow', icon: <WiSnow size={48} />, humidity: 70, wind: 6 },
    { day: 'Friday', temp: 26, description: 'Sunny', icon: <WiDaySunny size={48} />, humidity: 45, wind: 4 },
    { day: 'Saturday', temp: 27, description: 'Sunny', icon: <WiDaySunny size={48} />, humidity: 35, wind: 2 },
    { day: 'Sunday', temp: 23, description: 'Cloudy', icon: <WiCloud size={48} />, humidity: 50, wind: 4 },
];

const Weekly = () => {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        // Here you would call a real API
        setForecast(mockForecast);
    }, []);

    return (
        <section className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold font-serif text-primary mb-6 text-center">
                Weekly Weather Forecast
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {forecast.map((day, index) => (
                    <motion.div
                        key={index}
                        className="bg-base-100 p-5 rounded-2xl shadow-lg border border-base-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-primary">{day.day}</h3>
                            <div className="text-4xl text-accent">{day.icon}</div>
                        </div>
                        <p className="text-5xl font-bold text-base-content mb-2">{day.temp}°C</p>
                        <p className="capitalize mb-2 text-base-content">{day.description}</p>
                        <div className="text-sm text-base-content opacity-80 space-y-1">
                            <p>💧 Humidity: {day.humidity}%</p>
                            <p>🌬️ Wind: {day.wind} m/s</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Weekly;