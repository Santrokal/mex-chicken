/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AddAddress from "./AddAdreess";
import EditAddress from "./EditAddress";

const AddressDisplay = ({ onAddressSelect, selectedAddressIndex }) => {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      console.log("Fetching user with email:", user.email);
      fetch(`http://localhost:8000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched user data:", data);
          if (data.length > 0) {
            const userData = data[0];
            setUserId(userData.id);
            setAddresses(userData.addresses || []);
            // Select the first address by default if none is selected
            if (
              userData.addresses?.length > 0 &&
              selectedAddressIndex === null
            ) {
              onAddressSelect(0, userData.addresses[0]);
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching addresses:", err);
        });
    }
  }, [user, onAddressSelect, selectedAddressIndex]);

  const handleDeleteAddress = async (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);

    try {
      await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      setAddresses(updatedAddresses);
      if (selectedAddressIndex === index) {
        // Reset selected address if the deleted one was selected
        onAddressSelect(null, null);
      } else if (selectedAddressIndex > index) {
        // Adjust index if necessary
        onAddressSelect(
          selectedAddressIndex - 1,
          addresses[selectedAddressIndex - 1]
        );
      }
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  const handleClose = () => {
    setShowAddAddress(false);
    setShowEditAddress(false);
    setEditingIndex(null);
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((userData) => {
        setAddresses(userData.addresses || []);
        // Re-select the first address if available
        if (userData.addresses?.length > 0 && selectedAddressIndex === null) {
          onAddressSelect(0, userData.addresses[0]);
        }
      })
      .catch((err) => console.error("Error refreshing addresses:", err));
  };

  return (
    <div className="mt-5 w-full p-5 bg-white shadow-custom rounded-sm2 shadow-light-theme">
      <div className="flex justify-between items-center">
        <h6 className="text-black font-bold">My Addresses</h6>
        {addresses.length < 5 && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setShowAddAddress(true);
            }}
            className="text-white bg-red px-3 py-2 rounded-sm2 font-Avertastd capitalize">
            <span className="ml-1">Add New Address</span>
          </button>
        )}
      </div>

      <div className="mt-3 space-y-4">
        {addresses.map((addr, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="selectedAddress"
                value={index}
                checked={selectedAddressIndex === index}
                onChange={() => onAddressSelect(index, addr)}
                className="mr-2"
              />
              <span className="text-black">
                {addr.address}, {addr.city}, {addr.state}, {addr.postcode}
              </span>
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  console.log(
                    "Editing index:",
                    index,
                    "Address:",
                    addresses[index]
                  );
                  setEditingIndex(index);
                  setShowEditAddress(true);
                }}
                className="text-blue-500 hover:underline">
                Edit
              </button>
              <button
                type="button"
                className="text-blue-500 hover:no-underline"
                onClick={() => handleDeleteAddress(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showEditAddress && editingIndex !== null && addresses[editingIndex] && (
        <EditAddress
          onClose={handleClose}
          userId={userId}
          editData={addresses[editingIndex]}
          editIndex={editingIndex}
        />
      )}
      {showAddAddress && <AddAddress onClose={handleClose} userId={userId} />}
    </div>
  );
};

export default AddressDisplay;
