import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AddAddress = ({ onClose, userId }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    postcode: "",
    address: "",
  });
  const [addressOptions, setAddressOptions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:8000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const userData = data[0];
            setAddresses(userData.addresses || []);
          }
        })
        .catch((err) => console.error("Failed to load addresses:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

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

    if (addresses.length >= 5) {
      alert("You can only save up to 5 addresses.");
      return;
    }

    const updatedAddresses = [...addresses, formData];

    try {
      await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      alert("Address saved successfully.");
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to save address:", err);
      alert("Failed to save address. Please try again.");
    }
  };
  const handleCheckPostcode = async () => {
    const postcode = formData.postcode.trim();
    if (!postcode) {
      alert("Please enter a postcode.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const data = await response.json();

      if (data.status === 200) {
        const result = data.result;

        // Create options array simulating different "address choices"
        const options = [];

        // Push admin_ward, parish, admin_district if available (not empty)
        if (result.admin_ward) options.push(result.admin_ward);
        if (result.parish && result.parish !== result.admin_ward)
          options.push(result.parish);
        if (result.admin_district && result.admin_district !== result.parish)
          options.push(result.admin_district);

        setAddressOptions(options);

        // Autofill form fields but clear street address for user to fill
        setFormData((prev) => ({
          ...prev,
          country: result.country || "United Kingdom",
          state: result.region || "",
          city: result.admin_district || "",
          address: "",
        }));
      } else {
        alert("Invalid postcode or no data found.");
        setAddressOptions([]);
      }
    } catch (error) {
      console.error("Postcode lookup failed:", error);
      alert("Error checking postcode.");
      setAddressOptions([]);
    }
  };

  const handleSelectAddress = (e) => {
    const selected = e.target.value;
    if (!selected) return;

    // Just set the street address input as empty (user must enter street manually)
    // Set city to selected area (from dropdown)
    setFormData((prev) => ({
      ...prev,
      city: selected,
      address: "",
    }));
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Address</h2>
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
            onClick={handleCheckPostcode}
            className="bg-red text-white px-4 py-2 rounded hover:bg-red-700">
            Check
          </button>
        </div>
        {addressOptions.length > 0 && (
          <div className="mb-4">
            <label className="text-sm font-medium">Choose Area</label>
            <select
              onChange={handleSelectAddress}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm text-black"
              value={formData.city}>
              <option value="">-- Select an area --</option>
              {addressOptions.map((addr, idx) => (
                <option key={idx} value={addr}>
                  {addr}
                </option>
              ))}
            </select>
          </div>
        )}

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

export default AddAddress;
