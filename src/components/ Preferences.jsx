const Preferences = ({ preferences, onUpdatePreferences }) => {
    const [formData, setFormData] = useState(preferences);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdatePreferences(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="preferred_days"
                placeholder="Preferred Days"
                value={formData.preferred_days}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                name="communication_preference"
                placeholder="Communication Preference"
                value={formData.communication_preference}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                name="favorite_products"
                placeholder="Favorite Products"
                value={formData.favorite_products}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                Update Preferences
            </button>
        </form>
    );
};

export default Preferences;