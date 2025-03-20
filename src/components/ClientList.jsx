// ClientList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5555/clients');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data = await response.json();
        setClients(data);
        setFilteredClients(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    // Apply search and filter
    let results = clients;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.contact_details && client.contact_details.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply filter
    if (filter !== 'all') {
      results = results.filter(client => client.preferred_stylist === filter);
    }
    
    setFilteredClients(results);
  }, [searchTerm, filter, clients]);

  // Extract unique stylists for filter
  const stylists = [...new Set(clients.map(client => client.preferred_stylist).filter(Boolean))];

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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Clients</h1>
          <p className="text-gray-600">Manage your salon clients</p>
        </div>
        <Link 
          to="/clients/new" 
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add New Client
        </Link>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Stylists</option>
              {stylists.map((stylist) => (
                <option key={stylist} value={stylist}>
                  {stylist}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Client List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredClients.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <Link to={`/clients/${client.id}`} key={client.id} className="block hover:bg-gray-50">
                <div className="px-6 py-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {client.photo_url ? (
                      <img src={client.photo_url} alt={client.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                    <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        {client.contact_details}
                      </div>
                      {client.hair_skin_type && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                          </svg>
                          {client.hair_skin_type}
                        </div>
                      )}
                      {client.preferred_stylist && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          {client.preferred_stylist}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No clients found matching your criteria</p>
            {searchTerm || filter !== 'all' ? (
              <button
                className="mt-2 text-purple-600 hover:text-purple-800"
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
              >
                Clear filters
              </button>
            ) : (
              <Link to="/clients/new" className="mt-2 inline-block text-purple-600 hover:text-purple-800">
                Add your first client
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientList;