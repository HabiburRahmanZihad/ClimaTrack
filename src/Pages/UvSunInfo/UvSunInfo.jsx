import { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { fetchUvSunData } from '../../services/weatherService';

const UvSunInfo = ({ defaultCity = 'Chittagong' }) => {
    const [city, setCity] = useState(defaultCity);
    const [inputCity, setInputCity] = useState(defaultCity);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async (targetCity) => {
        setLoading(true);
        setData(null);
        setError(null);

        try {
            const res = await fetchUvSunData(targetCity);
            if (!res || typeof res !== 'object') {
                throw new Error('Invalid response from API');
            }
            setData(res);
        } catch (err) {
            console.error('Error fetching UV/Sun data:', err);
            setError(err?.message || 'An unknown error occurred');
            Swal.fire({
                icon: 'error',
                title: 'Failed to Load Data',
                text: err?.message || 'Could not fetch UV and sun data. Please check the city name and try again.',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData(city);
    }, [city, loadData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedCity = inputCity.trim();
        if (!trimmedCity) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Input',
                text: 'Please enter a valid city name.',
            });
            return;
        }
        setCity(trimmedCity);
    };

    const getUvLevel = (v) => {
        if (v == null) return { label: 'Unavailable', color: 'bg-gray-400' };
        if (v <= 2) return { label: 'Low', color: 'bg-green-500' };
        if (v <= 5) return { label: 'Moderate', color: 'bg-yellow-400' };
        if (v <= 7) return { label: 'High', color: 'bg-orange-500' };
        if (v <= 10) return { label: 'Very High', color: 'bg-red-500' };
        return { label: 'Extreme', color: 'bg-purple-700' };
    };

    const formatTime = (ts) =>
        new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const daylightDuration = (sunrise, sunset) => {
        const duration = sunset - sunrise;
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <section className="max-w-3xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl transition-all duration-300">
            <h2 className="text-3xl font-bold font-serif text-primary mb-8 text-center">
                ☀️ UV & Sunlight Info
            </h2>

            {/* Search Form */}
            <form
                onSubmit={handleSubmit}
                className="flex justify-center gap-3 mb-8 flex-wrap"
                role="search"
                aria-label="City UV search form"
            >
                <input
                    type="text"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    placeholder="Enter city name"
                    className="input input-bordered input-primary w-full sm:w-64 px-3 py-2"
                    disabled={loading}
                    aria-label="City name input"
                />
                <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 transition-transform hover:scale-105"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {/* State: Loading */}
            {loading && (
                <p className="text-center text-lg font-medium mt-6 animate-pulse">
                    🔄 Loading UV & sun info...
                </p>
            )}

            {/* State: Error */}
            {!loading && error && (
                <div className="text-center mt-6">
                    <p className="text-red-600 mb-4 text-base">⚠️ {error}</p>
                    <button
                        className="btn btn-error"
                        onClick={() => loadData(city)}
                        aria-label="Retry loading data"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* State: Success */}
            {!loading && data && (
                <>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* UV Index Card */}
                        <div className="p-5 rounded-lg border border-base-300 bg-gradient-to-br from-accent to-primary text-white text-center shadow-lg transition hover:shadow-2xl">
                            <h3 className="text-xl font-semibold mb-2">UV Index</h3>
                            <div className={`text-5xl font-bold ${getUvLevel(data.uvi).color}`}>
                                {data.uvi != null ? data.uvi : 'N/A'}
                            </div>
                            <p className="text-base mt-2 font-medium">{getUvLevel(data.uvi).label} Risk</p>
                        </div>

                        {/* Sunrise / Sunset Card */}
                        <div className="p-5 rounded-lg border border-base-300 bg-base-200 text-base-content shadow transition hover:shadow-xl">
                            <h3 className="text-xl font-semibold mb-3 text-primary">Sunrise & Sunset</h3>
                            <p>🌅 <strong>Sunrise:</strong> {formatTime(data.sunrise)}</p>
                            <p>🌇 <strong>Sunset:</strong> {formatTime(data.sunset)}</p>
                            <p className="mt-2 text-sm opacity-80">
                                ⏱️ Daylight: <span className="font-medium">{daylightDuration(data.sunrise, data.sunset)}</span>
                            </p>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-8 text-sm bg-base-200 p-5 rounded-lg border border-base-300 shadow">
                        <h4 className="font-semibold text-primary mb-2 text-base">🧴 UV Safety Tips</h4>
                        <ul className="list-disc list-inside space-y-1 text-base-content leading-relaxed">
                            <li>Apply SPF 30+ sunscreen if UV is moderate or higher.</li>
                            <li>Avoid direct sun exposure from 10 AM to 4 PM on high UV days.</li>
                            <li>Use sunglasses, hats, and protective clothing.</li>
                            <li>Seek shade when outdoors during peak hours.</li>
                        </ul>
                    </div>
                </>
            )}
        </section>
    );
};

export default UvSunInfo;