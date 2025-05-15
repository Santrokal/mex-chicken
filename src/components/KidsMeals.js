const KidsMeals = ({ onAddToCart }) => {
  const handleAdd = () => {
    onAddToCart({
      name: "Kids Meals",
      price: 9.99,
      quantity: 1,
    });
  };

  return (
    <div
      className="category-products flex flex-col gap-2 gap-y-3 mt-3 shadow-custom rounded-sm2"
      id="3">
      <div className="category-name text-base text-red font-Avertastd capitalize pb-3">
        Kids Meals
      </div>
      <div
        className="flex flex-col gap-1 p-2 lg:p-5 bg-white rounded-md"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex gap-4 items-center justify-between">
          <div className="product-name w-full">
            <p className="text-sm text-cblack-primary font-normal line-clamp-2 overflow-hidden text-ellipsis lg:overflow-visible lg:line-clamp-none max-w-[160px] sm:max-w-none"></p>
            <div className="flex items-center bg-white shadow-custom rounded-lg p-3 gap-4 max-w-xl w-full">
              {/* Product Image */}
              <img
                src="/images/french-fries.png"
                loading="lazy"
                className="w-96 h-32 object-cover overflow-hidden rounded-md"
                alt="Classic Shawarma"
              />
              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="text-base text-black font-AvertaStdBold capitalize break-word">
                  Kids Meals
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
                      £9.99
                    </span>
                    <span className="text-lg text-gray500   line-through">
                      £5.00
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
    </div>
  );
};

export default KidsMeals;
