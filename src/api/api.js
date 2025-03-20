// Base URL for API requests
const API_BASE_URL = 'http://localhost:5555';

// Error handling helper
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

// Client API calls
export const getClients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const getClient = async (clientId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching client ${clientId}:`, error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating client ${clientId}:`, error);
    throw error;
  }
};

// Service API calls
export const getClientServices = async (clientId, filters = {}) => {
  try {
    let url = `${API_BASE_URL}/services/${clientId}`;
    
    // Add query parameters for filtering
    const params = new URLSearchParams();
    if (filters.serviceType) params.append('service_type', filters.serviceType);
    if (filters.stylist) params.append('stylist', filters.stylist);
    if (filters.startDate) params.append('start_date', filters.startDate);
    if (filters.endDate) params.append('end_date', filters.endDate);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching services for client ${clientId}:`, error);
    throw error;
  }
};

export const addClientService = async (clientId, serviceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${clientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error adding service for client ${clientId}:`, error);
    throw error;
  }
};

// Preference API calls
export const getClientPreferences = async (clientId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/preferences/${clientId}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching preferences for client ${clientId}:`, error);
    throw error;
  }
};

export const createClientPreferences = async (clientId, preferenceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/preferences/${clientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error creating preferences for client ${clientId}:`, error);
    throw error;
  }
};

export const updateClientPreferences = async (clientId, preferenceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/preferences/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating preferences for client ${clientId}:`, error);
    throw error;
  }
};

// Utility API calls
export const getStylists = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stylists`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching stylists:', error);
    throw error;
  }
};

export const getServiceTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/service-types`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching service types:', error);
    throw error;
  }
};