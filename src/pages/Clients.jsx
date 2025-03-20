import { useState, useEffect } from 'react';
import { getClients } from '../api/api';
import ClientList from '../components/ClientList';
// import ClientProfile from '../components/ClientProfile';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getClients();
            setClients(data);
        };
        fetchClients();
    }, []);

    return (
        <div className="flex">
            <div className="w-1/3 p-4">
                <ClientList clients={clients} onSelectClient={setSelectedClient} />
            </div>
            <div className="w-2/3 p-4">
                {selectedClient ? <ClientProfile client={selectedClient} /> : <p>Select a client to view details.</p>}
            </div>
        </div>
    );
};

export default Clients;