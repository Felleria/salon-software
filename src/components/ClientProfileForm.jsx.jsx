import React, { useState } from "react";

const ClientProfileForm = ({ client, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    contact_details: client?.contact_details || "",
    birthday: client?.birthday || "",
    hair_skin_type: client?.hair_skin_type || "",
    allergies: client?.allergies || "",
    preferred_stylist: client?.preferred_stylist || "",
    discovery_source: client?.discovery_source || "",
    photo_url: client?.photo_url || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(client ? `/clients/${client.id}` : "/clients", {
        method: client ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save client");
      const result = await response.json();
      onSubmit(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="contact_details"
        placeholder="Contact Details"
        value={formData.contact_details}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="birthday"
        placeholder="Birthday"
        value={formData.birthday}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="hair_skin_type"
        placeholder="Hair/Skin Type"
        value={formData.hair_skin_type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="allergies"
        placeholder="Allergies/Sensitivities"
        value={formData.allergies}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="preferred_stylist"
        placeholder="Preferred Stylist"
        value={formData.preferred_stylist}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="discovery_source"
        placeholder="How They Discovered the Salon"
        value={formData.discovery_source}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="photo_url"
        placeholder="Photo URL (Placeholder)"
        value={formData.photo_url}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {client ? "Update Client" : "Add Client"}
      </button>
    </form>
  );
};

export default ClientProfileForm;