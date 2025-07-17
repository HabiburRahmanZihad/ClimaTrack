import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { fetchForecastByCity } from '../../services/weatherService';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-base-300 border border-base-200 rounded-md p-3 shadow-lg text-sm">
        <p className="font-semibold">{label}</p>
        <p className="text-primary">{payload[0].value}°C</p>
      </div>
    );
  }
  return null;
};

const Forecast = () => {
  const [city, setCity] = useState('Chittagong');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadForecast = async () => {
    try {
      setLoading(true);
      const data = await fetchForecastByCity(city);

      // Take one forecast per day (every 8th item = 24 hrs)
      const filtered = data.list.filter((_, idx) => idx % 8 === 0);

      // Format data
      const formatted = filtered.map((item) => ({
        dt_txt: new Date(item.dt_txt).toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        temp: Math.round(item.main.temp), // Celsius
      }));

      setForecast(formatted);
    } catch (err) {
      console.error('Error loading forecast:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForecast();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-primary mb-6 font-serif">
        5-Day Temperature Forecast
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadForecast();
        }}
        className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="input input-bordered input-primary w-full sm:max-w-xs px-4 py-2 text-base"
        />
        <button
          type="submit"
          className="btn btn-primary px-6 py-2 text-base"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load'}
        </button>
      </form>

      <div className="bg-base-100 dark:bg-base-200 border border-base-300 shadow-xl rounded-xl p-6">
        {forecast.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={forecast} margin={{ top: 20, right: 30, bottom: 5, left: 10 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis
                dataKey="dt_txt"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                unit="°C"
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="url(#tempGradient)"
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: '#3b82f6',
                  strokeWidth: 2,
                  fill: '#ffffff',
                }}
                activeDot={{ r: 7 }}
                animationDuration={700}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-base-content opacity-70">No forecast data available.</p>
        )}
      </div>
    </section>
  );
};

export default Forecast;