import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../Order/OrderContext";
import Login from "../SignUp/Login";
import logo from "../../images/mex-chicken.png";
import logo1 from "../../images/fav-Dark.png";
import userImg from "../../images/user.png";
import toggle from "../../images/toggle.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef();
  const navigate = useNavigate();
  const { cartItems } = useOrder();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
    setShowPopover(false);
  };

  const handleClick = () => {
    if (isLoggedIn) {
      setShowPopover((prev) => !prev);
    } else {
      setShowLogin(true);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="py-3 md:py-5 lg:py-1">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center flex-1">
                <a href="/home">
                  <img
                    src={logo}
                    alt="website-logo"
                    className="h-[4.5rem] md:h-20 rounded-md hidden 2xl:block"
                  />
                  <img
                    src={logo1}
                    alt="website-logo"
                    className="h-[3.5rem] md:h-20 rounded-md 2xl:hidden"
                  />
                </a>
                <div className="hidden lg:block mx-auto">
                  <div className="space-x-12">
                    {[
                      "Home",
                      "About",
                      "Order Now",
                      "Contact",
                      "Reservation",
                    ].map((item, i) => {
                      const href =
                        item === "Order Now"
                          ? "/order"
                          : `/${item.toLowerCase()}`;
                      return (
                        <a
                          key={i}
                          href={href}
                          className="text-base2 font-Avertastd hover:text-red no-underline">
                          {item}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 md:space-x-4">
                <a href="/order">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-red flex justify-center items-center cursor-pointer relative">
                    <i className=" text-base1 bi bi-cart3"></i>
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </a>

                <div className="relative">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-red500 flex justify-center items-center"
                    aria-label="User Menu">
                    <img
                      src={userImg}
                      alt="User"
                      className="w-8 h-8 md:w-10 md:h-10"
                    />
                  </button>

                  {showLogin && (
                    <Login
                      onLoginSuccess={() => {
                        localStorage.setItem("userLoggedIn", "true");
                        setIsLoggedIn(true);
                        setShowLogin(false);
                      }}
                    />
                  )}

                  {isLoggedIn && showPopover && (
                    <div
                      ref={popoverRef}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20 border border-gray-200 text-sm">
                      <ul className="py-1">
                        <li
                          onClick={handleProfile}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Account
                        </li>
                        <li
                          className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}>
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div
                  className="lg:hidden w-10 md:w-12 h-10 md:h-12 rounded-full bg-red-600 flex justify-center items-center cursor-pointer"
                  onClick={() => setMenuOpen(!menuOpen)}>
                  <img src={toggle} alt="Toggle" className="w-12 h-10" />
                </div>

                <div className="hidden lg:block pl-2">
                  <button
                    className="bg-red text-base1 font-semibold px-7 py-3 rounded text-center transition-all duration-100"
                    onClick={() => navigate("/order")}>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed left-0 right-0 z-50 bg-white transition-all duration-300 ease-[cubic-bezier(0.17,0.04,0.03,0.94)] max-w-none ${
          menuOpen ? "top-0" : "-top-[500px]"
        }`}
        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 7px 10px 0px" }}>
        <div className="py-4 px-5 flex justify-between items-center">
          <a href="/home">
            <img
              src={logo1}
              alt="website-logo"
              className="h-[4.5rem] md:h-20"
            />
          </a>
          <button onClick={() => setMenuOpen(false)}>
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <div className="py-3.5 md:py-4 px-6 bg-red flex justify-between items-center">
          <a
            href="/order"
            className="text-red no-underline bg-white font-AvertaStdBold capitalize px-7 py-3 rounded-sm2 text-center transition-all duration-100 inline-block">
            Order Now
          </a>
        </div>

        <div className="py-4 px-5 space-y-6 no-underline md:space-y-7">
          {["Home", "About", "Order Now", "Contact"].map((item, i) => (
            <div key={i}>
              <a
                className="text-base font-AvertastdSemiBold no-underline text-color w-full inline-block"
                href={
                  item === "Order Now" ? "/order" : `/${item.toLowerCase()}`
                }>
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
