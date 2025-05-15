/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate("/home");
  };

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    handleClose();
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
              className="w-full bg-primary text-white py-2 rounded-md"
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
                className="w-1/2 bg-gray-300 py-2 rounded-md">
                Back
              </button>
              <button
                onClick={nextStep}
                className="w-1/2 bg-primary text-white py-2 rounded-md">
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
                className="w-1/2 bg-gray-300 py-2 rounded-md">
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 bg-primary text-white py-2 rounded-md">
                Submit
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-10 overflow-y-auto">
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
              <p className="text-gray-50 text-sm w-56 text-center">
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
              <div className="text-center text-sm mt-6">
                Already have an account?{" "}
                <a className="text-red cursor-pointer">Login</a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SignUp;
