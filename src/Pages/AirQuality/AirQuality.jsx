import { useEffect, useState } from 'react';
import { FaSmog, FaWind, FaCloudSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Mock data (replace with real API call)
const mockAirQuality = {
    aqi: 3,
    components: {
        co: 210.21,
        no2: 14.53,
        o3: 33.44,
        pm2_5: 9.12,
        pm10: 16.37,
        so2: 3.21,
    },
};

// AQI level description
const getAQIDescription = (aqi) => {
    const levels = [
        { level: 1, label: 'Good', color: 'text-green-500' },
        { level: 2, label: 'Fair', color: 'text-lime-500' },
        { level: 3, label: 'Moderate', color: 'text-yellow-500' },
        { level: 4, label: 'Poor', color: 'text-orange-500' },
        { level: 5, label: 'Very Poor', color: 'text-red-500' },
    ];
    return levels[aqi - 1] || { label: 'Unknown', color: 'text-gray-500' };
};

const AirQuality = () => {
    const [aqiData, setAqiData] = useState(null);

    useEffect(() => {
        // Fetch real data here
        setAqiData(mockAirQuality);
    }, []);

    if (!aqiData) return null;

    const { label, color } = getAQIDescription(aqiData.aqi);

    return (
        <section className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
                Air Quality Index
            </h2>

            <motion.div
                className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xl font-semibold text-base-content">AQI Level</p>
                        <p className={`text-4xl font-extrabold ${color}`}>{label}</p>
                    </div>
                    <FaSmog className="text-6xl text-accent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-sm sm:text-base text-base-content">
                    <div className="bg-base-200 p-3 rounded-xl">
                        <p className="font-semibold">CO</p>
                        <p>{aqiData.components.co} µg/m³</p>
                    </div>
                    <div className="bg-base-200 p-3 rounded-xl">
                        <p className="font-semibold">NO₂</p>
                        <p>{aqiData.components.no2} µg/m³</p>
                    </div>
                    <div className="bg-base-200 p-3 rounded-xl">
                        <p className="font-semibold">O₃</p>
                        <p>{aqiData.components.o3} µg/m³</p>
                    </div>
                    <div className="bg-base-200 p-3 rounded-xl">
                        <p className="font-semibold">PM2.5</p>
                        <p>{aqiData.components.pm2_5} µg/m³</p>
                    </div>
                    <div className="bg-base-200 p-3 rounded-xl">
                        <p className="font-semibold">PM10</p>
                        <p>{aqiData.components.pm10} µg/m³</p>
                    </div>
                    <div className="bg-base-200 p-3 rounded-xl">
                        <p className="font-semibold">SO₂</p>
                        <p>{aqiData.components.so2} µg/m³</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AirQuality;