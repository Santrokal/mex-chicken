import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Order1 from "../components/Order1";
import FooterImage from "../components/FooterImage";
import FooterSection from "../components/FooterSection";

function OrderNow() {
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
        <div className="content relative">
          <Navbar />
          <Order1 />
          <FooterImage />
          <FooterSection />
        </div>
      )}
    </div>
  );
}

export default OrderNow;
