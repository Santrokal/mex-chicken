import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate("/#");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
  };

  const [formLogin, setformLogin] = useState({
    email_address: "",
    password: "",
  });
  const handleChange = (e) => {
    setformLogin({ ...formLogin, [e.target.name]: e.target.value });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center text-center pt-32">
        <Dialog.Panel className="relative transform overflow-hidden rounded-xl text-left shadow-xl transition-all w-full lg:max-w-5xl">
          <div className="rounded-xl lg:flex lg:flex-row flex-col w-full sm:w-3/4 lg:w-full bg-white mx-auto h-auto">
            <div
              className="w-full lg:w-1/2 h-auto md:rounded-tl-xl md:rounded-tr-xl lg:rounded-none bg-gray-50 form-custom-image bg-center lg:bg-top"
              style={{
                backgroundImage: 'url("/images/loginside.png")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: "rgb(0, 0, 0)",
              }}>
              <div className="flex flex-col items-center justify-center py-20">
                <h3 className="text-white text-6xl font-semibold pb-4">
                  Welcome
                </h3>
                <p className="text-white text-sm font-normal pb-7 w-56 text-center">
                  Welcome to the Login screen, just enter the details and enjoy
                  your order
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center bg-center lg:bg-top">
              <div className="p-8 md:p-10 lg:px-14 py-8">
                <div className="absolute right-0 sm:right-24 md:right-24 lg:right-0 top-0 pr-8 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-m text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={handleClose}>
                    <span className="sr-only">Close</span>
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
                </div>

                {/* Form Header */}
                <div className="pb-8">
                  <h2 className="uppercase text-2xl font-MazzardhBold font-normal text-green500">
                    login
                  </h2>
                </div>

                {/* Login Form */}
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div>
                    <div className="mb-6">
                      <input
                        type="text"
                        name="email_address"
                        id="email_address"
                        className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-cgray-600"
                        placeholder="Enter Email"
                        autoComplete="new-email"
                        value={formLogin.email_address}
                        onChange={handleChange}
                        required
                      />
                      {!formLogin.email_address ? (
                        <div className="text-red text-xs">
                          Email Id is required
                        </div>
                      ) : (
                        !isValidEmail(formLogin.email_address) && (
                          <div className="text-red text-xs">
                            Enter a valid email address
                          </div>
                        )
                      )}
                    </div>
                    <div className="mb-1">
                      <input
                        type="password"
                        name="password_unique"
                        id="password"
                        className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-3.5 mb-6">
                    <a
                      href="/forgot-password"
                      className="text-red cursor-pointer">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-2 text-white bg-red rounded-md py-3 font-AvertaStdBold">
                    Login
                  </button>
                  <div className="mt-8 text-center">
                    <label className="font-normal text-green500 font-AvertaStdBold text-sm">
                      Not a member?
                    </label>
                    <a
                      href="/signup"
                      className="ml-2 text-sm text-red cursor-pointer capitalize">
                      Signup now
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Login;
