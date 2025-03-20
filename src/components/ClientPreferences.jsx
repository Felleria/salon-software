import React, { useState, useEffect } from "react";

const ClientPreferences = ({ clientId }) => {
  const [preferences, setPreferences] = useState({
    preferred_days: "",
    preferred_times: "",
    communication_preference: "",
    favorite_products: "",
    style_preferences: "",
    stylist_notes: "",
  });

  useEffect(() => {
    fetchPreferences();
  }, [clientId]);

  const fetchPreferences = async () => {
    try {
      const response = await fetch(`/preferences/${clientId}`);
      if (!response.ok) throw new Error("Failed to fetch preferences");
      const data = await response.json();
      setPreferences(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/preferences/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      if (!response.ok) throw new Error("Failed to update preferences");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="preferred_days"
        placeholder="Preferred Days"
        value={preferences.preferred_days}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="preferred_times"
        placeholder="Preferred Times"
        value={preferences.preferred_times}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="communication_preference"
        value={preferences.communication_preference}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Communication Preference</option>
        <option value="Email">Email</option>
        <option value="Text">Text</option>
        <option value="Call">Call</option>
      </select>
      <input
        type="text"
        name="favorite_products"
        placeholder="Favorite Products"
        value={preferences.favorite_products}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="style_preferences"
        placeholder="Style Preferences"
        value={preferences.style_preferences}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="stylist_notes"
        placeholder="Stylist Notes"
        value={preferences.stylist_notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Preferences
      </button>
    </form>
  );
};

export default ClientPreferences;