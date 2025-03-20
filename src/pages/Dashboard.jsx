import { useState, useEffect } from 'react';
import { getClients, getStylists, getServiceTypes } from '../api/api';
import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
import ClientList from '../components/ClientList';
import QuickView from '../components/QuickView';
import Recommendation from '../components/Recommendation';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClients: 0,
    totalServices: 0,
    averageRating: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch clients
        const clientsData = await getClients();
        setClients(clientsData);
        
        // Fetch stylists and service types for filters
        const stylistsData = await getStylists();
        const serviceTypesData = await getServiceTypes();
        
        setStylists(stylistsData);
        setServiceTypes(serviceTypesData);
        
        // Calculate stats
        let totalServices = 0;
        let totalRatings = 0;
        let ratingCount = 0;
        
        // Generate upcoming appointments (normally this would come from the API)
        // For demo purposes, we'll create some fake upcoming appointments
        const today = new Date();
        const upcomingAppts = [];
        
        for (let i = 0; i < Math.min(5, clientsData.length); i++) {
          const client = clientsData[i];
          const date = new Date(today);
          date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1);
          
          upcomingAppts.push({
            id: i + 1,
            client_id: client.id,
            client_name: client.name,
            date_time: date.toLocaleString(),
            service_type: serviceTypesData[Math.floor(Math.random() * serviceTypesData.length)]
          });
        }
        
        setUpcomingAppointments(upcomingAppts);
        
        // Set stats
        setStats({
          totalClients: clientsData.length,
          totalServices: totalServices,
          averageRating: ratingCount ? (totalRatings / ratingCount).toFixed(1) : 0
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold text-gray-500">Total Clients</h3>
                  <p className="text-2xl font-bold">{stats.totalClients}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold text-gray-500">Active Stylists</h3>
                  <p className="text-2xl font-bold">{stylists.length}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold text-gray-500">Service Types</h3>
                  <p className="text-2xl font-bold">{serviceTypes.length}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick View Section */}
                <div className="bg-white p-4 rounded shadow">
                  <QuickView appointments={upcomingAppointments} />
                </div>
                
                {/* Recommendations Section */}
                <div className="bg-white p-4 rounded shadow">
                  <Recommendation />
                </div>
              </div>
              
              {/* Recent Clients Section */}
              <div className="bg-white p-4 rounded shadow mt-6">
                <h3 className="text-lg font-bold mb-4">Recent Clients</h3>
                <ClientList 
                  clients={clients.slice(0, 5)} 
                  onSelectClient={(client) => {
                    // Navigate to client profile page
                    window.location.href = `/clients/${client.id}`;
                  }} 
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;