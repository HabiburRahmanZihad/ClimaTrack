import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchForecastByCity } from '../../services/weatherService';

const Forecast = () => {
  const [city, setCity] = useState('Dhaka');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadForecast = async () => {
    try {
      setLoading(true);
      const data = await fetchForecastByCity(city);
      const filtered = data.list.filter((_, idx) => idx % 8 === 0); // every 24 hrs
      setForecast(filtered.map((item) => ({
        dt_txt: item.dt_txt,
        temp: item.main.temp,
      })));
    } catch (err) {
      console.error('Error loading forecast:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForecast();
  }, [city]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600 dark:text-yellow-300">
        5-Day Temperature Forecast
      </h2>
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button onClick={loadForecast} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Load
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading forecast...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecast}>
            <XAxis dataKey="dt_txt" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Forecast;
