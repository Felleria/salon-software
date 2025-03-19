const QuickView = ({ appointments }) => {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-bold">Upcoming Appointments</h3>
            <ul className="space-y-2">
                {appointments.map(appointment => (
                    <li key={appointment.id} className="p-2 border rounded">
                        <p><strong>Client:</strong> {appointment.client_name}</p>
                        <p><strong>Date:</strong> {appointment.date_time}</p>
                        <p><strong>Service:</strong> {appointment.service_type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickView;