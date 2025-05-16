import React, { useState } from "react";

const QuarterPounder = ({ onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [variation, setVariation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isMealAdded, setIsMealAdded] = useState(false);

  const [comment, setComment] = useState("");

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = (e) => {
    e.preventDefault();
    const basePrice = 3.99;
    const mealPrice = isMealAdded ? 2.0 : 0;
    const totalPrice = basePrice + mealPrice;

    onAddToCart({
      name: "QuarterPounder",
      price: totalPrice,
      quantity,
      variation,
      comment: comment.trim(),
      isMealAdded,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="addon-pop-up w-80 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h5 className="text-red font-Avertastd capitalize">Add Item</h5>
          <div className="cursor-pointer" onClick={onClose}>
            <i className="bi bi-x-lg text-xl text-red"></i>
          </div>
        </div>

        {/* Form */}
        <form className="p-4" onSubmit={handleSubmit}>
          {/* Item Details */}
          <div className="flex justify-between items-center py-3">
            <h5 className="text-cgreen-500 font-Avertastd capitalize">
              Quarter Pounder
            </h5>
            <h5 className="text-cgreen-500 font-Avertastd capitalize">
              <span className="px-1">£</span>5.49
            </h5>
          </div>

          {/* Optional */}
          <div className="py-2">
            <div class="my-3">
              <div class="flex items-center justify-between gap-2 py-1">
                <p class="text-black text-xl font-AvertaStdBold">
                  Please select
                </p>
                <p class="font-AvertaStdRegular text-black">Optional</p>
              </div>

              <div class="flex items-center justify-between gap-3 my-2">
                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="option-check"
                    class="w-5 h-5  rounded-s-xl"
                    checked={isMealAdded}
                    onChange={(e) => {
                      setIsMealAdded(e.target.checked);
                      setIsChecked(e.target.checked);
                    }}
                  />
                  <label
                    for="option-check"
                    class="font-AvertaStdBold text-lg cursor-pointer">
                    Make it a Meal
                  </label>
                </div>
                <label
                  for="option-check"
                  class="font-AvertaStdBold  text-lg cursor-pointer">
                  £ 2.00
                </label>
              </div>
            </div>
            {isChecked && (
              <div
                className="bg-grey300 rounded-md p-2 max-h-40 overflow-auto flex flex-col gap-2"
                style={{
                  overflow: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}>
                {/* Option */}
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Pepsi")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Pepsi" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Pepsi" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Pepsi
                    </p>
                  </div>
                </div>

                {/* Option */}
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Pepsi Max")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Pepsi Max" ? "bg-red" : "bg-gray-200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Pepsi Max" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-black font-AvertaStdBold text-sl  capitalize">
                      Pepsi Max
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Diet Pepsi ")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Diet Pepsi " ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Diet Pepsi " && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Diet Pepsi
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Tango Orange")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Tango Orange" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Tango Orange" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Tango Orange
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Tango Orange")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Tango Orange" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Tango Orange" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Tango Orange
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Tango Apple")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Tango Apple" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Tango Apple" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Tango Apple
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Mirinda")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Mirinda" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Mirinda" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Mirinda
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Strawberry")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Strawberry" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Strawberry" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Strawberry
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("7UP")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "7UP" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "7UP" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      7UP
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Rubicon Mango")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Rubicon Mango" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Rubicon Mango" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Rubicon Mango
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Water Bottle")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Water Bottle" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Water Bottle" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Water Bottle
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("Fruit Shoot")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "Fruit Shoot" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "Fruit Shoot" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      Fruit Shoot
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("1.5 Pepsi")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "1.5 Pepsi" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "1.5 Pepsi" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      1.5 Pepsi
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("1.5 7UP")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "1.5 7UP" ? "bg-red" : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "1.5 7UP" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      1.5 7UP
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation("1.5 Tango Orange")}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === "1.5 Tango Orange"
                          ? "bg-red"
                          : "bg-gray200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === "1.5 Tango Orange" && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full  transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      1.5 Tango Orange
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comment Box */}
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your extra comment on item"
            className="w-full px-3 py-2 border border-cgray-600 bg-cwhite-primary text-cgreen-200 rounded-md text-sm font-AvertastdRegular focus:outline-none"
          />

          {/* Quantity Controls */}
          <div className="product-quantity-actions my-4 w-3/4 mx-auto grid grid-cols-3 items-center divide-x divide-red border-2 border-red rounded-md">
            <div
              className="add-quantity flex justify-center items-center cursor-pointer px-3 py-2"
              onClick={decreaseQty}>
              <i className="bi bi-dash"></i>
            </div>
            <div className="quantity-level flex justify-center items-center px-3 py-2">
              <span className="text-sm font-AvertaStdRegular text-red">
                {quantity}
              </span>
            </div>
            <div
              className="delete-quantity flex justify-center items-center cursor-pointer px-3 py-2"
              onClick={increaseQty}>
              <i className="bi bi-plus-lg"></i>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-red text-lg font-Avertastd py-3 rounded-md hover:bg-red-600 transition-all">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuarterPounder;
