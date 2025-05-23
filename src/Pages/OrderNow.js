import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import Loader from "../components/Home/Loader";
import Order1 from "../components/Order/Order1";
import FooterImage from "../components/Home/FooterImage";
import FooterSection from "../components/Home/FooterSection";

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
