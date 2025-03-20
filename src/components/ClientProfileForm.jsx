import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ClientProfileForm({ isEditing = false }) {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact_details: '',
    birthday: '',
    hair_skin_type: '',
    allergies: '',
    preferred_stylist: '',
    discovery_source: '',
    photo_url: ''
  });

  // List of stylists for dropdown
  const stylists = ['Jane Smith', 'Mike Brown', 'Chris Davis'];
  
  // Discovery sources for dropdown
  const discoverySources = ['Google', 'Social Media', 'Friend Referral', 'Walk-in', 'Instagram', 'Website', 'Other'];

  useEffect(() => {
    // If editing, fetch the client data
    if (isEditing && clientId) {
      const fetchClient = async () => {
        try {
          const response = await fetch(`http://localhost:5555/clients/${clientId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch client data');
          }
          const data = await response.json();
          setFormData({
            name: data.name || '',
            contact_details: data.contact_details || '',
            birthday: data.birthday || '',
            hair_skin_type: data.hair_skin_type || '',
            allergies: data.allergies || '',
            preferred_stylist: data.preferred_stylist || '',
            discovery_source: data.discovery_source || '',
            photo_url: data.photo_url || ''
          });
          setLoading(false);
        } catch (err) {
          console.error('Error:', err);
          setError(err.message);
          setLoading(false);
        }
      };

      fetchClient();
    }
  }, [isEditing, clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEditing
        ? `http://localhost:5555/clients/${clientId}`
        : 'http://localhost:5555/clients';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} client`);
      }

      const data = await response.json();
      
      // Redirect to the client detail page
      navigate(isEditing ? `/clients/${clientId}` : `/clients/${data.id}`);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Client Profile' : 'New Client'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          {/* Contact Details */}
          <div>
            <label htmlFor="contact_details" className="block text-sm font-medium text-gray-700">
              Contact Details (Email/Phone) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contact_details"
              name="contact_details"
              value={formData.contact_details}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          {/* Birthday */}
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          {/* Hair/Skin Type */}
          <div>
            <label htmlFor="hair_skin_type" className="block text-sm font-medium text-gray-700">
              Hair/Skin Type
            </label>
            <input
              type="text"
              id="hair_skin_type"
              name="hair_skin_type"
              placeholder="e.g., Dry, Oily, Combination, Curly"
              value={formData.hair_skin_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          {/* Allergies */}
          <div>
            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
              Allergies
            </label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              placeholder="e.g., Sulfates, Fragrance, None"
              value={formData.allergies}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          {/* Preferred Stylist */}
          <div>
            <label htmlFor="preferred_stylist" className="block text-sm font-medium text-gray-700">
              Preferred Stylist
            </label>
            <select
              id="preferred_stylist"
              name="preferred_stylist"
              value={formData.preferred_stylist}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Select a stylist</option>
              {stylists.map((stylist) => (
                <option key={stylist} value={stylist}>
                  {stylist}
                </option>
              ))}
            </select>
          </div>
          
          {/* Discovery Source */}
          <div>
            <label htmlFor="discovery_source" className="block text-sm font-medium text-gray-700">
              How did they find us?
            </label>
            <select
              id="discovery_source"
              name="discovery_source"
              value={formData.discovery_source}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Select a source</option>
              {discoverySources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          
          {/* Photo URL */}
          <div className="md:col-span-2">
            <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              id="photo_url"
              name="photo_url"
              value={formData.photo_url}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
            {formData.photo_url && (
              <div className="mt-2 flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img src={formData.photo_url} alt="Client preview" className="w-full h-full object-cover" />
                </div>
                <span className="ml-2 text-sm text-gray-500">Preview</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Client' : 'Add Client'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientProfileForm;