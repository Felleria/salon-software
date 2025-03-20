import React, { useState } from "react";
import ClientProfileForm from "./components/ClientProfileForm";
import ServiceHistory from "./components/ServiceHistory";
import ClientPreferences from "./components/ClientPreferences";
import ClientSearch from "./components/ClientSearch";
import UpcomingAppointments from "./components/UpcomingAppointments";
import ServiceRecommendations from "./components/ServiceRecommendations";

const App = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Salon Management System</h1>
      <ClientSearch onSearch={(clients) => setSelectedClient(clients[0])} />
      {selectedClient && (
        <>
          <ClientProfileForm client={selectedClient} onSubmit={() => {}} />
          <ServiceHistory clientId={selectedClient.id} />
          <ClientPreferences clientId={selectedClient.id} />
        </>
      )}
      <UpcomingAppointments />
      <ServiceRecommendations />
    </div>
  );
};

export default App;