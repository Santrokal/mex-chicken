import React, { useState, useEffect } from "react";

import image1 from "../../images/image 99.png";
import image2 from "../../images/image100.jpeg";

const images = [image1, image2];

const MainSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${images[currentImageIndex]}')`,
      }}>
      <div className="container">
        <div className="banner-flex">
          <div className="hero-banner-content">
            <div className="banner-sub-title">
              <div className="badge">Mex Chicken</div>
            </div>
            <div className="banner-title">
              <h1 className="home-title">The Perfect Peri Peri House</h1>
            </div>
            <div className="banner-description">
              <p className="home-subtitle">
                We take delight in providing you with the most amazing Peri Peri
                and Fried chicken experience feasible, making you craving more.
              </p>
            </div>
            <div className="banner-cta">
              <a className="home-button" href="/order-now">
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
