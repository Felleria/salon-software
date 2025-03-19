import { useState } from 'react';

const ServiceHistory = ({ services }) => {
    const [filter, setFilter] = useState({ serviceType: '', stylist: '', dateRange: '' });

    const filteredServices = services.filter(service =>
        service.service_type.toLowerCase().includes(filter.serviceType.toLowerCase()) &&
        service.stylist.toLowerCase().includes(filter.stylist.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Filter by service type"
                    value={filter.serviceType}
                    onChange={(e) => setFilter({ ...filter, serviceType: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Filter by stylist"
                    value={filter.stylist}
                    onChange={(e) => setFilter({ ...filter, stylist: e.target.value })}
                    className="p-2 border rounded"
                />
            </div>
            <ul className="space-y-2">
                {filteredServices.map(service => (
                    <li key={service.id} className="p-2 border rounded">
                        <p><strong>Date:</strong> {service.date_time}</p>
                        <p><strong>Service:</strong> {service.service_type}</p>
                        <p><strong>Stylist:</strong> {service.stylist}</p>
                        <p><strong>Cost:</strong> ${service.cost}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceHistory;