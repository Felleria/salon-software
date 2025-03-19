import { useState, useEffect } from 'react';
import { getClientServices } from '../api/api';
import ClientForm from '../components/ClientForm';
import ServiceHistory from '../components/ServiceHistory';
import Preferences from "../components/Preferences";



const Profile = ({ client }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getClientServices(client.id);
            setServices(data);
        };
        fetchServices();
    }, [client.id]);

    return (
        <div className="space-y-4">
            <ClientForm client={client} onSubmit={(data) => console.log(data)} />
            <ServiceHistory services={services} />
            <Preferences preferences={client.preferences} onUpdatePreferences={(data) => console.log(data)} />
        </div>
    );
};

export default Profile;