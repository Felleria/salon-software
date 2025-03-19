const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold">Salon Management</h2>
            <ul className="mt-4 space-y-2">
                <li><a href="/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</a></li>
                <li><a href="/clients" className="block p-2 hover:bg-gray-700">Clients</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;