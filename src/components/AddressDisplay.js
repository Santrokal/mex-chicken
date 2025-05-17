/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AddAdreess from "./AddAdreess";

const AddressDisplay = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAddAdreess, setShowAddAdreess] = useState(false);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:8000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const userData = data[0];
            setUserId(userData.id);
            const formattedAddress = `${userData.address}, ${userData.state}, ${userData.postcode}`;
            setUserAddress(formattedAddress);
          }
        })
        .catch((err) => {
          console.error("Error fetching user address:", err);
        });
    }
  }, [user]);
  const handleDeleteAddress = () => {
    if (!user?.email) return;

    fetch(`http://localhost:8000/users?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const userId = data[0].id;
          fetch(`http://localhost:8000/users/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: "",
              state: "",
              postcode: "",
              city: "",
              country: "",
            }),
          }).then(() => {
            setUserAddress("");
            setShowAddAdreess(false);
          });
        }
      })
      .catch((err) => console.error("Failed to delete address:", err));
  };

  return (
    <>
      <div className="mt-5 w-full p-5 bg-white shadow-custom rounded-sm2 shadow-light-theme">
        <div className="flex justify-between items-center">
          <h6 className="text-black font-bold">My Address</h6>
          <button
            onClick={() => setShowAddAdreess(true)}
            className="text-white bg-red px-3 py-2 rounded-sm2 font-Avertastd capitalize">
            <span className="ml-1">Add New Address</span>
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {userAddress && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="address"
                  value="address1"
                  defaultChecked
                  className="mr-2"
                />
                <span className="text-black">{userAddress}</span>
              </div>
              <div className="flex space-x-2">
                {userAddress && (
                  <button
                    disabled={!userAddress}
                    onClick={() => {
                      if (userAddress) setShowAddAdreess(true);
                    }}
                    className={`${
                      userAddress
                        ? "text-blue-500 hover:underline"
                        : "text-gray-400 cursor-not-allowed"
                    }`}>
                    Edit
                  </button>
                )}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={handleDeleteAddress}>
                  Delete
                </button>
              </div>

              {userAddress?.trim() && showAddAdreess && (
                <AddAdreess onClose={() => setShowAddAdreess(false)} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressDisplay;
