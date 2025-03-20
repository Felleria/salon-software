// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpcomingAppointments from './UpcomingAppointments';
import ServiceRecommendations from './ServiceRecommendations';

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalClients: 0,
    totalServices: 0,
    averageRating: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch clients
        const clientsResponse = await fetch('http://localhost:5555/clients');
        if (!clientsResponse.ok) {
          throw new Error('Failed to fetch clients');
        }
        const clientsData = await clientsResponse.json();
        setClients(clientsData);
        
        // Calculate dashboard statistics
        let totalServices = 0;
        let totalRatings = 0;
        let ratingCount = 0;
        let revenue = 0;
        
        // Fetch services for each client to calculate statistics
        for (const client of clientsData) {
          const servicesResponse = await fetch(`http://localhost:5555/services/${client.id}`);
          if (servicesResponse.ok) {
            const servicesData = await servicesResponse.json();
            totalServices += servicesData.length;
            
            servicesData.forEach(service => {
              revenue += service.cost;
              if (service.satisfaction_rating) {
                totalRatings += service.satisfaction_rating;
                ratingCount++;
              }
            });
          }
        }
        
        setStats({
          totalClients: clientsData.length,
          totalServices: totalServices,
          averageRating: ratingCount > 0 ? (totalRatings / ratingCount).toFixed(1) : 0,
          totalRevenue: revenue.toFixed(2)
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Salon Management dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm font-medium">Total Clients</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalClients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm font-medium">Total Services</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalServices}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm font-medium">Avg. Rating</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.averageRating}/5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm font-medium">Total Revenue</h2>
              <p className="text-2xl font-semibold text-gray-800">${stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Clients</h2>
            <Link to="/clients" className="text-sm text-purple-600 hover:text-purple-800">View All</Link>
          </div>
          
          <div className="space-y-3">
            {clients.slice(0, 5).map(client => (
              <Link to={`/clients/${client.id}`} key={client.id} className="flex items-center p-3 border-b hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
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
                <div className="ml-4">
                  <p className="text-gray-800 font-medium">{client.name}</p>
                  <p className="text-gray-500 text-sm">{client.hair_skin_type || 'No hair type specified'}</p>
                </div>
                <div className="ml-auto">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>
            ))}
            
            {clients.length === 0 && (
              <div className="text-center p-4">
                <p className="text-gray-500">No clients found</p>
                <Link to="/clients/new" className="mt-2 inline-block text-sm text-purple-600 hover:text-purple-800">
                  Add your first client
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <UpcomingAppointments />
      </div>
      
      {/* Service Recommendations */}
      <div className="mt-6">
        <ServiceRecommendations />
      </div>
    </div>
  );
}

export default Dashboard;