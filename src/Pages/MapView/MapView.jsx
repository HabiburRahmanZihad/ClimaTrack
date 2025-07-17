import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { geocodeCity } from '../../services/weatherService';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Jump animation effect
const ChangeMapView = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
        if (coords.lat && coords.lon) {
            map.flyTo([coords.lat, coords.lon], 10, {
                duration: 1.5, // seconds
            });
        }
    }, [coords.lat, coords.lon, map]);

    return null;
};

const MapView = () => {
    const [city, setCity] = useState('Chittagong');
    const [coords, setCoords] = useState({ lat: 22.3569, lon: 91.7832 }); // Default: Chittagong
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError('');
        try {
            const geo = await geocodeCity(city.trim());
            setCoords({ lat: geo.lat, lon: geo.lon });
        } catch (err) {
            setError('Failed to find location. Please check the city name.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
                Weather Map View
            </h2>

            <form onSubmit={handleSearch} className="flex justify-center gap-3 mb-6 flex-wrap">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input input-bordered input-primary w-full sm:w-64 px-3 py-2"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="btn btn-primary px-4 py-2"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p className="text-error text-center mb-4">{error}</p>}

            <div className="rounded-xl overflow-hidden shadow-lg border border-base-300">
                <MapContainer
                    center={[coords.lat, coords.lon]}
                    zoom={10}
                    scrollWheelZoom={true}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    />
                    <ChangeMapView coords={coords} />
                    <Marker position={[coords.lat, coords.lon]}>
                        <Popup>{city}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </section>
    );
};

export default MapView;