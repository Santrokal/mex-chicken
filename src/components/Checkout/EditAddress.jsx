import React, { useState } from "react";

const EditAddress = ({ onClose, userId, editData, editIndex }) => {
  const [formData, setFormData] = useState({
    country: editData.country || "",
    state: editData.state || "",
    city: editData.city || "",
    postcode: editData.postcode || "",
    address: editData.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    const { country, state, city, postcode, address } = formData;
    if (!country || !state || !city || !postcode || !address) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`);
      const userData = await response.json();
      const updatedAddresses = [...userData.addresses];
      updatedAddresses[editIndex] = formData;

      await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      alert("Address updated successfully.");
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to update address:", err);
      alert("Failed to update address. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Address</h2>
          <button type="button" onClick={onClose}>
            <i className="bi bi-x-lg text-red text-xl hover:text-red-600"></i>
          </button>
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <input
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="Postcode"
            type="text"
          />
          <button
            type="button"
            className="bg-red text-white px-4 py-2 rounded hover:bg-red-700">
            Check
          </button>
        </div>

        <div className="mb-4">
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="Country"
            type="text"
          />
        </div>

        <div className="mb-4">
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="State"
            type="text"
          />
        </div>

        <div className="mb-4 flex space-x-2">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="City"
            type="text"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="Street Address"
            type="text"
          />
        </div>

        <button
          type="button"
          onClick={handleSaveAddress}
          className="w-full bg-red font-bold text-white py-2 rounded hover:bg-red-700 mt-4">
          Save Address
        </button>
      </div>
    </div>
  );
};

export default EditAddress;
