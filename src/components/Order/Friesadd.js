import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "@mui/material";
const Friesadd = ({ open, product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [variation, setVariation] = useState("Regular");
  const [addon, setAddon] = useState("");
  const [comment, setComment] = useState("");

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open && descriptionElementRef.current) {
      descriptionElementRef.current.focus();
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const basePrice = product.price;
    const addonPrice = addon ? 1.0 : 0;
    const totalPrice = basePrice + addonPrice;

    onAddToCart({
      id: product.id,
      name: product.name,
      price: totalPrice,
      quantity,
      variation,
      addon: addon || "",
      comment: comment.trim(),
    });

    onClose();
  };

  const variations = [
    "Pepsi Max",
    "Diet Pepsi",
    "Tango Orange",
    "Tango Apple",
    "Mirinda",
    "Strawberry",
    "7UP",
    "Rubicon Mango",
    "Water Bottle",
    "Fruit Shoot",
    "1.5 Pepsi",
    "1.5 7UP",
    "1.5 Tango Orange",
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="item-dialog-title"
      aria-describedby="item-dialog-description">
      <div className="fixed inset-0 z-50  flex items-center justify-center">
        <div className="w-96 bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="p-4 border-b border-gray-300 flex justify-between items-center">
            <h5 className="text-red font-Avertastd">Add Item</h5>
            <button onClick={onClose} className="text-red text-xl">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4">
            {/* Product Name and Price */}
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-cgreen-500 font-Avertastd">{product.name}</h5>
              <h5 className="text-cgreen-500 font-Avertastd">
                £{product.price.toFixed(2)}
              </h5>
            </div>

            {/* Variations */}
            <div className="mb-4">
              <p className="text-lg text-red font-Avertastd mb-2">Variations</p>
              <div
                className="max-h-40 overflow-auto rounded-md bg-grey400 p-2 flex flex-col gap-2"
                style={{
                  overflow: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}>
                {variations.map((item) => (
                  <div
                    key={item}
                    onClick={() => setVariation(item)}
                    className="flex items-center gap-3 cursor-pointer">
                    <span
                      className={`w-5 h-5 rounded-full border-2 ${
                        variation === item
                          ? "bg-red border-red"
                          : "border-gray-300"
                      }`}></span>
                    <span className="capitalize font-AvertaStdBold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Addon (Fries) */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-3 text-lg font-AvertaStdBold cursor-pointer">
                <input
                  type="checkbox"
                  value="Fries"
                  checked={addon === "Fries"}
                  onChange={(e) =>
                    setAddon(e.target.checked ? e.target.value : "")
                  }
                  className="w-5 h-5"
                />
                Fries
              </label>
              <span className="text-lg font-AvertaStdBold">£1.00</span>
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your extra comment on item"
              className="w-full p-2 border border-gray-300 rounded-md text-sm mb-4"
            />

            {/* Quantity */}
            <div className="grid grid-cols-3 items-center mb-4 border border-red rounded-md divide-x divide-red text-red font-bold">
              <button type="button" onClick={decreaseQty} className="py-2">
                <i className="bi bi-dash"></i>
              </button>
              <div className="text-center py-2">{quantity}</div>
              <button type="button" onClick={increaseQty} className="py-2">
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-red text-white text-lg font-Avertastd rounded-md hover:bg-red-600 transition">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default Friesadd;
