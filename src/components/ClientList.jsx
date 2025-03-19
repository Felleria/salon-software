import { useState } from 'react';

const ClientList = ({ clients, onSelectClient }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <ul className="space-y-2">
                {filteredClients.map(client => (
                    <li
                        key={client.id}
                        onClick={() => onSelectClient(client)}
                        className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                    >
                        {client.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;