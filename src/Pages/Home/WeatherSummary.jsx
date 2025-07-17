import {
    WiThermometer,
    WiHumidity,
    WiStrongWind,
    WiSunrise,
    WiSunset,
    WiDayFog,
} from 'react-icons/wi';
import { motion } from 'framer-motion';


const WeatherSummary = ({ weather }) => {
    const formatTime = (unixTime) =>
        new Date(unixTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const summaryData = [
        { label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°C`, icon: <WiThermometer /> },
        { label: 'Humidity', value: `${weather.main.humidity}%`, icon: <WiHumidity /> },
        { label: 'Wind Speed', value: `${weather.wind.speed} m/s`, icon: <WiStrongWind /> },
        { label: 'Sunrise', value: formatTime(weather.sys.sunrise), icon: <WiSunrise /> },
        { label: 'Sunset', value: formatTime(weather.sys.sunset), icon: <WiSunset /> },
        { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: <WiDayFog /> },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm sm:text-base">
            {summaryData.map((item, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-md border border-white/20 flex flex-col items-center space-y-1"
                >
                    <div className="text-3xl text-neutral">{item.icon}</div>
                    <p className="font-semibold text-sm text-primary">{item.label}</p>
                    <p className="text-sm text-neutral">{item.value}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default WeatherSummary;