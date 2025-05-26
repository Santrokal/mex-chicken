import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import Loader from "../Home/Loader";
import FooterImage from "../Home/FooterImage";
import FooterSection from "../Home/FooterSection";
import aboutImg from "../../images/aboutusback.png";
import texturewhite from "../../images/Texture-White1.png";
import texturewhite1 from "../../images/Texture-White.png";
import { useAuth } from "../Checkout/AuthContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Textarea from "@mui/joy/Textarea";
import { Button } from "@mui/joy";
const Reservation = ({ handleChange }) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const { user } = useAuth();

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
  useEffect(() => {
    console.log("User object:", JSON.stringify(user, null, 2));
    if (!user || !user.email) {
      setSubmitMessage("User not authenticated. Please log in.");
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
        console.error("Failed to load billing info:", err);
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <section
            className="secondary-banner h-auto bg-cover bg-no-repeat bg-center py-20"
            style={{
              backgroundImage: `url(${aboutImg})`,
            }}>
            <div className="container">
              <div className="flex flex-col justify-center items-center text-center max-w-sm mx-auto">
                <div className="page-title mb-2">
                  <h1 className="text-white font-AvertaStdEB capitalize text-6xl leading-[3rem] h-16">
                    Reservation
                  </h1>
                </div>
                <div className="breadcrumb flex items-center justify-center">
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-2">
                      <li>
                        <div className="flex items-center space-x-2">
                          <a
                            className="text-base1 no-underline text-cgray-50 hover:text-red font-Avertastd capitalize"
                            href="/home">
                            Home
                          </a>
                        </div>
                      </li>

                      <li>
                        <div className="flex items-center space-x-2">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.22234 3.68784L2.66224 0.127804C2.5799 0.045398 2.46999 0 2.35278 0C2.23558 0 2.12566 0.045398 2.04332 0.127804L1.78115 0.389916C1.61055 0.560711 1.61055 0.838302 1.78115 1.00884L4.77065 3.99834L1.77783 6.99116C1.69549 7.07357 1.65002 7.18342 1.65002 7.30056C1.65002 7.41783 1.69549 7.52768 1.77783 7.61015L2.04 7.8722C2.12241 7.9546 2.23226 8 2.34947 8C2.46667 8 2.57659 7.9546 2.65893 7.8722L6.22234 4.30891C6.30488 4.22624 6.35021 4.11587 6.34995 3.99854C6.35021 3.88075 6.30488 3.77044 6.22234 3.68784Z"
                              fill="#FEFEFE"
                            />
                          </svg>
                          <a
                            aria-current="page"
                            className="text-base no-underline text-red font-Avertastd capitalize active"
                            href="/reservation">
                            Reservation
                          </a>
                        </div>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-cover mb-20 bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${texturewhite1})` }}>
            <div className="w-full h-44">
              <img className="w-full" src={texturewhite} alt="Overlay" />
            </div>
            <div className="text-center mt-2">
              <div className="text-base2 text-4xl font-AvertaStdBold">
                Make a Reservation
              </div>
              <p className="text-green300 mt-10 font-AvertaStdRegular leading-relaxed mb-5">
                We are a restaurant committed to providing you with the most
                delicious, flavourful chicken dishes that have been tenderly and
                professionally cooked.
              </p>
            </div>
            <div className="container mx-auto px-36">
              <div className="w-full relative mb-32 bg-white p-8 rounded shadow-md ">
                <h2 className="text-lg font-bold mb-6">Book A Table</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <input
                    name="first_name"
                    value={formData2.first_name}
                    onChange={internalHandleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    placeholder="Full Name"
                    className="p-3 border border-gray-300 rounded w-full"
                    type="text"
                  />
                  {touched.first_name && !formData2.first_name && (
                    <div className="text-red-500 text-xs">
                      First Name is required
                    </div>
                  )}
                  <input
                    name="mobile_number"
                    value={formData2.mobile_number}
                    onChange={internalHandleChange}
                    onBlur={handleBlur}
                    maxLength={10}
                    disabled={isSubmitting}
                    placeholder="Phone Number"
                    className="p-3 border border-gray-300 rounded w-full"
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
                    placeholder="Email ID"
                    className="p-3 border border-gray-300 rounded w-full"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                  <select
                    name="total_person"
                    value={formData2?.total_person || ""}
                    onChange={internalHandleChange}
                    className="p-3 border border-gray-300 rounded w-full">
                    <option value="" disabled>
                      Total Person
                    </option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Time"
                      slotProps={{ textField: { className: "w-full" } }}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      slotProps={{ textField: { className: "w-full" } }}
                    />
                  </LocalizationProvider>
                </div>

                <div className="mt-5">
                  <Textarea
                    minRows={8}
                    placeholder="Write Some Comment"
                    sx={{
                      width: "100%",
                      fontSize: "14px",
                      borderColor: "#ccc",
                      borderRadius: "0.375rem",
                    }}
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    variant="solid"
                    color="danger"
                    size="lg"
                    sx={{ px: 5, borderRadius: 2 }}
                    onClick={() => console.log("Book now clicked")}>
                    Book now
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full h-20">
              <img className="w-full" src={texturewhite} alt="Overlay" />
            </div>
          </section>

          <FooterImage />
          <FooterSection />
        </div>
      )}
    </>
  );
};

export default Reservation;
