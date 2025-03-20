import React from "react";

const ServiceRecommendations = () => {
  const recommendations = [
    { id: 1, service: "Haircut", description: "Refresh your look with a new haircut." },
    { id: 2, service: "Color Touch-up", description: "Maintain your vibrant color." },
    { id: 3, service: "Deep Conditioning", description: "Nourish and repair your hair." },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Service Recommendations</h2>
      <ul>
        {recommendations.map((rec) => (
          <li key={rec.id} className="border p-2 mb-2">
            <p className="font-bold">{rec.service}</p>
            <p>{rec.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceRecommendations;