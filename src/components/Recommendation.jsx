const Recommendation = () => {
    const recommendations = [
        { id: 1, service: 'Haircut', description: 'Recommended for a fresh look.' },
        { id: 2, service: 'Facial', description: 'Perfect for glowing skin.' },
    ];

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-bold">Service Recommendations</h3>
            <ul className="space-y-2">
                {recommendations.map(rec => (
                    <li key={rec.id} className="p-2 border rounded">
                        <p><strong>{rec.service}</strong>: {rec.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendation;