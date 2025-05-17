import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AddAddressForm = ({ onClose, handleChange }) => {
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData2, setFormData2] = useState({
    country: "",
    state: "",
    city: "",
    postcode: "",
    address: "",
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:8000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const userData = data[0];
            setUserId(userData.id);
            setFormData2((prev) => ({
              country: prev.country || userData.country || "",
              state: prev.state || userData.state || "",
              city: prev.city || userData.city || "",
              postcode: prev.postcode || userData.postcode || "",
              address: prev.address || userData.address || "",
            }));
          }
        })
        .catch((err) => console.error("Failed to load address:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const internalHandleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData2, [name]: value };
    setFormData2(updated);
    if (handleChange) handleChange(e);
  };

  const handleSaveAddress = async () => {
    const { country, state, city, postcode, address } = formData2;
    if (!country || !state || !city || !postcode || !address) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData2),
      });
      alert("Address saved successfully.");
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Address</h2>
          <button onClick={onClose}>
            <i className="bi bi-x-lg text-red text-xl hover:text-red-600"></i>
          </button>
        </div>

        {/* Postcode and Check */}
        <div className="mb-4 flex items-center space-x-2">
          <input
            name="postcode"
            value={formData2.postcode}
            onChange={internalHandleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="Postcode"
            type="text"
          />
          <button className="bg-red text-white px-4 py-2 rounded hover:bg-red-700">
            Check
          </button>
        </div>

        {/* Country */}
        <div className="mb-4">
          <input
            name="country"
            value={formData2.country}
            onChange={internalHandleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="Country"
            type="text"
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <input
            name="state"
            value={formData2.state}
            onChange={internalHandleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="State"
            type="text"
          />
        </div>

        {/* City and Address */}
        <div className="mb-4 flex space-x-2">
          <input
            name="city"
            value={formData2.city}
            onChange={internalHandleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="City"
            type="text"
          />
          <input
            name="address"
            value={formData2.address}
            onChange={internalHandleChange}
            className="w-full px-3 py-3 border text-black border-gray-300 rounded text-xs"
            placeholder="Street Address"
            type="text"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveAddress}
          className="w-full bg-red font-bold text-white py-2 rounded hover:bg-red-700 mt-4">
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddAddressForm;
