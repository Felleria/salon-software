import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ServiceHistory from './ServiceHistory';
import ClientPreferences from './ClientPreferences';

function ClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [services, setServices] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch client details
        const clientResponse = await fetch(`http://localhost:5555/clients/${clientId}`);
        if (!clientResponse.ok) {
          throw new Error('Failed to fetch client data');
        }
        const clientData = await clientResponse.json();
        setClient(clientData);

        // Fetch client services
        const servicesResponse = await fetch(`http://localhost:5555/services/${clientId}`);
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
        }

        // Fetch client preferences
        const preferencesResponse = await fetch(`http://localhost:5555/preferences/${clientId}`);
        if (preferencesResponse.ok) {
          const preferencesData = await preferencesResponse.json();
          setPreferences(preferencesData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching client data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  const handleDeleteClient = async () => {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:5555/clients/${clientId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete client');
        }

        navigate('/clients');
      } catch (err) {
        console.error('Error deleting client:', err);
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md">
        <p className="font-bold">Client Not Found</p>
        <p>The client you're looking for doesn't exist or has been deleted.</p>
        <Link to="/clients" className="mt-2 inline-block text-purple-600 hover:text-purple-800">
          Return to clients list
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Client Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {client.photo_url ? (
                <img src={client.photo_url} alt={client.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:ml-6 flex-1 flex flex-col justify-center text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
            <div className="mt-2 text-gray-600">
              <p>{client.contact_details}</p>
              <p className="mt-1">{client.hair_skin_type}</p>
            </div>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <Link to={`/clients/${clientId}/edit`} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                Edit
              </Link>
              <Link to={`/services/new/${clientId}`} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Service
              </Link>
              <button 
                onClick={handleDeleteClient}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'profile' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'services' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Service History
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'preferences' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Preferences
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Client Information</h3>
                <div className="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-gray-900">{client.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Contact</p>
                    <p className="text-gray-900">{client.contact_details}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Birthday</p>
                    <p className="text-gray-900">{client.birthday}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Hair/Skin Type</p>
                    <p className="text-gray-900">{client.hair_skin_type || 'Not specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Allergies</p>
                    <p className="text-gray-900">{client.allergies || 'None'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Preferred Stylist</p>
                    <p className="text-gray-900">{client.preferred_stylist || 'Not specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">How They Found Us</p>
                    <p className="text-gray-900">{client.discovery_source || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <div className="mt-3">
                  {services.length > 0 ? (
                    <div className="space-y-4">
                      {services.slice(0, 2).map((service) => (
                        <div key={service.id} className="border-l-4 border-purple-400 pl-4 py-2">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-gray-900 font-medium">{service.service_type}</p>
                              <p className="text-gray-500 text-sm">With {service.stylist}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-900">${service.cost.toFixed(2)}</p>
                              <p className="text-gray-500 text-sm">{service.date_time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No services recorded yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <ServiceHistory services={services} clientId={clientId} />
          )}
          
          {activeTab === 'preferences' && (
            <ClientPreferences preferences={preferences} clientId={clientId} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;