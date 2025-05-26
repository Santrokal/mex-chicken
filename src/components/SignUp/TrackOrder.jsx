import React, { useState, useEffect } from "react";
import { useAuth } from "../Checkout/AuthContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TrackOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [orderType, setOrderType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email_id: "",
  });
  const [touched, setTouched] = useState({
    email_id: false,
  });

  useEffect(() => {
    if (!user || !user.email) {
      setSubmitMessage("User not authenticated. Please log in.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setFormData({
      email_id: user.email || "",
    });
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (showMap && orderType === "delivery") {
      console.log(
        "Rendering map: showMap =",
        showMap,
        "orderType =",
        orderType
      );
      const map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const restaurant = [51.505, -0.09];
      const customerLocation = [51.515, -0.08];
      const route = [
        restaurant,
        [51.507, -0.089],
        [51.509, -0.087],
        [51.511, -0.085],
        [51.513, -0.082],
        customerLocation,
      ];

      L.polyline(route, { color: "blue" }).addTo(map);

      L.marker(restaurant).addTo(map).bindPopup("Restaurant").openPopup();
      L.marker(customerLocation).addTo(map).bindPopup("Delivery Location");

      let currentIndex = 0;
      const movingMarker = L.marker(restaurant).addTo(map);

      const moveMarker = () => {
        if (currentIndex < route.length - 1) {
          currentIndex++;
          movingMarker.setLatLng(route[currentIndex]);
          map.panTo(route[currentIndex]);
        } else {
          movingMarker.bindPopup("Order Delivered!").openPopup();
          clearInterval(interval);
        }
      };

      const interval = setInterval(moveMarker, 2000);

      return () => {
        console.log("Cleaning up map");
        clearInterval(interval);
        map.remove();
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
          mapContainer.innerHTML = "";
        }
      };
    } else {
      console.log(
        "Map not rendered: showMap =",
        showMap,
        "orderType =",
        orderType
      );
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.innerHTML = "";
      }
    }
  }, [showMap, orderType]);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0.9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidOrderNo = (orderNo) => {
    const orderNoRegex = /^EZZY\d{4}$/i;
    return orderNoRegex.test(orderNo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "order_no") {
      setOrderNo(value.trim());
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value.trim(),
      }));
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
      setSubmitMessage("");
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleTrack = async () => {
    // Reset states to prevent stale values
    setShowMap(false);
    setOrderType("");
    setSubmitMessage("");
    console.log("Starting track: Reset states", { showMap, orderType });

    if (!orderNo) {
      setSubmitMessage("Please enter an order number.");
      return;
    }
    if (!isValidOrderNo(orderNo)) {
      setSubmitMessage(
        "Order number must be in format EZZY followed by 4 digits (e.g., EZZY0005)."
      );
      return;
    }
    if (!formData.email_id) {
      setSubmitMessage("Email Id is required.");
      return;
    }
    if (!isValidEmail(formData.email_id)) {
      setSubmitMessage("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:8000/orders?orderId=${encodeURIComponent(orderNo)}`
      );
      console.log("Order API response status:", response.status);
      const responseText = await response.text();
      console.log("Raw API response:", responseText);

      if (!response.ok) {
        console.error("Order API error response:", responseText);
        throw new Error(`Failed to fetch order: ${response.statusText}`);
      }

      let orders;
      try {
        orders = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError, responseText);
        throw new Error("Invalid response format from server.");
      }
      console.log("Parsed orders:", JSON.stringify(orders, null, 2));

      if (orders.length > 0) {
        const order = orders[0];
        const missingFields = [];
        if (!order.orderId) missingFields.push("orderId");
        if (!order.userEmail) missingFields.push("userEmail");
        if (!order.orderType) missingFields.push("orderType");

        if (missingFields.length > 0) {
          console.error("Incomplete order data:", {
            order,
            missingFields,
          });
          setSubmitMessage(
            `Order data is incomplete. Missing: ${missingFields.join(
              ", "
            )}. Please contact support at support@example.com.`
          );
          return;
        }

        const inputOrderNo = orderNo.trim().toUpperCase();
        const fetchedOrderId = String(order.orderId || "")
          .trim()
          .toUpperCase();
        const inputEmail = formData.email_id.trim().toLowerCase();
        const fetchedEmail = String(order.userEmail || "")
          .trim()
          .toLowerCase();

        console.log("Comparing:", {
          inputOrderNo,
          fetchedOrderId,
          inputEmail,
          fetchedEmail,
          orderType: order.orderType,
        });

        if (inputOrderNo === fetchedOrderId && inputEmail === fetchedEmail) {
          if (order.orderType === "pickup") {
            setOrderType("pickup");
            setShowMap(false);
            setSubmitMessage(
              "Order was pickup, please visit and pick up the product."
            );
          } else if (order.orderType === "delivery") {
            setOrderType("delivery");
            setShowMap(true);
            setSubmitMessage(`Tracking order ${orderNo} (delivery)...`);
          } else {
            console.error("Invalid order type:", order.orderType);
            setSubmitMessage(
              "Invalid order type received. Please contact support at support@example.com."
            );
          }
          console.log("After state update:", {
            showMap,
            orderType: order.orderType,
          });
        } else {
          setSubmitMessage(
            `Validation failed: ${
              inputOrderNo !== fetchedOrderId
                ? `Order ID does not match (Entered: "${inputOrderNo}", Fetched: "${fetchedOrderId}")`
                : `Email does not match (Entered: "${inputEmail}", Fetched: "${fetchedEmail}")`
            }`
          );
        }
      } else {
        setSubmitMessage("Order not found. Please check the order number.");
      }
    } catch (error) {
      console.error("Error tracking order:", error.message);
      setSubmitMessage(
        "Error: Unable to track order. Please try again or contact support at support@example.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h6 className="text-black text-lg font-semibold mb-4">Tracking Order</h6>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start mb-6">
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          <input
            name="order_no"
            placeholder="Enter Your Order No (e.g., EZZY0005)"
            type="text"
            value={orderNo}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm"
          />
          <input
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder="Email Id (e.g., testing@gmail.com)"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm"
          />
          {touched.email_id &&
            (!formData.email_id ? (
              <div className="text-red-500 text-xs">Email Id is required</div>
            ) : (
              !isValidEmail(formData.email_id) && (
                <div className="text-red-500 text-xs">
                  Enter a valid email address
                </div>
              )
            ))}
          {submitMessage && (
            <div
              className={`text-xs ${
                submitMessage.includes("Tracking") ||
                submitMessage.includes("pickup")
                  ? "text-green-500"
                  : "text-red-500"
              }`}>
              {submitMessage}
            </div>
          )}
        </div>
      </div>
      {showMap && orderType === "delivery" && (
        <div
          id="map"
          style={{ height: "400px", width: "100%", marginTop: "20px" }}></div>
      )}
      <button
        type="button"
        onClick={handleTrack}
        disabled={isSubmitting}
        className="bg-red text-white px-16 py-2.5 rounded-md mt-3 font-semibold text-sm hover:bg-red-600">
        {isSubmitting ? "Tracking..." : "Track"}
      </button>
    </div>
  );
};

export default TrackOrder;
