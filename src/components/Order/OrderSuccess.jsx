import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "../../components/Home/Navbar";
import Loader from "../../components/Home/Loader";
import FooterImage from "../../components/Home/FooterImage";
import FooterSection from "../../components/Home/FooterSection";

const OrderSuccess = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || "N/A";
  const handleCheckout = () => {
    navigate("/home");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="order-success-page">
          <Navbar />
          <div
            className="d-flex justify-content-center align-items-center p-4"
            style={{ minHeight: "70vh" }}>
            <Card
              style={{
                width: "100%",
                maxWidth: "600px",
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}>
              <Card.Header
                className="text-center"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "500",
                  color: "#0B0B0B",
                }}>
                Order No: {orderId}
              </Card.Header>
              <Card.Body className="text-center">
                <Card.Title
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#0B0B0B",
                  }}>
                  Order Successful
                </Card.Title>
                <h4
                  style={{
                    color: "red",
                    fontWeight: "600",
                    marginTop: "1rem",
                  }}>
                  Thank You!
                </h4>
                <Card.Text
                  style={{
                    color: "#333",
                    marginTop: "1.5rem",
                    lineHeight: "1.6",
                  }}>
                  Your order is on the way to your home
                  <br />
                  Your order will be delivered within 45 minutes. In the rare
                  case of your order being delayed for more than 45 minutes,
                  please give us a call at <strong>0123456789</strong>.<br />
                  You will receive an order acknowledgement email to confirm
                  that we have received your order.
                </Card.Text>
                <Button
                  onClick={handleCheckout}
                  variant="danger"
                  style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 2rem",
                    borderRadius: "8px",
                  }}>
                  Continue
                </Button>
              </Card.Body>
            </Card>
          </div>
          <FooterImage />
          <FooterSection />
        </div>
      )}
    </>
  );
};

export default OrderSuccess;
