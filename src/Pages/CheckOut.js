import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import Loader from "../components/Home/Loader";

import Checkout1 from "../components/Checkout/Checkout1";

function CheckOut() {
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
          <Checkout1 />
        </div>
      )}
    </div>
  );
}

export default CheckOut;
