import React, { useEffect, useState } from "react";
import MincedChickenBurger from "./MincedChickenBurger";

const KidsMeals = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        const kidsProducts = data.filter(
          (product) => product.category === "Kids Meals"
        );
        setProducts(kidsProducts);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);
  const handleAddButtonClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };
  return (
    <div
      className="category-products flex flex-col gap-2 gap-y-3 mt-3 shadow-custom rounded-sm2"
      id="3">
      <div className="category-name text-base text-red font-Avertastd capitalize pb-3">
        Kids Meals
      </div>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}>
          <div className="flex gap-4 items-center justify-between">
            <div className="w-56 h-24 lg:w-56 lg:h-36">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="product-name w-full">
              <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                {product.name}
              </div>
              <p className="text-sm text-cblack-primary font-normal mt-1 line-clamp-2 overflow-hidden text-ellipsis lg:overflow-visible lg:line-clamp-none max-w-[160px] sm:max-w-none">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-semibold text-black">
                  £{product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddButtonClick(product)}
                  className="bg-red text-white px-8 py-2 rounded-md text-lg font-semibold hover:bg-red transition">
                  Add
                </button>
                {selectedProduct && (
                  <MincedChickenBurger
                    open={dialogOpen}
                    onClose={handleClose}
                    product={selectedProduct}
                    onAddToCart={onAddToCart}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KidsMeals;
