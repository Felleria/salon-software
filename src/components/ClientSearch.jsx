import React, { useState } from "react";

const ClientSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/clients?q=${query}`);
      if (!response.ok) throw new Error("Failed to fetch clients");
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2">
      <input
        type="text"
        placeholder="Search clients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default ClientSearch;