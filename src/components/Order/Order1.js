/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Info from "./Info";
import { useOrder } from "../OrderContext";
import FriedChicken from "./FriedChicken";
import KidsMeals from "./KidsMeals";
import Alert from "./Alert";
import Burgers from "./Burgers";
import Wraps from "./Wraps";
import PeriPeriChicken from "./PeriPeriChicken";
import PeriPeriBurgers from "./PeriPeriBurgers";
import PeriPeriFamilyMeals from "./PeriPeriFamilyMeals";
import FamilyBucket from "./FamilyBucket";
import rightarrow from "../../images/right-arrow 1.png";
import rectangle from "../../images/rectangle-48.png";
import Group from "../../images/Group.jpg";
import TextureWhite from "../../images/Texture-White.png";
import BurgerMobile from "../../images/Burgermobile.jpeg";
import FriedChickenMobile from "../../images/friedchickenmobile.jpeg";
import KidsMealsMobile from "../../images/kidsmealsmobile.jpeg";
import WrapsMobile from "../../images/wrapsmobile.jpeg";
import PeriPeriChickenMobile from "../../images/periperichickenmobile.jpeg";
import PeriPeriBurgerMobile from "../../images/periperiburgermobile.jpeg";
import PeriPeriFamilyMobile from "../../images/periperifamilymealmobile.jpeg";
import FamilyBuckMobile from "../../images/familybuckermobile.jpeg";
import deliveryman from "../../images/delivery-man.svg";
import deliveryclose from "../../images/deliverydelete.png";
import warning from "../../images/triangle-warning.png";
import InfoIcon from "../../images/Info.png";
import GroupDown from "../../images/Groupdown.png";

const Order1 = () => {
  const navigate = useNavigate();
  const {
    orderType,
    setOrderType,
    pickupTime,
    setPickupTime,
    postcode,
    setPostcode,
    cartItems,
    setCartItems,
    orderInstructions,
    setOrderInstructions,
  } = useOrder();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const scrollRef = useRef(null);
  const [isValid, setIsValid] = useState(null);
  const [showAllergyPopup, setShowAllergyPopup] = useState(false);
  const [submittedCode, setSubmittedCode] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedOrderType = localStorage.getItem("orderType");
    const storedPostcode = localStorage.getItem("postcode");
    const storedPickupTime = localStorage.getItem("pickupTime");

    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedOrderType) setOrderType(storedOrderType);
    if (storedPostcode) setPostcode(storedPostcode);
    if (storedPickupTime) setPickupTime(storedPickupTime);
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orderType", orderType);
  }, [orderType]);

  useEffect(() => {
    localStorage.setItem("postcode", postcode);
  }, [postcode]);

  useEffect(() => {
    localStorage.setItem("pickupTime", pickupTime);
  }, [pickupTime]);

  useEffect(() => {
    const generatePickupTimes = () => {
      const now = new Date();
      const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
      const startHour = 17;
      const endHour = 23;
      const slots = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let min of [0, 30]) {
          const slotTime = new Date(now);
          slotTime.setHours(hour, min, 0, 0);
          if (slotTime > now) {
            const formatted = slotTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            slots.push(`${formatted} (${dayName})`);
          }
        }
      }
      setTimeOptions(slots);
    };
    generatePickupTimes();
  }, []);

  const handlePickupChange = (e) => {
    setPickupTime(e.target.value);
  };

  useEffect(() => {
    if (showAllergyPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAllergyPopup]);
  const validDeliveryPostcodes = [
    "EH21 6UU",
    "EH22 1AA",
    "EH23 3BB",
    "EH24 4CC",
    "EH25 5DD",
    "EH26 6EE",
    "EH27 7FF",
    "EH28 8GG",
    "EH29 9HH",
    "EH30 0II",
  ];

  const handleCheckDelivery = () => {
    const formatted = postcode.trim().toUpperCase();
    if (validDeliveryPostcodes.includes(formatted)) {
      setIsValid(true);
      setSubmittedCode(formatted);
    } else {
      setIsValid(false);
      setSubmittedCode("");
    }
  };

  const handleClosePopup = () => {
    setIsValid(null);
  };

  useEffect(() => {
    if (isValid) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isValid]);

  const handleCheckout = () => {
    const isPickupInvalid = orderType === "pickup" && !pickupTime;
    const isDeliveryInvalid =
      orderType === "delivery" && (!isValid || !submittedCode);

    if (!orderType || isPickupInvalid || isDeliveryInvalid) {
      setShowAlert(true);
      return;
    }
    localStorage.removeItem("cartItems");
    localStorage.removeItem("orderType");
    localStorage.removeItem("postcode");
    localStorage.removeItem("pickupTime");

    setShowAlert(false);
    navigate("/checkout");
  };

  /* For Classic Shawarma  */
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.name === product.name && i.variation === product.variation
      );

      if (existingIndex !== -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + product.quantity,
        };
        return updated;
      }

      return [...prevItems, { ...product }];
    });
  };

  useEffect(() => {
    console.log("Cart Updated:", cartItems);
  }, [cartItems]);

  const handleAddToCart1 = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);

      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleClearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [cartItems]);

  return (
    <div className="order-container">
      <div
        class="home-section"
        style={{ backgroundImage: `url(${rectangle})` }}>
        <h1>Order Now</h1>
        <div className="inline-container">
          <p className="inline-content">
            <span1>Home</span1>
            <img src={rightarrow} alt="Arrow" className="arrow-icon" />
            <span>Order Now</span>
          </p>
        </div>
      </div>

      <section
        class="order-now relative bg-cover  bg-center bg-fixed"
        style={{ backgroundImage: `url(${Group})` }}>
        <div class="block w-full absolute -top-2 md:-top-5 lg:-top-20 left-0 right-0 z-90">
          <img class="w-full" src={TextureWhite} alt="Overlay Image" />
        </div>
        <div class="relative container">
          <div class="order-now-content">
            <div className="order-opening mb-5 px-6 py-4 rounded-sm2 bg-yellow">
              <div className="flex flex-col lg:flex-row gap-2 justify-end md:justify-between items-center">
                <div className="text-black text-cgreen-500 font-Avertastd">
                  <span>Open at 1:00 PM to 11:00 PM</span>
                </div>
                <div className="text-black text-cgreen-500 font-Avertastd">
                  <div className="flex flex-col lg:flex-row items-center gap-2">
                    <span className="text-center">
                      Online ordering is now available, place your orders today!
                    </span>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => setShowInfo(true)}
                      aria-hidden="true">
                      <i className="bi bi-info-circle"></i>
                      <span className="text-[#005FCB]">Info</span>
                    </div>
                    {showInfo && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="relative bg-white rounded-lg shadow-xl max-w-[95%] sm:max-w-[32rem] w-full p-4">
                          <button
                            onClick={() => setShowInfo(false)}
                            className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500">
                            &times;
                          </button>
                          <Info />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-9 gap-3">
            <div className="order-menu-item lg:col-span-2">
              {/* Desktop View */}
              <div
                className="hidden lg:block p-5 shadow-custom rounded-sm2 bg-white sticky top-30 h-100 custom-shadow"
                style={{
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="menu-item-title">
                    <h5 className="text-black capitalize font-Avertastd">
                      Menu Items
                    </h5>
                  </div>
                </div>
                <nav
                  className="custom_scrollbar   no-underline flex flex-1 flex-col max-h-[70vh] overflow-x-hidden overflow-y-auto "
                  style={{
                    overflow: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}>
                  <ul
                    role="list"
                    className="flex flex-1  justify-between flex-col gap-y-7">
                    <li>
                      <ul
                        role="list"
                        className="-mx-14 hover:active:text-red text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize items-center font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md pl-1 pr-2 py-2"
                            href="#1">
                            <div
                              data-to-scrollspy-id="1"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Burgers
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#2">
                            <div
                              data-to-scrollspy-id="2"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Fried Chicken
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#3">
                            <div
                              data-to-scrollspy-id="3"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Kids Meals
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#4">
                            <div
                              data-to-scrollspy-id="4"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Wraps
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#5">
                            <div
                              data-to-scrollspy-id="5"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Peri Peri Chicken
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#6">
                            <div
                              data-to-scrollspy-id="6"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Peri Peri Burgers
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#7">
                            <div
                              data-to-scrollspy-id="7"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Peri Peri Family Meals
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#8">
                            <div
                              data-to-scrollspy-id="8"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Family Bucket
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <ul role="list" className="-mx-14 text-black space-y-1">
                        <li className="py-2 border-b border-grey500 cursor-pointer">
                          <a
                            className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                            href="#9">
                            <div
                              data-to-scrollspy-id="9"
                              className="active-scroll-spy"
                              style={{ textAlign: "left" }}>
                              Extras
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Mobile View */}
              <div
                className="lg:hidden flex items-center gap-4 overflow-x-auto custom-scrollbar-hide py-4 px-2"
                style={{
                  overflow: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}>
                {[
                  {
                    id: 1,
                    name: "Burgers",
                    img: BurgerMobile,
                  },
                  {
                    id: 2,
                    name: "Fried Chicken",
                    img: FriedChickenMobile,
                  },
                  {
                    id: 3,
                    name: "Kids Meals",
                    img: KidsMealsMobile,
                  },
                  {
                    id: 4,
                    name: "Wraps",
                    img: WrapsMobile,
                  },
                  {
                    id: 5,
                    name: "Peri Peri Chicken",
                    img: PeriPeriChickenMobile,
                  },
                  {
                    id: 6,
                    name: "Peri Peri Burgers",
                    img: PeriPeriBurgerMobile,
                  },
                  {
                    id: 7,
                    name: "Peri Peri Family Meals",
                    img: PeriPeriFamilyMobile,
                  },
                  {
                    id: 8,
                    name: "Family Bucket",
                    img: FamilyBuckMobile,
                  },
                  {
                    id: 9,
                    name: "Extras",
                    img: FamilyBuckMobile,
                  },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    data-to-scrollspy-id={item.id}
                    className="flex-shrink-0 w-36 flex flex-col items-center bg-white rounded-md p-2 shadow-md">
                    <div className="w-28 h-28">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <p className="text-center text-sm font-medium text-cgreen-400 hover:text-primary mt-2 line-clamp-2">
                      {item.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
            <div class="order-products lg:col-span-4 ">
              <div class="flex flex-col gap-3">
                <div className="w-full search-product shadow-custom rounded-sm2 lg:sticky top-[88px]">
                  <div
                    className="relative flex items-center w-full h-12 rounded-sm2 focus-within:shadow-lg bg-cwhite-primary overflow-hidden"
                    style={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}>
                    <div className="grid place-items-center h-full w-12 text-black bg-white">
                      <i className="bi bi-search"></i>
                    </div>
                    <input
                      className="peer h-full w-full outline-none text-base font-AvertastdRegular text-cgreen-200 pr-2"
                      type="text"
                      id="search"
                      placeholder="Search.."
                    />
                    <div className="px-2 cursor-pointer grid place-items-center h-full w-12 text-black bg-white">
                      <i className="bi bi-x-circle-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="category-products flex flex-col gap-2 gap-y-3 mt-3 shadow-custom rounded-sm2">
                    <div
                      className="category-container max-h-[75vh] overflow-y-auto custom_scrollbar pr-2"
                      style={{
                        overflow: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}>
                      <Burgers onAddToCart={handleAddToCart} />
                      <FriedChicken onAddToCart={handleAddToCart} />
                      <KidsMeals onAddToCart={handleAddToCart} />
                      <Wraps onAddToCart={handleAddToCart1} />
                      <PeriPeriChicken onAddToCart={handleAddToCart} />
                      <PeriPeriBurgers onAddToCart={handleAddToCart} />
                      <PeriPeriFamilyMeals onAddToCart={handleAddToCart} />
                      <FamilyBucket onAddToCart={handleAddToCart} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-3">
              <div
                className="sticky top-[128px] bg-white p-5 shadow-custom rounded-sm2 custom_scrollbar"
                style={{
                  maxHeight: "calc(100vh - 128px)",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  overflowY: "auto",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}>
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="cart-title">
                    <h6
                      id="your_cart"
                      className="text-black font-Avertastd capitalize">
                      Your Cart
                    </h6>
                  </div>
                  <div className="lg:hidden close-bar cursor-pointer">
                    <svg width="24" height="24" fill="currentColor"></svg>
                  </div>
                </div>
                <div className="w-full">
                  {/* Order Type Buttons */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => setOrderType("pickup")}
                      className={`border-2 ${
                        orderType === "pickup"
                          ? "border-red"
                          : "border-gray-300"
                      } bg-grey400 rounded-md p-2 flex-1 cursor-pointer flex flex-col items-center gap-1`}
                      aria-hidden="true">
                      {/* Radio + Label */}
                      <div className="flex items-center gap-2">
                        <input
                          name="orderType"
                          type="radio"
                          checked={orderType === "pickup"}
                          readOnly
                          className="h-5 w-5 cursor-pointer"
                        />
                        <span className="text-red text-base font-semibold capitalize">
                          Pickup
                        </span>
                      </div>
                      <span className="text-xs text-center">
                        Starting at : 03:00 PM
                      </span>
                    </button>

                    <button
                      onClick={() => setOrderType("delivery")}
                      className={`border-2 ${
                        orderType === "delivery"
                          ? "border-red"
                          : "border-gray-300"
                      } bg-grey400 rounded-md p-2 flex-1 cursor-pointer flex flex-col items-center gap-1`}
                      aria-hidden="true">
                      <div className="flex items-center gap-2">
                        <input
                          name="orderType"
                          type="radio"
                          checked={orderType === "delivery"}
                          readOnly
                          className="h-5 w-5 cursor-pointer"
                        />
                        <span className="text-red text-base font-semibold capitalize">
                          Delivery
                        </span>
                      </div>
                      <span className="text-xs text-center">
                        Starting at : 04:00 PM
                      </span>
                    </button>
                  </div>

                  {/* Conditional Pickup or Delivery Section */}
                  {orderType === "pickup" ? (
                    <div className="flex flex-col justify-center gap-4 items-center mt-5">
                      <div className="flex flex-col gap-3 w-full">
                        <p className="text-cgreen-500 text-base font-semibold text-center capitalize">
                          Pickup Time
                        </p>
                        <div className="flex flex-col gap-1">
                          <div className="relative w-full">
                            <select
                              className="w-full appearance-none p-2 border-2 border-grey300 rounded pr-10"
                              value={pickupTime}
                              onChange={handlePickupChange}>
                              <option value="" disabled>
                                Select Your Pickup Time
                              </option>
                              {timeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>

                            {/* Chevron Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                              <i className="bi bi-chevron-down"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 w-full mt-5">
                      {isValid === true && (
                        <div className="w-full bg-white border-2 border-green-500 text-black p-2 rounded-md font-semibold flex items-center justify-center gap-2">
                          <span>Delivery Available to: {submittedCode}</span>
                          <img
                            src={deliveryclose}
                            alt="Close"
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => {
                              setSubmittedCode("");
                              setIsValid(null);
                              setPostcode("");
                            }}
                          />
                        </div>
                      )}

                      <div className="w-full">
                        <p className="text-cgreen-500 text-base font-semibold text-center">
                          Enter Delivery Postcode
                        </p>
                        <input
                          type="text"
                          placeholder="Enter Your Postcode"
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value)}
                          className="border border-gray-300 p-3 w-full rounded-md mt-3"
                        />
                      </div>
                      <button
                        onClick={handleCheckDelivery}
                        className="bg-red text-base font-semibold text-white w-full p-2 rounded-md cursor-pointer">
                        CHECK DELIVERY
                      </button>

                      {/* Pop-up */}
                      {isValid === false && (
                        <div className="fixed inset-0 scroll-m-1 flex justify-center items-center bg-opacity-10 z-50">
                          <div className="edit-pop-up max-w-md mx-auto bg-white rounded-md shadow-custom p-5 text-center">
                            <div className="flex justify-end">
                              <div
                                className="cursor-pointer text-3xl text-black"
                                onClick={handleClosePopup}>
                                &times;
                              </div>
                            </div>
                            <div className="flex flex-col bg-transparent gap-3 items-center py-3">
                              <img
                                src={deliveryman}
                                alt="Delivery Not Eligible"
                                className="w-20 h-20"
                              />
                              <p className="text-base font-semibold text-black">
                                No Delivery to this Area
                              </p>
                              <button
                                onClick={handleClosePopup}
                                className="p-2 px-6 rounded-md bg-red w-50 text-white text-base font-semibold">
                                Ok
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Order Details */}
                {cartItems.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between my-1 mt-4">
                      <h5 className="text-black font-AvertaStdBold">
                        Order Details
                      </h5>
                      <button
                        className="text-sm text-red font-AvertastdRegular"
                        onClick={handleClearCart}>
                        Clear All
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div
                      ref={scrollRef}
                      className="custom_scrollbar card-items flex flex-col gap-2 mt-4 max-h-[40vh] overflow-x-hidden overflow-y-auto pr-2">
                      {cartItems.map((item, index) => (
                        <div className="product-item" key={index}>
                          <div className="flex items-center gap-1">
                            {/* Product Name */}
                            <div className="product-name cursor-pointer w-2/4">
                              <div className="text-sm text-black font-AvertastdRegular break-words">
                                <span className="capitalize">{item.name}</span>
                                <span> ({item.variation})</span>
                              </div>
                            </div>

                            {/* Quantity & Price */}
                            <div className="product-actions flex items-center justify-between gap-1 w-2/4">
                              <div className="product-quantity-actions grid grid-cols-3 items-center divide-x divide-red border-2 border-red  rounded-sm2 max-w-[100px]">
                                {/* Decrease or Delete */}
                                <button
                                  className="flex justify-center items-center text-red cursor-pointer px-3 py-2"
                                  onClick={() => {
                                    if (item.quantity === 1) {
                                      setCartItems((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    } else {
                                      setCartItems((prev) =>
                                        prev.map((p, i) =>
                                          i === index
                                            ? { ...p, quantity: p.quantity - 1 }
                                            : p
                                        )
                                      );
                                    }
                                  }}>
                                  <i
                                    className={`bi ${
                                      item.quantity === 1
                                        ? "bi-trash"
                                        : "bi-dash-lg"
                                    }`}></i>
                                </button>

                                {/* Quantity Count */}
                                <div className="text-red flex justify-center items-center px-3 py-2">
                                  <span className="text-sm font-AvertastdRegular text-red">
                                    {item.quantity}
                                  </span>
                                </div>

                                {/* Increase */}
                                <button
                                  className="flex justify-center items-center cursor-pointer px-3 py-2"
                                  onClick={() =>
                                    setCartItems((prev) =>
                                      prev.map((p, i) =>
                                        i === index
                                          ? { ...p, quantity: p.quantity + 1 }
                                          : p
                                      )
                                    )
                                  }>
                                  <i className="bi bi-plus-lg text-red"></i>
                                </button>
                              </div>

                              {/* Price */}
                              <div className="product-price">
                                <div className="text-sm text-black font-AvertaStdBold">
                                  <span className="px-1">£</span>
                                  {(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Optional Comment Display */}
                          {item.comment && (
                            <div className="flex flex-col w-full pl-1 mt-1">
                              <div className="text-xs py-1 text-gray font-AvertastdRegular break-words">
                                Comment:{" "}
                                <span className="text-xs text-gray font-AvertastdRegular">
                                  {item.comment}
                                </span>
                              </div>
                            </div>
                          )}
                          {item.addon && (
                            <div className="flex flex-col w-full pl-1 mt-1">
                              <div className="text-xs py-1 text-gray font-AvertastdRegular break-words">
                                Add On:{" "}
                                <span className="text-xs text-gray font-AvertastdRegular">
                                  {item.addon}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="flex flex-col gap-2 py-2.5 w-full border-y border-grey500 mt-3">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center">
                          <div className="text-red  capitalize font-semibold">
                            Sub Total
                          </div>
                          <div className="text-base text-cgreen-500 font-semibold capitalize">
                            <span className="px-1">£</span>
                            {subtotal.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-base text-green300 font-semibold capitalize">
                            {orderType === "delivery"
                              ? "Delivery Charges"
                              : "Pickup Charges"}
                          </div>

                          <div className="text-base text-cgreen-300 font-semibold">
                            <span className="px-1">£</span>0.00
                          </div>
                        </div>
                      </div>
                      <div className="py-1 flex justify-between border-t border-grey500">
                        <div className="total-title">
                          <h5 className="text-green500 text-xl font-AvertaStdBold uppercase">
                            Total
                          </h5>
                        </div>
                        <div className="total-price">
                          <h5 className="text-green500 text-xl font-AvertaStdBold uppercase">
                            <span className="px-1">£</span>
                            {subtotal.toFixed(2)}
                          </h5>
                        </div>
                      </div>

                      {/* Note + Checkout */}
                      <div className="flex items-center gap-4 bg-[#fef9ec] p-1 rounded-md">
                        <img src={InfoIcon} alt="Close" className="w-6 h-6 " />
                        <p className="text-sm font-medium text-yellow800">
                          If you’re allergic or intolerant to any food items,
                          <button
                            type="button"
                            onClick={() => setShowAllergyPopup(true)}
                            className="underline text-red ml-1">
                            Click here
                          </button>
                        </p>

                        {/* Allergy & Dietary Popup */}
                        {showAllergyPopup && (
                          <div className="fixed inset-0 z-50  flex items-center justify-center">
                            <div className="bg-white max-w-2xl h-80 rounded-lg shadow-xl p-4 text-center relative">
                              <img
                                src={warning}
                                alt="Allergy And Dietary"
                                className="w-20 h-20 mx-auto"
                              />
                              <h1 className=" font-semibold text-red500 text-3xl mt-4">
                                Allergy & Dietary Information
                              </h1>
                              <p className="text-xm text-black mt-2">
                                If you have an allergy that could harm your
                                health, we strongly advise you to contact
                                (1234413455) the store directly before you place
                                your order. More information about allergy
                                policies is available on our FAQ page.
                              </p>
                              <div className="flex justify-center gap-3 mt-4">
                                <button
                                  className="px-6 py-2 w-40 border-2 border-grey300 rounded-md font-semibold hover:bg-gray-200"
                                  onClick={() => setShowAllergyPopup(false)}>
                                  OK
                                </button>
                                <button className="px-6 py-2 w-40 bg-red500 text-white rounded-md font-semibold">
                                  FAQ PAGE
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Input Field */}
                      <div className="">
                        <input
                          className="w-full px-3 py-3 border bg-white border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
                          placeholder="e.g Instruction of your order"
                          type="text"
                          value={orderInstructions}
                          onChange={(e) => setOrderInstructions(e.target.value)}
                        />
                      </div>
                      <>
                        <button
                          className="checkout-button flex items-center justify-center cursor-pointer w-full text-white bg-red hover:bg-primary py-4 text-center rounded-sm2 uppercase"
                          onClick={handleCheckout}>
                          checkout
                        </button>
                        {showAlert && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="relative bg-white rounded-lg shadow-xl max-w-[95%] sm:max-w-[32rem] w-full p-4">
                              <Alert
                                show={showAlert}
                                onClose={() => setShowAlert(false)}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  </>
                ) : (
                  <div className="py-10 relative flex justify-center items-center flex-col">
                    <div
                      title=""
                      role="button"
                      aria-label="animation"
                      tabIndex="0"
                      className="flex justify-center items-center w-52 h-52 bg-transparent"
                      style={{
                        outline: "none",
                      }}>
                      <i className="bi bi-cart3 text-[80px] text-cgreen-500 animate-bounce"></i>
                    </div>
                    <p className="pt-3 text-center text-cgreen-500 font-sm font-AvertastdRegular">
                      Cart is empty — select any items to fill cart
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile Cart Toggle */}
      <section className="cart-total bg-red py-6 fixed lg:hidden bottom-0 left-0 right-0 z-10">
        <div className="relative">
          <div className="absolute left-1/2 -top-5 -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-12 md:w-20 h-12 md:h-20 rounded-full bg-white p-2 md:p-4 flex justify-center items-center cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}>
              <i className="bi bi-cart3 text-red text-xl"></i>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1 text-center">
              <h5 className="text-white font-Avertastd capitalize">
                {cartItems.length} items
              </h5>
              <h5 className="text-white font-AvertastdSemi capitalize flex flex-row">
                <span className="px-1">£</span>
                {subtotal.toFixed(2)}
              </h5>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-red text-lg bg-white px-6 py-2 rounded-sm2 font-AvertaStdEB capitalize">
              View Cart
            </button>
          </div>
        </div>
      </section>
      {/* Cart Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowY: "auto",
          }}>
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-black font-Avertastd capitalize">Your Cart</h6>
            <button
              className="text-2xl text-gray-600"
              onClick={() => setIsDrawerOpen(false)}>
              &times;
            </button>
          </div>

          <div className="w-full">
            {/* Order Type Buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setOrderType("pickup")}
                className={`border-2 ${
                  orderType === "pickup" ? "border-red" : "border-gray-300"
                } bg-grey400 rounded-md p-2 flex-1 cursor-pointer flex flex-col items-center gap-1`}
                aria-hidden="true">
                {/* Radio + Label */}
                <div className="flex items-center gap-2">
                  <input
                    name="orderType"
                    type="radio"
                    checked={orderType === "pickup"}
                    readOnly
                    className="h-5 w-5 cursor-pointer"
                  />
                  <span className="text-red text-base font-semibold capitalize">
                    Pickup
                  </span>
                </div>
                <span className="text-xs text-center">
                  Starting at : 03:00 PM
                </span>
              </button>

              <button
                onClick={() => setOrderType("delivery")}
                className={`border-2 ${
                  orderType === "delivery" ? "border-red" : "border-gray-300"
                } bg-grey400 rounded-md p-2 flex-1 cursor-pointer flex flex-col items-center gap-1`}
                aria-hidden="true">
                <div className="flex items-center gap-2">
                  <input
                    name="orderType"
                    type="radio"
                    checked={orderType === "delivery"}
                    readOnly
                    className="h-5 w-5 cursor-pointer"
                  />
                  <span className="text-red text-base font-semibold capitalize">
                    Delivery
                  </span>
                </div>
                <span className="text-xs text-center">
                  Starting at : 04:00 PM
                </span>
              </button>
            </div>

            {/* Conditional Pickup or Delivery Section */}
            {orderType === "pickup" ? (
              <div className="flex flex-col justify-center gap-4 items-center mt-5">
                <div className="flex flex-col gap-3 w-full">
                  <p className="text-cgreen-500 text-base font-semibold text-center capitalize">
                    Pickup Time
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="relative w-full">
                      <select
                        className="w-full appearance-none p-2 border-2 border-grey300 rounded pr-10"
                        value={pickupTime}
                        onChange={handlePickupChange}>
                        <option value="" disabled>
                          Select Your Pickup Time
                        </option>
                        {timeOptions.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      {/* Chevron Icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 w-full mt-5">
                {isValid === true && (
                  <div className="w-full bg-white border-2 border-green-500 text-black p-2 rounded-md font-semibold flex items-center justify-center gap-2">
                    <span>Delivery Available to: {submittedCode}</span>
                    <img
                      src={deliveryclose}
                      alt="Close"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => {
                        setSubmittedCode("");
                        setIsValid(null);
                        setPostcode("");
                      }}
                    />
                  </div>
                )}

                <div className="w-full">
                  <p className="text-cgreen-500 text-base font-semibold text-center">
                    Enter Delivery Postcode
                  </p>
                  <input
                    type="text"
                    placeholder="Enter Your Postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="border border-gray-300 p-3 w-full rounded-md mt-3"
                  />
                </div>
                <button
                  onClick={handleCheckDelivery}
                  className="bg-red text-base font-semibold text-white w-full p-2 rounded-md cursor-pointer">
                  CHECK DELIVERY
                </button>

                {/* Pop-up */}
                {isValid === false && (
                  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
                    <div className="edit-pop-up max-w-md mx-auto bg-white rounded-md shadow-custom p-5 text-center">
                      <div className="flex justify-end">
                        <div
                          className="cursor-pointer text-3xl text-black"
                          onClick={handleClosePopup}>
                          &times;
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 items-center py-3">
                        <img
                          src={deliveryman}
                          alt="Delivery Not Eligible"
                          className="w-20 h-20"
                        />
                        <p className="text-base font-semibold text-black">
                          No Delivery to this Area
                        </p>
                        <button
                          onClick={handleClosePopup}
                          className="p-2 px-6 rounded-md bg-red w-50 text-white text-base font-semibold">
                          Ok
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Contents */}
          {cartItems.length > 0 ? (
            <>
              <div className="flex items-center justify-between my-4">
                <h5 className="text-black">Order Details</h5>
                <button
                  className="text-sm text-red font-AvertastdRegular"
                  onClick={handleClearCart}>
                  Clear All
                </button>
              </div>

              <div
                ref={scrollRef}
                className="custom_scrollbar card-items flex flex-col gap-2 mt-4 max-h-[40vh] overflow-x-hidden overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div className="product-item" key={index}>
                    <div className="flex items-center gap-1">
                      {/* Product Name */}
                      <div className="product-name cursor-pointer w-2/4">
                        <div className="text-sm text-cgreen-500 font-AvertastdRegular break-words">
                          <span className="capitalize">{item.name}</span>
                          <span> ({item.variation})</span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="product-actions flex items-center justify-between gap-1 w-2/4">
                        <div className="product-quantity-actions grid grid-cols-3 items-center divide-x divide-red border border-red rounded-sm2 max-w-[100px]">
                          {/* Decrease or Delete */}
                          <button
                            className="flex justify-center items-center text-red cursor-pointer px-3 py-2"
                            onClick={() => {
                              if (item.quantity === 1) {
                                setCartItems((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                              } else {
                                setCartItems((prev) =>
                                  prev.map((p, i) =>
                                    i === index
                                      ? { ...p, quantity: p.quantity - 1 }
                                      : p
                                  )
                                );
                              }
                            }}>
                            <i
                              className={`bi ${
                                item.quantity === 1 ? "bi-trash" : "bi-dash-lg"
                              }`}></i>
                          </button>

                          {/* Quantity Count */}
                          <div className="text-red flex justify-center items-center px-3 py-2">
                            <span className="text-sm font-AvertastdRegular text-red">
                              {item.quantity}
                            </span>
                          </div>

                          {/* Increase */}
                          <button
                            className="flex justify-center items-center cursor-pointer px-3 py-2"
                            onClick={() =>
                              setCartItems((prev) =>
                                prev.map((p, i) =>
                                  i === index
                                    ? { ...p, quantity: p.quantity + 1 }
                                    : p
                                )
                              )
                            }>
                            <i className="bi bi-plus-lg text-red"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="product-price">
                          <div className="text-sm text-cgreen-500 font-AvertastdBold">
                            <span className="px-1">£</span>
                            {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Optional Comment Display */}
                    {item.comment && (
                      <div className="flex flex-col w-full pl-1 mt-1">
                        <div className="text-xs py-1 text-gray font-AvertastdRegular break-words">
                          Comment:{" "}
                          <span className="text-xs text-gray font-AvertastdRegular">
                            {item.comment}
                          </span>
                        </div>
                      </div>
                    )}
                    {item.addon && (
                      <div className="flex flex-col w-full pl-1 mt-1">
                        <div className="text-xs py-1 text-gray font-AvertastdRegular break-words">
                          Add On:{" "}
                          <span className="text-xs text-gray font-AvertastdRegular">
                            {item.addon}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Totals and Allergy */}
              <div className="flex flex-col gap-2 py-2.5 w-full border-y border-grey500 mt-3">
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <div className="text-base text-cgreen-500 capitalize font-semibold">
                      Sub Total
                    </div>
                    <div className="text-base text-cgreen-500 font-semibold capitalize">
                      <span className="px-1">£</span>
                      {subtotal.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-base text-cgreen-300 font-semibold capitalize">
                      {orderType === "delivery"
                        ? "Delivery Charges"
                        : "Pickup Charges"}
                    </div>

                    <div className="text-base text-cgreen-300 font-semibold">
                      <span className="px-1">£</span>0.00
                    </div>
                  </div>
                </div>
                <div className="py-1 flex justify-between border-t border-grey500">
                  <div className="total-title">
                    <h5 className="text-cgreen-500 text-xl font-AvertastdSemiBold uppercase">
                      Total
                    </h5>
                  </div>
                  <div className="total-price">
                    <h5 className="text-cgreen-500 text-xl font-AvertastdSemiBold uppercase">
                      <span className="px-1">£</span>
                      {subtotal.toFixed(2)}
                    </h5>
                  </div>
                </div>

                {/* Note + Checkout */}
                <div className="flex items-center gap-2 bg-[#fef9ec] p-1 rounded-md">
                  <i className="bi bi-info-circle"></i>
                  <p className="text-sm font-medium text-gray-700">
                    If you’re allergic or intolerant to any food items,
                    <button
                      type="button"
                      onClick={() => setShowAllergyPopup(true)}
                      className="underline text-red ml-1">
                      Click here
                    </button>
                  </p>

                  {/* Allergy & Dietary Popup */}
                  {showAllergyPopup && (
                    <div className="fixed inset-0 z-50  flex items-center justify-center">
                      <div className="bg-white max-w-md w-full rounded-lg shadow-xl p-4 text-center relative">
                        <img
                          src={warning}
                          alt="Allergy And Dietary"
                          className="w-20 h-20 mx-auto"
                        />
                        <h1 className=" font-semibold text-2xl text-red500  mt-3">
                          Allergy & Dietary Information
                        </h1>
                        <p className="text-xm text-black mt-2">
                          If you have an allergy that could harm your health, we
                          strongly advise you to contact (1234413455) the store
                          directly before you place your order. More information
                          about allergy policies is available on our FAQ page.
                        </p>
                        <div className="flex justify-center gap-3 mt-4">
                          <button
                            className="px-6 py-2 w-auto border border-gray-300 rounded-md font-semibold hover:bg-gray-200"
                            onClick={() => setShowAllergyPopup(false)}>
                            OK
                          </button>
                          <button className="px-6 py-2 w-auto bg-red500 text-white rounded-md font-semibold">
                            FAQ PAGE
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="">
                  <input
                    className="w-full px-3 py-3 border bg-white border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
                    placeholder="e.g Instruction of your order"
                    type="text"
                    value={orderInstructions}
                    onChange={(e) => setOrderInstructions(e.target.value)}
                  />
                </div>
                <>
                  <button
                    className="checkout-button flex items-center justify-center cursor-pointer w-full text-white bg-red hover:bg-primary py-4 text-center rounded-sm2 uppercase"
                    onClick={handleCheckout}>
                    checkout
                  </button>
                  {showAlert && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="relative bg-white rounded-lg shadow-xl max-w-[95%] sm:max-w-[32rem] w-full p-4">
                        <Alert
                          show={showAlert}
                          onClose={() => setShowAlert(false)}
                        />
                        ``
                      </div>
                    </div>
                  )}
                </>
              </div>
            </>
          ) : (
            <div className="py-10 text-center">
              <i className="bi bi-cart3 text-[80px] text-cgreen-500 animate-bounce"></i>
              <p className="pt-3 text-cgreen-500 font-sm font-AvertastdRegular">
                Cart is empty — select any items to fill cart
              </p>
            </div>
          )}
        </div>
      )}
      <div className="w-full h-30">
        <img className="w-full" src={GroupDown} alt="Overlay" />
      </div>
    </div>
  );
};

export default Order1;
