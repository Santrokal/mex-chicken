import React, { useState } from "react";
import GuestDetailsForm from "./GuestDetailsForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ReturningCustomerForm from "./ReturningCustomerForm";
import FooterImage from "./FooterImage";
import { useOrder } from "../components/OrderContext";
import FooterSection from "./FooterSection";
import ChangePopup from "./ChangePopup";

const Checkout1 = () => {
  const [showChangePopup, setShowChangePopup] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const {
    orderType,
    pickupTime,
    postcode,
    cartItems,
    setCartItems,
    orderInstructions,
    setOrderInstructions,
  } = useOrder();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleDeleteItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const [selectedTip, setSelectedTip] = useState("No Tip");
  const [customTip, setCustomTip] = useState("");
  const [tipAmount, setTipAmount] = useState(0.0);
  const total = subtotal + tipAmount;
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_id: "",
    password: "",
    confirm_password: "",
    postcode: "",
    enter_address: "",
    street_name: "",
    city: "",
  });

  const [formData2, setFormData2] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_id: "",
    postcode: "",
    enter_address: "",
    street_name: "",
    city: "",
  });

  const [formData1, setFormData1] = useState({
    email_address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_number") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length < 11) {
        setFormData2((prev) => ({ ...prev, [name]: onlyDigits }));
      }
    } else {
      setFormData2((prev) => ({ ...prev, [name]: value }));
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const handleTipClick = (tip) => {
    setSelectedTip(tip);
    if (tip === "No Tip") {
      setTipAmount(0.0);
      setCustomTip("");
    } else if (tip === "Other") {
      setTipAmount(0.0);
    } else {
      const percentage = parseFloat(tip.replace("%", ""));
      const calculatedTip = (subtotal * percentage) / 100;
      setTipAmount(calculatedTip);
      setCustomTip("");
    }
  };

  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    setCustomTip(value);
    const percentage = parseFloat(value);
    if (!isNaN(percentage) && percentage >= 0) {
      const cappedPercentage = Math.min(percentage, 50);
      const calculatedTip = (subtotal * cappedPercentage) / 100;
      setTipAmount(calculatedTip);
    } else {
      setTipAmount(0.0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedData =
      selectedOption === 0
        ? formData2
        : selectedOption === 1
        ? formData1
        : formData;

    console.log("Form submitted with data:", selectedData);
  };

  return (
    <div id="content">
      <section
        className="secondary-banner h-auto bg-cover bg-no-repeat bg-center py-20"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/Rectangle 48.png")',
        }}>
        <div className="container">
          <div className="flex flex-col justify-center items-center text-center max-w-sm mx-auto">
            <div className="page-title mb-2">
              <h1 className="text-white font-AvertaStdEB capitalize text-6xl leading-[3rem] h-16">
                Checkout
              </h1>
            </div>
            <div className="breadcrumb flex items-center justify-center">
              <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2">
                  <li>
                    <div className="flex items-center space-x-2">
                      <a
                        className="text-base1 text-cgray-50 hover:text-red font-Avertastd capitalize"
                        href="/">
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
                        className="text-base1 text-cgray-50 hover:text-red font-Avertastd capitalize"
                        href="/order">
                        Order Now
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
                        className="text-base text-red font-Avertastd capitalize active"
                        href="/checkout">
                        Checkout
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
        className="checkout relative bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url("/images/Texture-White.png")',
        }}>
        <div className="block w-full absolute left-0 right-0 z-0">
          <div className="absolute inset-0"></div>
          <img
            className="w-full relative"
            src="/images/Texture-White.png"
            alt="Overlay"
            style={{ transform: "translateY(10px)" }}
          />
        </div>
        {/* Checkout Content */}
        <div className="container relative z-10 top-20">
          <div className="checkout-content">
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="grid lg:grid-cols-5 gap-5">
              {/* Form Section */}
              <div className="form lg:col-span-3">
                {/* Account Type Buttons */}
                <div className="flex flex-wrap gap-4 mb-5">
                  {["I'm A Guest", "Already A Customer", "I'm New Here"].map(
                    (label, index) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedOption(index)}
                        className={`flex items-center justify-center p-4 border rounded-lg bg-white grow shadow-light-theme ${
                          selectedOption === index
                            ? "border-red text-red"
                            : "border-red text-black"
                        }`}>
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                              selectedOption === index
                                ? "border-red"
                                : "border-red"
                            }`}>
                            {selectedOption === index && (
                              <div className="w-3 h-3 bg-red rounded-full" />
                            )}
                          </div>
                          <span>{label}</span>
                        </div>
                      </button>
                    )
                  )}
                </div>

                {selectedOption === 0 && (
                  <GuestDetailsForm
                    formData2={formData2}
                    handleChange={handleChange}
                  />
                )}

                {selectedOption === 1 && (
                  <ReturningCustomerForm
                    formData1={formData1}
                    handleChange={handleChange}
                  />
                )}

                {selectedOption === 2 && (
                  <PersonalDetailsForm
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {/* Pickup Info */}
                <div className="mt-5 w-full p-5 bg-white shadow-custom rounded-sm2 shadow-light-theme">
                  <div className="payment-type">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h6 className="text-black font-AvertaStdEB text-sm mt-2">
                        {orderType === "pickup" ? (
                          <>Pickup Information </>
                        ) : (
                          <>Delivery Information </>
                        )}
                      </h6>
                      <p className="text-black font-Avertastd">£ 0.00</p>
                      {!showChangePopup && (
                        <button
                          type="button"
                          onClick={() => setShowChangePopup(true)}
                          className="text-white bg-red px-3 py-2 rounded-sm2 font-Avertastd capitalize">
                          <i className="bi bi-arrow-left-square-fill"></i>
                          <span className="ml-1">Change</span>
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="text-black font-AvertastdRegular text-sm mt-2">
                        {orderType === "pickup" ? (
                          <>
                            Pickup Time:{" "}
                            <span className="font-Avertastd">
                              {pickupTime || "Not selected yet"}
                            </span>
                          </>
                        ) : (
                          <>
                            Delivery Postcode:{" "}
                            <span className="font-Avertastd">
                              {postcode || "Not provided"}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="mt-6">
                      <textarea
                        name="orderNote"
                        placeholder="e.g Instruction of your order"
                        className="w-full px-3 py-3 border bg-cwhite-primary text-cgreen-200 border-cgray-600 rounded-sm2 text-sm md:text-base font-AvertastdRegular focus-visible:outline-none"
                        spellCheck="false"
                        value={orderInstructions}
                        onChange={(e) => setOrderInstructions(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {showChangePopup && (
                  <ChangePopup onClose={() => setShowChangePopup(false)} />
                )}

                {/* Tip Section */}
                <div className="mt-5 w-full p-5 bg-white shadow-custom rounded-sm2 shadow-light-theme">
                  <h6 className="text-black font-Avertastd capitalize">
                    Add Tip
                  </h6>
                  <div className="flex justify-center  font-AvertaStdBold items-center mt-4 gap-2 flex-wrap">
                    {["No Tip", "5%", "10%", "15%"].map((tip) => (
                      <button
                        key={tip}
                        type="button"
                        onClick={() => handleTipClick(tip)}
                        className={`text-base1 p-2.5 px-2 rounded  border-2  min-w-[118px] ${
                          selectedTip === tip
                            ? " text-red"
                            : " text-green500 hover:border-red hover:text-red"
                        }`}>
                        {tip}
                      </button>
                    ))}
                    <div className="flex items-center gap-2">
                      {selectedTip === "Other" ? (
                        <div className="relative min-w-[118px]">
                          <input
                            type="text"
                            className="text-base2 p-2.5 px-4 rounded border border-primary w-24 text-center"
                            placeholder="Percentage (%)"
                            value={customTip}
                            onChange={handleCustomTipChange}
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleTipClick("Other")}
                          className="p-2.5 px-5 rounded border-2 hover:border-red min-w-[118px]  ">
                          Other
                        </button>
                      )}
                      <div className="text-base lg:text-xl text-red500  font-AvertaStdBold capitalize">
                        <span className="px-1">£</span>
                        {tipAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Type */}
                <div className="mt-5 w-full p-5 bg-white shadow-custom rounded-sm2 shadow-light-theme">
                  <div className="payment-type">
                    <h6 className="text-black font-AvertaStdEB capitalize">
                      payment type
                    </h6>
                    <div className="grid mt-5">
                      <div className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm text-xs font-regular focus-visible:outline-none flex items-center space-x-5">
                        <div className="flex items-center">
                          <input
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 cursor-pointer accent-red"
                            value="Cash"
                            defaultChecked
                          />
                          <label className="ml-1.5 block text-black font-AvertaStdRegular text-sm">
                            Cash
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 border accent-red cursor-pointer"
                            value="Card"
                          />
                          <label className="ml-1.5 block text-black font-AvertaStdRegular text-sm">
                            Card
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="order-cart lg:col-span-2 order-1 lg:order-none">
                <div className="bg-white p-4 shadow-custom rounded-sm2 shadow-light-theme">
                  {/* Cart Title and Add Button */}
                  <div className="flex sm:flex-row sm:justify-between sm:items-center flex-wrap gap-2">
                    <div className="cart-title grow">
                      <h6 className="text-black font-AvertaStdEB capitalize">
                        Your Cart
                      </h6>
                    </div>
                    <div className="flex sm:justify-center sm:items-center gap-4">
                      <a
                        className="bg-red500 p-1 h-8 w-8 rounded-sm2 flex justify-center items-center cursor-pointer"
                        href="/order">
                        <i className="bi bi-plus-lg text-white w-35"></i>
                      </a>
                    </div>
                  </div>
                  {cartItems.length > 0 ? (
                    <div className="max-h-[500px] overflow-y-auto">
                      <div className="card-items flex flex-col gap-5 mt-7">
                        {cartItems.map((item, index) => (
                          <div
                            className="product-item"
                            key={`${item.name}-${item.variation}-${index}`}>
                            <div className="flex items-center w-full">
                              <div className="product-name cursor-pointer flex items-center w-4/6">
                                <div className="text-sm text-black font-AvertaStdRegular flex items-center gap-x-2">
                                  <span className="text-red">
                                    {item.quantity}x
                                  </span>
                                  <span className="capitalize">
                                    {item.name}
                                  </span>
                                  <span>({item.variation})</span>
                                </div>
                              </div>
                              <div className="product-price flex justify-end items-center pl-0.5 w-1/6">
                                <div className="text-sm text-black font-AvertaStdBold flex justify-end">
                                  <span className="px-1">£</span>
                                  {(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                              <div className="delete-quantity flex justify-end items-center cursor-pointer h-full w-1/6">
                                <button
                                  onClick={() => handleDeleteItem(index)}
                                  aria-label={`Remove ${item.name} (${item.variation}) from cart`}
                                  className="text-red hover:text-red-700">
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </div>
                            </div>
                            {item.comment && (
                              <div className="mt-2.5 flex flex-col gap-1 w-full">
                                <div className="text-xs text-gray-500 font-AvertaStdRegular">
                                  Comment: {item.comment}
                                </div>
                              </div>
                            )}
                            {item.addon && (
                              <div className="mt-2.5 flex flex-col gap-1 w-full">
                                <div className="text-xs text-gray-500 font-AvertaStdRegular">
                                  Addon: {item.addon}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-10 relative flex flex-col items-center">
                      <div className="flex justify-center items-center w-52 h-52 bg-transparent">
                        <i className="bi bi-cart3 text-[80px] text-cgreen-500 animate-bounce"></i>
                      </div>
                      <p className="text-center text-cgreen-500 text-sm font-AvertaStdRegular">
                        Cart is empty, select any items to fill cart
                      </p>
                    </div>
                  )}
                  {/* Price Summary */}
                  <div className="w-full border-y border-lightgray mt-3">
                    <div className="flex flex-col gap-2.5 mt-3">
                      <div className="flex justify-between items-center">
                        <div className="text-base lg:text-xs text-red font-Avertastd capitalize">
                          Sub Total
                        </div>
                        <div className="text-base lg:text-xs text-black font-Avertastd capitalize">
                          <span className="px-1">£</span>
                          {subtotal.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-base lg:text-xs text-red font-Avertastd capitalize">
                          Tip
                        </div>
                        <div className="text-base lg:text-xs text-black font-Avertastd capitalize">
                          <span className="px-1">£</span>
                          {tipAmount.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-base lg:text-xs text-gray font-Avertastd capitalize">
                          Pickup Charges
                        </div>
                        <div className="text-base lg:text-xs text-black font-Avertastd capitalize">
                          <span className="px-1">£</span>0.00
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="my-3.5 flex justify-between">
                    <div className="total-title">
                      <h5 className="text-black text-xl font-Avertastd uppercase">
                        Total
                      </h5>
                    </div>
                    <div className="total-price">
                      <h5 className="text-black text-xl font-Avertastd uppercase">
                        <span className="px-1">£</span>
                        {total.toFixed(2)}
                      </h5>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="px-1 mt-4">
                  <p className="text-black font-AvertaStdRegular">
                    <input
                      name="acceptTerms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                      className="w-4 rounded-sm bg-black border-black  cursor-pointer"
                    />{" "}
                    I have read and agree to the{" "}
                    <a
                      className="cursor-pointer text-skyblue hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="terms-and-conditions">
                      Terms &amp; Conditions
                    </a>{" "}
                    as well as{" "}
                    <a
                      className="cursor-pointer text-skyblue hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="privacy-policy">
                      Privacy Policy
                    </a>
                  </p>
                </div>

                {/* Pay Now Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="cursor-pointer disabled:cursor-not-allowed hover:bg-red paynow-btn flex justify-between items-center bg-red rounded-sm2 w-full gap-3 px-5 py-3"
                    disabled={!acceptTerms}>
                    <div className="text-base font-AvertaStdBold text-white uppercase">
                      Pay Now
                    </div>
                    <div className="text-lg md:text-xl font-AvertaStdBold text-white">
                      <span className="px-1">£</span>
                      {total.toFixed(2)}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="w-full h-96">
        <img className="w-full" src="/images/Groupdown.png" alt="Overlay" />
      </div>
      <FooterImage />
      <FooterSection />
    </div>
  );
};

export default Checkout1;
