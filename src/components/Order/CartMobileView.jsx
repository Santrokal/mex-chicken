/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useOrder } from "./OrderContext";
import deliveryman from "../../images/delivery-man.svg";
import deliveryclose from "../../images/deliverydelete.png";
import warning from "../../images/triangle-warning.png";
const CartMobileView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const [showAlert, setShowAlert] = useState(false);

  const scrollRef = useRef(null);
  const [isValid, setIsValid] = useState(null);
  const [showAllergyPopup, setShowAllergyPopup] = useState(false);
  const [submittedCode, setSubmittedCode] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);

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
  const isValidWF10Postcode = (postcode) => {
    const postcodeRegex = /^WF10\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
  };

  const handleCheckDelivery = () => {
    if (!postcode) {
      setIsValid(false);
      return;
    }
    if (isValidWF10Postcode(postcode)) {
      setIsValid(true);
      setSubmittedCode(postcode.trim().toUpperCase());
    } else {
      setIsValid(false);
      setSubmittedCode("");
    }
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
    <>
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
            <span className="text-xs text-center">Starting at : 03:00 PM</span>
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
            <span className="text-xs text-center">Starting at : 04:00 PM</span>
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
            className="custom_scrollbar card-items flex flex-col gap-2 mt-4 max-h-[40vh] overflow-x-hidden overflow-y-auto pr-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowY: "auto",
            }}>
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
            <>
              <input
                className="w-full px-3 py-3 border bg-white border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
                placeholder="e.g Instruction of your order"
                type="text"
                value={orderInstructions}
                onChange={(e) => setOrderInstructions(e.target.value)}
              />
            </>
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
    </>
  );
};
export default CartMobileView;
