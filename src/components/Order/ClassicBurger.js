import React, { useState } from "react";

const ClassicBurger = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [variation, setVariation] = useState("Spicy");
  const [comment, setComment] = useState("");

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      variation,
      comment: comment.trim(),
      image: product.image,
      category: product.category,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="addon-pop-up w-80 bg-white rounded-lg shadow-lg">
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h5 className="text-red font-Avertastd capitalize">Add Item</h5>
          <div className="cursor-pointer" onClick={onClose}>
            <i className="bi bi-x-lg text-xl text-red"></i>
          </div>
        </div>

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center py-3">
            <h5 className="text-cgreen-500 font-Avertastd capitalize">
              {product.name}
            </h5>
            <h5 className="text-cgreen-500 font-Avertastd capitalize">
              <span className="px-1">£</span>
              {product.price.toFixed(2)}
            </h5>
          </div>

          {/* Variation selection */}
          <div className="py-2">
            <p className="text-lg text-red font-Avertastd capitalize pb-2">
              Variations
            </p>
            <div className="bg-grey300 rounded-md p-2 max-h-40 overflow-auto flex flex-col gap-2">
              {["Spicy", "Non-Spicy"].map((option) => (
                <div
                  key={option}
                  className="flex items-center justify-between p-1 gap-2 cursor-pointer"
                  onClick={() => setVariation(option)}>
                  <div className="flex items-center gap-2">
                    <label
                      className={`${
                        variation === option ? "bg-red" : "bg-gray-200"
                      } relative flex items-center justify-center h-6 w-6 rounded-full cursor-pointer`}>
                      {variation === option && (
                        <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full transition-transform duration-200"></span>
                      )}
                    </label>
                    <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                      {option}
                    </p>
                  </div>
                  <p className="text-cgreen-500 font-AvertaStdBold text-sl capitalize">
                    £{product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Comment box */}
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your extra comment on item"
            className="w-full px-3 py-2 border border-cgray-600 bg-cwhite-primary text-cgreen-200 rounded-md text-sm font-AvertastdRegular focus:outline-none"
          />

          {/* Quantity controls */}
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

          {/* Submit */}
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

export default ClassicBurger;
