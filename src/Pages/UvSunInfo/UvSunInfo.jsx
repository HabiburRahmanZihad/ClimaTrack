const UvSunInfo = ({ uvi = 6, sunrise, sunset }) => {
    const getUvLevel = (value) => {
        if (value <= 2) return { label: 'Low', color: 'bg-green-500' };
        if (value <= 5) return { label: 'Moderate', color: 'bg-yellow-400' };
        if (value <= 7) return { label: 'High', color: 'bg-orange-500' };
        if (value <= 10) return { label: 'Very High', color: 'bg-red-500' };
        return { label: 'Extreme', color: 'bg-purple-700' };
    };

    const formatTime = (unixTime) =>
        new Date(unixTime * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

    const uv = getUvLevel(uvi);

    return (
        <section className="max-w-3xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold font-serif text-primary mb-6 text-center">
                UV & Sunlight Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
                {/* UV Index */}
                <div className="p-4 rounded-lg border border-base-300 bg-gradient-to-br from-accent to-primary text-white text-center shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">UV Index</h3>
                    <div className={`text-4xl font-bold ${uv.color}`}>{uvi}</div>
                    <p className="text-base mt-1 font-medium">{uv.label} Risk</p>
                </div>

                {/* Sunrise & Sunset */}
                <div className="p-4 rounded-lg border border-base-300 bg-base-200 text-base-content shadow">
                    <h3 className="text-lg font-semibold mb-2 text-primary">Sunrise & Sunset</h3>
                    <p>🌅 Sunrise: <span className="font-medium">{formatTime(sunrise)}</span></p>
                    <p>🌇 Sunset: <span className="font-medium">{formatTime(sunset)}</span></p>
                    <p className="mt-1 opacity-70 text-sm">
                        Daylight Duration:{' '}
                        <span className="font-medium">
                            {Math.floor((sunset - sunrise) / 3600)}h{' '}
                            {Math.floor(((sunset - sunrise) % 3600) / 60)}m
                        </span>
                    </p>
                </div>
            </div>

            {/* UV Safety Tips */}
            <div className="mt-6 text-sm bg-base-200 p-4 rounded-lg border border-base-300">
                <h4 className="font-semibold text-primary mb-2">☀️ UV Safety Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-base-content">
                    <li>Wear sunscreen (SPF 30+) if UV is moderate or higher.</li>
                    <li>Avoid direct sunlight during 10 AM – 4 PM on high UV days.</li>
                    <li>Wear sunglasses and hats for protection.</li>
                    <li>Seek shade during peak sunlight hours.</li>
                </ul>
            </div>
        </section>
    );
};

export default UvSunInfo;