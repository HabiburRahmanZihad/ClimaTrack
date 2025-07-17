import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default marker fix (Leaflet icon won't show unless this is applied)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = ({ coords = { lat: 51.505, lon: -0.09 }, city = 'Your Location' }) => {
    const [position, setPosition] = useState([coords.lat, coords.lon]);

    useEffect(() => {
        if (coords.lat && coords.lon) {
            setPosition([coords.lat, coords.lon]);
        }
    }, [coords]);

    return (
        <section className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4 text-center">
                Weather Map View
            </h2>

            <div className="rounded-xl overflow-hidden shadow-lg border border-base-300">
                <MapContainer
                    center={position}
                    zoom={10}
                    scrollWheelZoom={true}
                    className="h-[400px] w-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>{city}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </section>
    );
};

export default MapView;