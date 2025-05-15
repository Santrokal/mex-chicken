import React from "react";

const imageUrls = [
  "images/crispyChicken1.png",
  "images/delicious-dessert-table2.png",
  "images/Maskgroup3.png",
  "images/Salad5.png",
  "images/Burger5.png",
  "images/fries6.png",
  "images/crispyChicken1.png",
  "images/crispyChicken1.png",
  "images/crispyChicken1.png",
];

const FooterImage = () => {
  const duplicatedImages = [...imageUrls, ...imageUrls, ...imageUrls];

  return (
    <div className="bg-cgreen-500 overflow-hidden">
      <div className="slider-container">
        <div className="slider-track">
          {duplicatedImages.map((url, index) => (
            <div key={index} className="image-slide">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                loading="lazy"
                className="slick-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterImage;
