import {
    WiThermometer,
    WiBarometer,
    WiDirectionUp,
    WiCloudy,
    WiTime3,
    WiDaySunnyOvercast
} from 'react-icons/wi';

import { motion } from 'framer-motion';
const WeatherDetails = ({ weather }) => {
    const detailData = [
        { label: 'Min Temp', value: `${Math.round(weather.main.temp_min)}°C`, icon: <WiThermometer /> },
        { label: 'Max Temp', value: `${Math.round(weather.main.temp_max)}°C`, icon: <WiThermometer /> },
        { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: <WiBarometer /> },
        { label: 'Wind Direction', value: `${weather.wind.deg}°`, icon: <WiDirectionUp /> },
        { label: 'Cloudiness', value: `${weather.clouds.all}%`, icon: <WiCloudy /> },
        { label: 'Timezone', value: `UTC${weather.timezone >= 0 ? '+' : ''}${weather.timezone / 3600}`, icon: <WiTime3 /> },
        { label: 'Coord', value: `[${weather.coord.lat}, ${weather.coord.lon}]`, icon: <WiCloudy /> },
        { label: 'Condition ID', value: weather.weather[0].id, icon: <WiDaySunnyOvercast /> },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm sm:text-base pt-4 border-t border-white/20">
            {detailData.map((item, i) => (
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

export default WeatherDetails;