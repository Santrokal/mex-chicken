import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderType, setOrderType] = useState("pickup");
  const [pickupTime, setPickupTime] = useState("");
  const [postcode, setPostcode] = useState("");
  const [orderInstructions, setOrderInstructions] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  return (
    <OrderContext.Provider
      value={{
        cartItems,
        setCartItems,
        orderType,
        setOrderType,
        pickupTime,
        setPickupTime,
        postcode,
        setPostcode,
        orderInstructions,
        setOrderInstructions,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
