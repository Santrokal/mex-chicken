import React, { useState } from "react";
import Friesadd from "./Friesadd";
import { useOrder } from "../components/OrderContext";

const FriedChicken = ({ onAddToCart }) => {
  const [showFriesadd, setShowFriesadd] = useState(false);
  const handleAdd = () => {
    onAddToCart({
      name: "Classic Fried Chicken",
      price: 8.0,
      quantity: 1,
    });
  };
  const handleAdd1 = () => {
    onAddToCart({
      name: "1pcfriedchicken",
      price: 1.7,
      quantity: 1,
    });
  };
  const handleFriesadd = (item) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.name === item.name && i.variation === item.variation
      );
      if (existingIndex !== -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        return updated;
      }
      return [...prevItems, item];
    });
    setShowFriesadd(false);
  };
  const { setCartItems } = useOrder();

  return (
    <div
      className="category-products flex flex-col gap-2 gap-y-3 mt-3 shadow-custom rounded-sm2"
      id="2">
      <div className="category-name text-base text-red font-Avertastd capitalize pb-3">
        Fried Chicken
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="product-name w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-custom rounded-lg p-3 gap-4 w-full">
              {/* Product Image */}
              <img
                src="/images/classicfriedchicken.jpeg"
                loading="lazy"
                className="w-96 h-32 object-cover overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  Classic Fried Chicken
                </div>
                <br></br>
                <p className="text-sm text-gray500 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing typeset
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      £8.00
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £10.00
                    </span>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="product-name w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-custom rounded-lg p-3 gap-4 w-full">
              {/* Product Image */}
              <img
                src="/images/1pcfriedchicken.jpeg"
                loading="lazy"
                className="w-96 h-32 object-cover overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  1 PC's Fried Chicken
                </div>
                <br></br>
                <p className="text-sm text-gray500 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing typeset
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      £1.70
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £3.00
                    </span>
                  </div>
                  <button
                    onClick={handleAdd1}
                    className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="product-name w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-custom rounded-lg p-3 gap-4 w-full">
              {/* Product Image */}
              <img
                src="/images/1PCFriedmeal.jpeg"
                loading="lazy"
                className="w-96 h-32 object-cover overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  1-PC's Fried Chicken With Meal
                </div>
                <br></br>
                <p className="text-sm text-gray500 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing typeset
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      £3.70
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £5.00
                    </span>
                  </div>
                  <button
                    onClick={() => setShowFriesadd(true)}
                    className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                    Add
                  </button>
                </div>
              </div>
              {/* Popup */}
              {showFriesadd && (
                <Friesadd
                  onClose={() => setShowFriesadd(false)}
                  onAddToCart={handleFriesadd}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="product-name w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-custom rounded-lg p-3 gap-4 w-full">
              {/* Product Image */}
              <img
                src="/images/2PC Fried.jpeg"
                loading="lazy"
                className="w-96 h-32 object-cover overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  2-PC's Fried Chicken
                </div>
                <br></br>
                <p className="text-sm text-gray500 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing typeset
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      £3.20
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £5.00
                    </span>
                  </div>
                  <button
                    onClick={() => setShowFriesadd(true)}
                    className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                    Add
                  </button>
                </div>
              </div>
              {/* Popup */}
              {showFriesadd && (
                <Friesadd
                  onClose={() => setShowFriesadd(false)}
                  onAddToCart={handleFriesadd}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="product-name w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-custom rounded-lg p-3 gap-4 w-full">
              {/* Product Image */}
              <img
                src="/images/2PC Friedmeal.jpeg"
                loading="lazy"
                className="w-96 h-32 object-cover overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  2 PC's Fried Chicken With Meal
                </div>
                <br></br>
                <p className="text-sm text-gray500 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing typeset
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      £5.20
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £7.00
                    </span>
                  </div>
                  <button
                    onClick={() => setShowFriesadd(true)}
                    className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                    Add
                  </button>
                </div>
              </div>
              {/* Popup */}
              {showFriesadd && (
                <Friesadd
                  onClose={() => setShowFriesadd(false)}
                  onAddToCart={handleFriesadd}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="product-name w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-custom rounded-lg p-3 gap-4 w-full">
              {/* Product Image */}
              <img
                src="/images/3pcfriedchicken.jpeg"
                loading="lazy"
                className="w-96 h-32 overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  3-PC's Fried Chicken
                </div>
                <br></br>
                <p className="text-sm text-gray500 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing typeset
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      £4.80
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £8.00
                    </span>
                  </div>
                  <button
                    onClick={() => setShowFriesadd(true)}
                    className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                    Add
                  </button>
                </div>
              </div>
              {/* Popup */}
              {showFriesadd && (
                <Friesadd
                  onClose={() => setShowFriesadd(false)}
                  onAddToCart={handleFriesadd}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="product-name w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-custom rounded-lg p-3 gap-4 w-full">
              {/* Product Image */}
              <img
                src="/images/3pcfriedchickenmeal.jpeg"
                loading="lazy"
                className="w-96 h-32 object-cover overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  3-PC's Fried Chicken With Meal
                </div>
                <br></br>
                <p className="text-sm text-gray500 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing typeset
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      £6.80
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £10.00
                    </span>
                  </div>
                  <button
                    onClick={() => setShowFriesadd(true)}
                    className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                    Add
                  </button>
                </div>
              </div>
              {/* Popup */}
              {showFriesadd && (
                <Friesadd
                  onClose={() => setShowFriesadd(false)}
                  onAddToCart={handleFriesadd}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriedChicken;
