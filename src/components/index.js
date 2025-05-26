import React, { useState, useEffect } from "react";
import Navbar from "./Home/Navbar";
import MainSection from "./Home/MainSection";
import HeaderSection from "./Home/HeaderSection";
import AboutSection from "./About/AboutSection";
import FooterImageSection from "./Home/FooterImage";
import FooterSection from "./Home/FooterSection";
import Loader from "./Home/Loader";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="content">
          <div className="sticky-header">
            <HeaderSection />
            <Navbar />
          </div>
          <MainSection />
          <AboutSection />
          <FooterImageSection />
          <FooterSection />
        </div>
      )}
    </div>
  );
}

export default Home;
