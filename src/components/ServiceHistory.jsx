import React, { useState, useEffect } from "react";

const ServiceHistory = ({ clientId }) => {
  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState({
    service_type: "",
    stylist: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    fetchServices();
  }, [filters]);

  const fetchServices = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/services/${clientId}?${query}`);
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          name="service_type"
          placeholder="Service Type"
          value={filters.service_type}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="stylist"
          placeholder="Stylist"
          value={filters.stylist}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="start_date"
          value={filters.start_date}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="end_date"
          value={filters.end_date}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Service Type</th>
            <th className="border p-2">Stylist</th>
            <th className="border p-2">Products Used</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Satisfaction Rating</th>
            <th className="border p-2">Before/After Photos</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="border p-2">{service.date_time}</td>
              <td className="border p-2">{service.service_type}</td>
              <td className="border p-2">{service.stylist}</td>
              <td className="border p-2">{service.products_used}</td>
              <td className="border p-2">${service.cost}</td>
              <td className="border p-2">{service.satisfaction_rating}/5</td>
              <td className="border p-2">
                <div className="w-16 h-16 bg-gray-200">Placeholder</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceHistory;