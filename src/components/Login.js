import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({
    email_address: "",
    password: "",
  });

  const handleClose = () => {
    setIsOpen(false);
    navigate("/home");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formLogin.email_address || !formLogin.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(formLogin.email_address)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const users = await response.json();
      const user = users.find(
        (u) =>
          u.email === formLogin.email_address &&
          u.password === formLogin.password
      );

      if (user) {
        navigate("/home");
        setIsOpen(false);
      } else {
        setError("Incorrect email or password. Please sign up.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Dialog
        open={isOpen && !showSignUp}
        onClose={handleClose}
        className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center pt-32">
          <Dialog.Panel className="relative transform overflow-hidden rounded-xl text-left shadow-xl transition-all w-full lg:max-w-5xl">
            <div className="rounded-xl lg:flex lg:flex-row flex-col w-full sm:w-3/4 lg:w-full bg-white mx-auto h-auto">
              <div
                className="w-full lg:w-1/2 h-auto bg-gray-50 bg-center lg:bg-top"
                style={{
                  backgroundImage: 'url("/images/loginside.png")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "black",
                }}>
                <div className="flex flex-col items-center justify-center py-20">
                  <h3 className="text-white text-6xl font-semibold pb-4">
                    Welcome
                  </h3>
                  <p className="text-white text-sm pb-7 w-56 text-center">
                    Welcome to the Login screen, just enter the details and
                    enjoy your order
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="p-8 md:p-10 lg:px-14 py-8 relative">
                  <div className="absolute top-0 right-0 pr-8 pt-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={handleClose}>
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <h2 className="uppercase text-2xl font-AvertaStdBold font-normal text-green500 pb-8">
                    login
                  </h2>

                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <input
                        type="text"
                        name="email_address"
                        id="email_address"
                        className="w-full px-4 py-3 rounded-md border-2 border-cgray-600 text-gray-700"
                        placeholder="Enter Email"
                        autoComplete="new-email"
                        value={formLogin.email_address}
                        onChange={handleChange}
                        required
                      />
                      {error && (
                        <div className="text-red text-xs mt-1">{error}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="w-full px-4 py-3 rounded-md border-2 border-gray-200 text-gray-700"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={formLogin.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <a href="/forgot-password" className="text-red text-sm">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red text-white py-3 rounded-md font-AvertaStdBold">
                      Login
                    </button>

                    <div className="mt-8 text-center">
                      <label className="font-normal text-green500 font-AvertaStdBold text-sm">
                        Not a member?
                      </label>
                      <span
                        className="ml-2 text-sm text-red cursor-pointer capitalize underline"
                        onClick={() => setShowSignUp(true)}>
                        Signup now
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {showSignUp && (
        <SignUp
          onClose={() => {
            setShowSignUp(false);
            setIsOpen(true);
          }}
        />
      )}
    </>
  );
};

export default Login;
