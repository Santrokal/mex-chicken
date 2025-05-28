/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import OrderHead from "./OrderHead";
import MenuSectionDeskView from "./MenuSectionDeskView";
import MenuSectionMobileView from "./MenuSectionMobileView";
import CartDeskView from "./CartDeskView";
import CartMobileView from "./CartMobileView";
import { useOrder } from "./OrderContext";
import FriedChicken from "./FriedChicken";
import KidsMeals from "./KidsMeals";
import Burgers from "./Burgers";
import Wraps from "./Wraps";
import PeriPeriChicken from "./PeriPeriChicken";
import PeriPeriBurgers from "./PeriPeriBurgers";
import PeriPeriFamilyMeals from "./PeriPeriFamilyMeals";
import FamilyBucket from "./FamilyBucket";
import rightarrow from "../../images/right-arrow 1.png";
import rectangle from "../../images/rectangle-48.png";
import TextureWhite from "../../images/Texture-White.png";
import GroupDown from "../../images/Groupdown.png";

const Order1 = () => {
  const {
    orderType,
    setOrderType,
    pickupTime,
    setPickupTime,
    postcode,
    setPostcode,
    cartItems,
    setCartItems,
  } = useOrder();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  /* For Classic Shawarma  */
  const handleAddToCart = (product) => {
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

  useEffect(() => {}, [cartItems]);

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

  return (
    <div className="order-container">
      <div
        className="home-section"
        style={{ backgroundImage: `url(${rectangle})` }}>
        <h1>Order Now</h1>
        <div className="inline-container">
          <p className="inline-content">
            <span-1>Home</span-1>
            <img src={rightarrow} alt="Arrow" className="arrow-icon" />
            <span>Order Now</span>
          </p>
        </div>
      </div>

      <section
        className="order-now relative bg-cover  bg-center bg-fixed"
        style={{ backgroundImage: `url(${TextureWhite})` }}>
        <div className="block w-full absolute -top-2 md:-top-5 lg:-top-20 left-0 right-0 z-90">
          <img className="w-full" src={TextureWhite} alt="Overlay Image" />
        </div>
        <div className="relative container">
          <div className="order-opening mb-5 px-6 py-4 rounded-sm2 bg-yellow">
            <OrderHead />
          </div>
          <div className="lg:grid lg:grid-cols-9 gap-3">
            <div className="order-menu-item lg:col-span-2">
              {/* Desktop View */}
              <MenuSectionDeskView />
              {/* Mobile View */}
              <MenuSectionMobileView />
            </div>
            <div className="order-products lg:col-span-4 ">
              <div className="flex flex-col gap-3">
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

            <div className="hidden lg:block lg:col-span-3">
              <CartDeskView />
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
          <CartMobileView />
        </div>
      )}

      <div className="w-full h-30">
        <img className="w-full" src={GroupDown} alt="Overlay" />
      </div>
    </div>
  );
};
export default Order1;
