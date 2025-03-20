import React, { useState, useEffect } from "react";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/services?upcoming=true");
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="border p-2 mb-2">
            <p>{appointment.date_time}</p>
            <p>{appointment.service_type}</p>
            <p>{appointment.stylist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingAppointments;