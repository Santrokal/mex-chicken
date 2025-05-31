import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import AddressDisplay from "./AddressDisplay";

const BillingDetailsForm = ({
  formData2,
  setFormData2,
  handleChange,
  onAddressSelect,
  selectedAddressIndex,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:8000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const userData = data[0];
            setFormData2({
              first_name: userData.firstName || "",
              last_name: userData.lastName || "",
              mobile_number: userData.phone || "",
              email_id: userData.email || "",
              postcode: userData.addresses?.[0]?.postcode || "",
              enter_address: userData.addresses?.[0]?.address || "",
              street_name: userData.addresses?.[0]?.state || "",
              city: userData.addresses?.[0]?.city || "",
            });
          }
        })
        .catch((err) => console.error("Failed to load billing info:", err));
    }
  }, [user, setFormData2]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const internalHandleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData2, [name]: value };
    setFormData2(updated);
    if (handleChange) handleChange(e);
  };

  return (
    <>
      <div className="w-full p-5 bg-white rounded shadow-lg">
        <h6 className="text-black font-bold capitalize">Billing Details</h6>
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <div className="contact-field w-full">
            <input
              name="first_name"
              value={formData2.first_name}
              onChange={internalHandleChange}
              autoComplete="first_name"
              className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
              placeholder="First Name"
              type="text"
            />
            {!formData2.first_name && (
              <div className="text-red-500 text-xs">First Name is required</div>
            )}
          </div>
          <div className="contact-field w-full">
            <input
              name="last_name"
              value={formData2.last_name}
              onChange={internalHandleChange}
              className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
              placeholder="Last Name"
              type="text"
            />
            {!formData2.last_name && (
              <div className="text-red-500 text-xs">Last Name is required</div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <div className="contact-field w-full">
            <input
              name="mobile_number"
              value={formData2.mobile_number}
              onChange={internalHandleChange}
              maxLength={10}
              className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
              placeholder="Mobile Number"
              type="text"
              inputMode="numeric"
              pattern="\d*"
            />
            {!formData2.mobile_number ? (
              <div className="text-red-500 text-xs">
                Mobile Number is required
              </div>
            ) : (
              formData2.mobile_number.length !== 10 && (
                <div className="text-red-500 text-xs">
                  Mobile Number must be 10 digits
                </div>
              )
            )}
          </div>

          <div className="contact-field w-full">
            <input
              name="email_id"
              value={formData2.email_id}
              onChange={internalHandleChange}
              className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
              placeholder="Email Id"
              type="text"
            />
            {!formData2.email_id ? (
              <div className="text-red-500 text-xs">Email Id is required</div>
            ) : (
              !isValidEmail(formData2.email_id) && (
                <div className="text-red-500 text-xs">
                  Enter a valid email address
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <AddressDisplay
        onAddressSelect={onAddressSelect}
        selectedAddressIndex={selectedAddressIndex}
      />
    </>
  );
};

export default BillingDetailsForm;
