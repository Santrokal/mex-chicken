import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import HeaderSection from "./HeaderSection";
import AboutSection from "./AboutSection";
import FooterImageSection from "./FooterImage";
import FooterSection from "./FooterSection";
import Loader from "./Loader";

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
