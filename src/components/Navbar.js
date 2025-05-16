import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../components/OrderContext";
import Login from "../components/Login";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useOrder();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white  shadow-md">
        <div className="py-3 md:py-5 lg:py-1">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center flex-1">
                <a href="/home">
                  <img
                    src="/images/mex-chicken.png"
                    alt="website-logo"
                    className="h-[4.5rem] md:h-20 rounded-md hidden 2xl:block"
                  />
                  <img
                    src="/images/fav-Dark.png"
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
                      let href = "/#";
                      if (item === "Home") href = "/home";
                      else if (item === "About") href = "/about";
                      else if (item === "Order Now") href = "/order";
                      else if (item === "Contact") href = "/contact";
                      else if (item === "Reservation") href = "/reservation";
                      return (
                        <a
                          key={i}
                          className="text-base2 font-Avertastd hover:text-red"
                          href={href}>
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
                    <svg
                      className="h-12 w-12"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_94_44754)">
                        <path
                          d="M25.0929 13.046C24.9759 12.9021 24.8004 12.8185 24.6149 12.8185H13.4574L13.4117 12.3987L13.4101 12.3852C13.1914 10.7184 11.7588 9.46143 10.0777 9.46143C9.73745 9.46143 9.46167 9.7372 9.46167 10.0774C9.46167 10.4176 9.73745 10.6934 10.0777 10.6934C11.1404 10.6934 12.0464 11.4864 12.1878 12.5391L12.92 19.2657C12.2796 19.5564 11.8332 20.2018 11.8332 20.9496C11.8332 20.9547 11.8333 20.9598 11.8334 20.965C11.8333 20.9701 11.8332 20.9752 11.8332 20.9804C11.8332 21.9993 12.6622 22.8283 13.6812 22.8283H13.9318C13.8692 23.012 13.8352 23.2088 13.8352 23.4135C13.8352 24.4155 14.6503 25.2307 15.6523 25.2307C16.6543 25.2307 17.4695 24.4155 17.4695 23.4135C17.4695 23.2088 17.4355 23.012 17.3728 22.8283H20.0301C19.9675 23.012 19.9335 23.2088 19.9335 23.4135C19.9335 24.4155 20.7486 25.2307 21.7506 25.2307C22.7526 25.2307 23.5678 24.4155 23.5678 23.4135C23.5678 22.4115 22.7526 21.5963 21.7506 21.5963H13.6812C13.3415 21.5963 13.0652 21.32 13.0652 20.9804C13.0652 20.9752 13.0651 20.9701 13.065 20.965C13.0651 20.9598 13.0652 20.9547 13.0652 20.9496C13.0652 20.6099 13.3415 20.3336 13.6812 20.3336H21.5452C22.6386 20.3336 23.6421 19.657 24.1017 18.61C24.2384 18.2985 24.0967 17.9351 23.7852 17.7984C23.4737 17.6616 23.1104 17.8033 22.9736 18.1148C22.7146 18.7051 22.1405 19.1016 21.5452 19.1016H14.1413L13.5915 14.0505H23.8572L23.5558 15.4955C23.4863 15.8285 23.7 16.1548 24.033 16.2243C24.0754 16.2331 24.1177 16.2374 24.1594 16.2374C24.445 16.2374 24.7012 16.0377 24.7618 15.7471L25.2179 13.5603C25.2558 13.3788 25.2099 13.1899 25.0929 13.046ZM21.7506 22.8283C22.0733 22.8283 22.3358 23.0908 22.3358 23.4135C22.3358 23.7362 22.0733 23.9987 21.7506 23.9987C21.4279 23.9987 21.1654 23.7362 21.background-color: black;1654 23.4135C21.1654 23.0908 21.4279 22.8283 21.7506 22.8283ZM15.6523 22.8283C15.975 22.8283 16.2375 23.0908 16.2375 23.4135C16.2375 23.7362 15.975 23.9987 15.6523 23.9987C15.3296 23.9987 15.0671 23.7362 15.0671 23.4135C15.0671 23.0908 15.3296 22.8283 15.6523 22.8283Z"
                          fill="#FEFEFE"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_94_44754">
                          <rect
                            width="15.7692"
                            height="15.7692"
                            fill="white"
                            transform="translate(9.46167 9.46143)"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    {/* Badge for cart item count */}
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </a>

                <div
                  className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-red500 flex justify-center items-center cursor-pointer"
                  onClick={() => setShowLogin((prev) => !prev)}>
                  <img
                    src="/images/user.png"
                    alt="User"
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </div>
                {showLogin && <Login />}

                <div
                  className="lg:hidden w-10 md:w-12 h-10 md:h-12 rounded-full bg-red-600 flex justify-center items-center cursor-pointer"
                  onClick={() => setMenuOpen((prev) => !prev)}>
                  <img
                    src="/images/toggle.png"
                    alt="Toggle"
                    className="w-12 h-12"
                  />
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
      {/* Slide Down Mobile Menu */}
      <div
        className={`fixed left-0 right-0 z-50 bg-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.17,0.04,0.03,0.94)] max-w-none ${
          menuOpen ? "top-0" : "-top-[500px]"
        }`}
        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 7px 10px 0px" }}>
        <div className="py-4 px-5 flex justify-between items-center">
          <a href="/home">
            <img
              src="/images/fav-Dark.png"
              alt="website-logo"
              className="h-[4.5rem] md:h-20"
            />
          </a>
          <button onClick={() => setMenuOpen(false)}>
            <svg
              className="h-6.5 w-6.5"
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none">
              <path
                d="M9 27L27 9M9 9l18 18"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <div className="py-3.5 md:py-4 px-6 bg-red flex justify-between items-center">
          <a
            href="/order"
            className="text-red bg-white font-AvertaStdBold capitalize px-7 py-3 rounded-sm2 text-center transition-all duration-100 inline-block">
            Order Now
          </a>

          <div className="flex space-x-3.5">
            <a href="/order">
              <div className="w-12 h-12 rounded-full bg-cgray-50 flex justify-center items-center cursor-pointer">
                <svg
                  className="h-12 w-12"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_94_44754)">
                    <path
                      d="M25.0929 13.046C24.9759 12.9021 24.8004 12.8185 24.6149 12.8185H13.4574L13.4117 12.3987L13.4101 12.3852C13.1914 10.7184 11.7588 9.46143 10.0777 9.46143C9.73745 9.46143 9.46167 9.7372 9.46167 10.0774C9.46167 10.4176 9.73745 10.6934 10.0777 10.6934C11.1404 10.6934 12.0464 11.4864 12.1878 12.5391L12.92 19.2657C12.2796 19.5564 11.8332 20.2018 11.8332 20.9496C11.8332 20.9547 11.8333 20.9598 11.8334 20.965C11.8333 20.9701 11.8332 20.9752 11.8332 20.9804C11.8332 21.9993 12.6622 22.8283 13.6812 22.8283H13.9318C13.8692 23.012 13.8352 23.2088 13.8352 23.4135C13.8352 24.4155 14.6503 25.2307 15.6523 25.2307C16.6543 25.2307 17.4695 24.4155 17.4695 23.4135C17.4695 23.2088 17.4355 23.012 17.3728 22.8283H20.0301C19.9675 23.012 19.9335 23.2088 19.9335 23.4135C19.9335 24.4155 20.7486 25.2307 21.7506 25.2307C22.7526 25.2307 23.5678 24.4155 23.5678 23.4135C23.5678 22.4115 22.7526 21.5963 21.7506 21.5963H13.6812C13.3415 21.5963 13.0652 21.32 13.0652 20.9804C13.0652 20.9752 13.0651 20.9701 13.065 20.965C13.0651 20.9598 13.0652 20.9547 13.0652 20.9496C13.0652 20.6099 13.3415 20.3336 13.6812 20.3336H21.5452C22.6386 20.3336 23.6421 19.657 24.1017 18.61C24.2384 18.2985 24.0967 17.9351 23.7852 17.7984C23.4737 17.6616 23.1104 17.8033 22.9736 18.1148C22.7146 18.7051 22.1405 19.1016 21.5452 19.1016H14.1413L13.5915 14.0505H23.8572L23.5558 15.4955C23.4863 15.8285 23.7 16.1548 24.033 16.2243C24.0754 16.2331 24.1177 16.2374 24.1594 16.2374C24.445 16.2374 24.7012 16.0377 24.7618 15.7471L25.2179 13.5603C25.2558 13.3788 25.2099 13.1899 25.0929 13.046ZM21.7506 22.8283C22.0733 22.8283 22.3358 23.0908 22.3358 23.4135C22.3358 23.7362 22.0733 23.9987 21.7506 23.9987C21.4279 23.9987 21.1654 23.7362 21.background-color: black;1654 23.4135C21.1654 23.0908 21.4279 22.8283 21.7506 22.8283ZM15.6523 22.8283C15.975 22.8283 16.2375 23.0908 16.2375 23.4135C16.2375 23.7362 15.975 23.9987 15.6523 23.9987C15.3296 23.9987 15.0671 23.7362 15.0671 23.4135C15.0671 23.0908 15.3296 22.8283 15.6523 22.8283Z"
                      fill="#FEFEFE"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_94_44754">
                      <rect
                        width="15.7692"
                        height="15.7692"
                        fill="white"
                        transform="translate(9.46167 9.46143)"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </a>
            <div
              className="w-12 h-12 rounded-full bg-cgray-50 flex justify-center items-center cursor-pointer"
              onClick={() => setShowLogin((prev) => !prev)}>
              <img src="/images/user.png" alt="User" className="w-8 h-8" />
              {showLogin && <Login />}
            </div>
          </div>
        </div>

        <div className="py-4 px-5 space-y-6 md:space-y-7">
          {["Home", "About", "Order Now", "Contact"].map((item, i) => (
            <div key={i}>
              <a
                className="text-base font-AvertastdSemiBold text-color w-full inline-block"
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
