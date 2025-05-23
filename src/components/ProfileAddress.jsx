import React, { useEffect, useState } from "react";
import AddAdreess from "../components/Checkout/AddAdreess";
import EditAddress from "./Checkout/EditAddress";

const ProfileAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showAddAdreess, setShowAddAdreess] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:8000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const userData = data[0];
            setUserId(userData.id);
            setAddresses(userData.addresses || []);
          }
        })
        .catch((err) => {
          console.error("Error fetching addresses:", err);
        });
    }
  }, [user]);

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
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  const handleClose = () => {
    setShowAddAdreess(false);
    setEditingIndex(null);

    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((userData) => {
        setAddresses(userData.addresses || []);
      });
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h6 className="text-black text-lg font-semibold mb-4">My Address</h6>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start mb-6">
        <div className="md:col-span-5 flex justify-between items-center">
          <h6 className="text-black font-bold">Saved Locations</h6>
          {addresses.length < 5 && (
            <button
              onClick={() => {
                setEditingIndex(null);
                setShowAddAdreess(true);
              }}
              className="text-white bg-red px-3 py-2 rounded-sm2 font-Avertastd capitalize">
              <span className="ml-1">Add New Location</span>
            </button>
          )}
        </div>

        {/* List of Saved Addresses */}
        {addresses.map((addr, index) => (
          <div key={index} className="md:col-span-5 bg-gray-50 ">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="selectedAddress"
                  value={index}
                  checked={index === 0}
                  readOnly
                  className="mr-2"
                />
                <span className="text-black">
                  {addr.address}, {addr.city}, {addr.state}, {addr.postcode}
                </span>
              </label>
              <div className="flex space-x-2">
                {index === 0 ? (
                  <>
                    <span className="text-base2 ">Set as Primary</span>
                    <button
                      onClick={() => handleDeleteAddress(index)}
                      className="text-blue-500 hover:underline">
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
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
                      onClick={() => handleDeleteAddress(index)}
                      className="text-blue-500 hover:underline">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Address Form Modal */}
        {showAddAdreess && (
          <AddAdreess
            onClose={handleClose}
            userId={userId}
            editData={editingIndex !== null ? addresses[editingIndex] : null}
            editIndex={editingIndex}
          />
        )}
        {showEditAddress &&
          editingIndex !== null &&
          addresses[editingIndex] && (
            <EditAddress
              onClose={() => {
                setShowEditAddress(false);
                setEditingIndex(null);
                fetch(`http://localhost:8000/users/${userId}`)
                  .then((res) => res.json())
                  .then((userData) => {
                    setAddresses(userData.addresses || []);
                  })
                  .catch((err) =>
                    console.error("Error refreshing addresses:", err)
                  );
              }}
              userId={userId}
              editData={addresses[editingIndex]}
              editIndex={editingIndex}
            />
          )}
      </div>
    </div>
  );
};

export default ProfileAddress;
