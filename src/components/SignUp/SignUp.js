/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";

const SignUp = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    postcode: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    setError("");
    if (step === 1) {
      const { email, password, confirmPassword } = formData;

      if (!email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      if (!isValidEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    if (step === 2) {
      const { firstName, lastName, phone } = formData;

      if (!firstName || !lastName || !phone) {
        setError("Please fill in all personal details");
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        setError("Please fill in all fields");
        return;
      }
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:8000/users");
      const existingUsers = await res.json();

      const emailExists = existingUsers.some(
        (user) => user.email === formData.email
      );
      const phoneExists = existingUsers.some(
        (user) => user.phone === formData.phone
      );

      if (emailExists) {
        setModalMessage("Email already exists");
        setShowErrorModal(true);
        return;
      }

      if (phoneExists) {
        setModalMessage("Phone number already exists");
        setShowErrorModal(true);
        return;
      }

      const {
        email,
        password,
        firstName,
        lastName,
        phone,
        country,
        state,
        city,
        postcode,
        address,
      } = formData;

      const userToSave = {
        email,
        password,
        firstName,
        lastName,
        phone,
        addresses: [
          {
            country,
            state,
            city,
            postcode,
            address,
          },
        ],
      };

      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToSave),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      console.log("Successfully saved:", userToSave);
      onClose();
      navigate("/home");
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save user data. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-base2 font-bold text-2xl mb-6">SIGNUP</h2>
            <p className="text-center pb-6 text-sm text-base2">
              Create your account
            </p>
            <div className="pb-4">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {error && <div className="text-red text-xs mt-1">{error}</div>}
            </div>
            <div className="pb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="pb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              className="w-full bg-red text-base1 font-AvertaStdBold py-2 rounded-md"
              onClick={nextStep}>
              Next
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-cgreen-500 font-bold text-2xl mb-6">
              Personal Details
            </h2>
            <div className="pb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="pb-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="pb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={prevStep}
                className="w-1/2 bg-grey300 font-AvertaStdBold text-base2 py-2 rounded-md">
                Back
              </button>
              <button
                onClick={nextStep}
                className="w-1/2 bg-red text-white font-AvertaStdBold py-2 rounded-md">
                Next
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-cgreen-500 font-bold text-2xl mb-6">
              Address Details
            </h2>
            <div className="grid gap-4 grid-cols-2 grid-rows-2">
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="postcode"
                  placeholder="Post Code"
                  className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                  value={formData.postcode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="pt-4 pb-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={prevStep}
                className="w-1/2 bg-grey300 font-AvertaStdBold text-base2 py-2 rounded-md">
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 bg-red font-AvertaStdBold text-white py-2 rounded-md">
                Submit
              </button>
              <ErrorModal
                show={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                message={modalMessage}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      className="fixed inset-0 z-20 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center text-center pt-32">
        <Dialog.Panel className="relative w-full lg:max-w-5xl mx-auto bg-white rounded-xl shadow-xl">
          <div className="lg:flex w-full">
            <div
              className="w-full lg:w-1/2 bg-gray-50 bg-cover bg-center flex flex-col justify-center items-center py-20"
              style={{
                backgroundImage:
                  'url("https://staging.eezzypos.com/28-30-J3zP24aMF3yn5kEVT2e1.png")',
              }}>
              <h3 className="text-white text-6xl font-semibold pb-4">
                Welcome
              </h3>
              <p className="text-base1 text-sl w-56 text-center">
                Welcome to the signup screen, just enter the details and enjoy
                your order
              </p>
            </div>
            <div className="w-full lg:w-1/2 bg-white px-10 py-8 relative">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <form onSubmit={handleSubmit} className="space-y-4">
                {renderStep()}
              </form>
              <div className="text-center font-AvertaStdRegular text-sm mt-6">
                Already have an account?{" "}
                <a className="text-red font-AvertaStdBold cursor-pointer">
                  Login
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SignUp;
