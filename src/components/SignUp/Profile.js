import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import { useAuth } from "../../components/Checkout/AuthContext";
import FooterImage from "../Home/FooterImage";
import OrderDetails from "../Checkout/OrderDetails";
import TextureWhite from "../../images/Texture-White.png";
import profileback from "../../images/profilebackground.png";
import rightarrow from "../../images/right-arrow 1.png";
import userImg from "../../images/user.png";
import GroupDown from "../../images/Groupdown.png";
import TrackOrder from "./TrackOrder";
import FooterSection from "../Home/FooterSection";
import ProfileAddress from "./ProfileAddress";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Profile = ({ handleChange }) => {
  const [selectedSection, setSelectedSection] = useState("profile");
  const { user, logout } = useAuth();
  const [formData2, setFormData2] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_id: "",
  });
  const [touched, setTouched] = useState({
    first_name: false,
    last_name: false,
    mobile_number: false,
    email_id: false,
  });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitMessage1, setSubmitMessage1] = useState("");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (key) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderPasswordInput = (name, placeholder, autoComplete, key) => (
    <div className="relative w-full">
      <input
        name={name}
        value={passwordData[name]}
        onChange={handlePasswordChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={showPassword[key] ? "text" : "password"}
        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm"
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => togglePasswordVisibility(key)}>
        {showPassword[key] ? <FiEyeOff /> : <FiEye />}
      </span>
    </div>
  );
  useEffect(() => {
    if (!user || !user.email) {
      setSubmitMessage("User not authenticated. Please log in.");
      setIsLoading(false);
      return;
    }
    if (!user || !user.email) {
      setSubmitMessage1("User not authenticated. Please log in.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch(`http://localhost:8000/users?email=${encodeURIComponent(user.email)}`)
      .then(async (res) => {
        const responseText = await res.text();
        if (!res.ok) {
          let errorMessage = res.statusText || "Failed to fetch user data";
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            errorMessage = responseText || errorMessage;
          }
          throw new Error(
            `Fetch error: ${errorMessage} (Status: ${res.status})`
          );
        }
        return JSON.parse(responseText);
      })
      .then((data) => {
        if (data.length > 0) {
          const userData = data[0];
          setFormData2({
            first_name: userData.firstName || "",
            last_name: userData.lastName || "",
            mobile_number: userData.phone || "",
            email_id: userData.email || "",
          });
          setUserId(userData.id || null);
        } else {
          setSubmitMessage("User data not found.");
        }
      })
      .catch((err) => {
        setSubmitMessage("Failed to load profile data. Please try again.");
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const internalHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData2((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setSubmitMessage("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async () => {
    if (!user || !user.email || !userId) {
      setSubmitMessage(
        "User not authenticated or user ID missing. Please log in."
      );
      setIsSubmitting(false);
      return;
    }

    if (
      !formData2.first_name ||
      !formData2.last_name ||
      !formData2.mobile_number ||
      !formData2.email_id
    ) {
      setSubmitMessage("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(formData2.email_id)) {
      setSubmitMessage("Please enter a valid email address");
      return;
    }

    if (!isValidMobile(formData2.mobile_number)) {
      setSubmitMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData2.first_name,
          lastName: formData2.last_name,
          phone: formData2.mobile_number,
          email: formData2.email_id,
        }),
      });

      const responseText = await response.text();
      if (response.ok) {
        setSubmitMessage("Profile updated successfully!");
      } else {
        let errorMessage = response.statusText || "Failed to update profile";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(
          `Failed to update profile: ${errorMessage} (Status: ${response.status})`
        );
      }
    } catch (error) {
      setSubmitMessage(
        error.message || "Failed to update profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMenuClick = (key) => {
    if (key === "logout") {
      logout();
      window.location.href = "/Home";
    } else {
      setSelectedSection(key);
    }
  };
  const handlePasswordSubmit = async () => {
    if (
      !passwordData.old_password ||
      !passwordData.new_password ||
      !passwordData.confirm_password
    ) {
      setSubmitMessage1("Please fill in all password fields");
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      setSubmitMessage1("New password and confirm password do not match");
      return;
    }

    if (passwordData.new_password.length < 8) {
      setSubmitMessage1("New password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage1("");

    try {
      const userResponse = await fetch(
        `http://localhost:8000/users?email=${encodeURIComponent(user.email)}`
      );
      const users = await userResponse.json();

      if (!users.length) {
        throw new Error("User not found");
      }

      const currentUser = users[0];
      if (currentUser.password !== passwordData.old_password) {
        setSubmitMessage1("Old password is incorrect");
        return;
      }
      const updateResponse = await fetch(
        `http://localhost:8000/users/${currentUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: passwordData.new_password,
            confirmPassword: passwordData.confirm_password,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update password");
      }

      setSubmitMessage1("Password updated successfully!");
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      setSubmitMessage1(
        error.message || "Failed to update password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitMessage1("");
  };
  return (
    <>
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${TextureWhite})` }}>
        <div className="sticky-header">
          <Navbar />
        </div>
        <div
          className="home-section"
          style={{ backgroundImage: `url(${profileback})` }}>
          <h1>My Profile</h1>
          <div className="inline-container">
            <p className="inline-content">
              <span-1>Home</span-1>
              <img src={rightarrow} alt="Arrow" className="arrow-icon" />
              <span>Profile</span>
            </p>
          </div>
        </div>

        <div className="relative container">
          <div className="lg:grid lg:grid-cols-9 gap-6 mx-auto mt-36">
            <div className="hidden lg:block col-span-4 space-y-6">
              <div className="flex flex-col lg:flex-row items-center gap-6 rounded-xl p-6 bg-white shadow-md">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-500">
                  <img
                    src={userImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:text-left space-y-1">
                  <h2 className="text-2xl font-semibold text-black">
                    {formData2.first_name}
                  </h2>
                  <p className="text-gray-600 text-lg">{formData2.email_id}</p>
                  <p className="text-gray-600 text-lg">
                    {formData2.mobile_number}
                  </p>
                </div>
              </div>

              <div className="p-5 shadow-custom rounded-md bg-white sticky top-30 custom-shadow h-fit col-span-1 lg:col-span-2">
                <div className="space-y-3">
                  {[
                    {
                      label: "My Profile",
                      icon: "fa-regular fa-user",
                      key: "profile",
                    },
                    {
                      label: "Order Details",
                      icon: "fi fi-sr-concierge-bell",
                      key: "orders",
                    },
                    {
                      label: "Track Order",
                      icon: "fi fi-rs-radar-monitoring-track",
                      key: "track",
                    },
                    {
                      label: "My Address",
                      icon: "fi fi-rs-map-marker",
                      key: "address",
                    },
                    {
                      label: "Logout",
                      icon: "fi fi-rs-sign-out-alt",
                      key: "logout",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className={`menu-item-title cursor-pointer transition duration-200 
          ${
            selectedSection === item.key
              ? "text-red font-semibold"
              : "text-black"
          } 
          hover:text-red-600`}
                      onClick={() => handleMenuClick(item.key)}>
                      <h5 className="capitalize font-Avertastd flex items-center gap-2">
                        <i className={item.icon}></i> {item.label}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-5 space-y-6">
              <div className="px-6 py-4 rounded-md bg-[#FFFBF2] shadow-sm flex items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#E5252C]">
                    Hello {formData2.first_name}!
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    From your account dashboard, you can view and edit your
                    profile details, view order details, and manage billing
                    addresses.
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div>Loading profile data...</div>
              ) : (
                <>
                  {selectedSection === "profile" && (
                    <div className="w-full p-6 bg-white rounded-lg shadow-md">
                      <h6 className="text-black text-lg font-semibold mb-4">
                        My Profile
                      </h6>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start mb-6">
                        <div className="flex justify-center md:justify-start">
                          <img
                            src={userImg}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-red-500"
                          />
                        </div>

                        <div className="md:col-span-4 grid grid-cols-1 gap-4">
                          <input
                            name="first_name"
                            value={formData2.first_name}
                            onChange={internalHandleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
                            placeholder="First Name"
                            type="text"
                          />
                          {touched.first_name && !formData2.first_name && (
                            <div className="text-red-500 text-xs">
                              First Name is required
                            </div>
                          )}
                          <input
                            name="last_name"
                            value={formData2.last_name}
                            onChange={internalHandleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
                            placeholder="Last Name"
                            type="text"
                          />
                          {touched.last_name && !formData2.last_name && (
                            <div className="text-red-500 text-xs">
                              Last Name is required
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            name="mobile_number"
                            value={formData2.mobile_number}
                            onChange={internalHandleChange}
                            onBlur={handleBlur}
                            maxLength={10}
                            disabled={isSubmitting}
                            className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
                            placeholder="Mobile Number"
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                          />
                          {touched.mobile_number &&
                            (!formData2.mobile_number ? (
                              <div className="text-red-500 text-xs">
                                Mobile Number is required
                              </div>
                            ) : (
                              !isValidMobile(formData2.mobile_number) && (
                                <div className="text-red-500 text-xs">
                                  Enter a valid 10-digit mobile number
                                </div>
                              )
                            ))}
                          <input
                            name="email_id"
                            value={formData2.email_id}
                            onChange={internalHandleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            className="w-full px-3 py-3 border bg-white text-black border-gray-300 rounded text-xs focus-visible:outline-none"
                            placeholder="Email Id"
                            type="text"
                          />
                          {touched.email_id &&
                            (!formData2.email_id ? (
                              <div className="text-red-500 text-xs">
                                Email Id is required
                              </div>
                            ) : (
                              !isValidEmail(formData2.email_id) && (
                                <div className="text-red-500 text-xs">
                                  Enter a valid email address
                                </div>
                              )
                            ))}
                        </div>
                      </div>
                      {submitMessage && (
                        <div
                          className={`text-sm mb-4 ${
                            submitMessage.includes("successfully")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}>
                          {submitMessage}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-5 py-2.5 rounded-md font-semibold text-sm text-white ${
                          isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red hover:bg-red-600"
                        }`}>
                        {isSubmitting ? "Saving..." : "Save and Update"}
                      </button>
                      <hr className="my-6 border-t border-gray-200" />

                      <h6 className="text-black text-lg font-semibold mb-4">
                        Change Password
                      </h6>
                      <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            name="username"
                            autoComplete="username"
                            value="user@example.com"
                            readOnly
                            hidden
                          />

                          {renderPasswordInput(
                            "old_password",
                            "Old Password",
                            "current-password",
                            "old"
                          )}
                          {renderPasswordInput(
                            "new_password",
                            "New Password",
                            "new-password",
                            "new"
                          )}
                        </div>

                        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 mb-3 gap-4">
                          {renderPasswordInput(
                            "confirm_password",
                            "Confirm Password",
                            "new-password",
                            "confirm"
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handlePasswordSubmit}
                          disabled={isSubmitting}
                          className={`px-5 py-2.5 rounded-md font-semibold text-sm text-white ${
                            isSubmitting
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red hover:bg-red-600"
                          }`}>
                          {isSubmitting
                            ? "Saving..."
                            : "Save and Update Password"}
                        </button>
                      </form>
                      {submitMessage1 && (
                        <div
                          className={`text-sm mb-4 ${
                            submitMessage1.includes("successfully")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}>
                          {submitMessage1}
                        </div>
                      )}
                    </div>
                  )}
                  {selectedSection === "orders" && <OrderDetails />}
                  {selectedSection === "track" && <TrackOrder />}
                  {selectedSection === "address" && <ProfileAddress />}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-26">
          <img className="w-full" src={GroupDown} alt="Overlay" />
        </div>
      </div>
      <FooterImage />
      <FooterSection />
    </>
  );
};

export default Profile;
