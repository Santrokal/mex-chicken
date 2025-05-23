import React, { useState, useEffect } from "react";
import { useOrder } from "../OrderContext";
import deliveryman from "../../images/delivery-man.svg";

const ChangePopup = ({ onClose }) => {
  const {
    orderType: globalOrderType,
    setOrderType,
    pickupTime: globalPickupTime,
    setPickupTime,
    postcode: globalPostcode,
    setPostcode,
  } = useOrder();

  const [localOrderType, setLocalOrderType] = useState(globalOrderType);
  const [localPickupTime, setLocalPickupTime] = useState(globalPickupTime);
  const [localPostcode, setLocalPostcode] = useState(globalPostcode);
  const [timeOptions, setTimeOptions] = useState([]);
  const [isValid, setIsValid] = useState(null);
  const [submittedCode, setSubmittedCode] = useState("");

  useEffect(() => {
    const generatePickupTimes = () => {
      const now = new Date();
      const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
      const startHour = 17;
      const endHour = 23;
      const slots = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let min of [0, 30]) {
          const slotTime = new Date(now);
          slotTime.setHours(hour, min, 0, 0);
          if (slotTime > now) {
            const formatted = slotTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            slots.push(`${formatted} (${dayName})`);
          }
        }
      }
      setTimeOptions(slots);
    };
    generatePickupTimes();
  }, []);

  const handlePickupChange = (e) => {
    setLocalPickupTime(e.target.value);
  };

  const validDeliveryPostcodes = [
    "EH21 6UU",
    "EH22 1AA",
    "EH23 3BB",
    "EH24 4CC",
    "EH25 5DD",
    "EH26 6EE",
    "EH27 7FF",
    "EH28 8GG",
    "EH29 9HH",
    "EH30 0II",
  ];

  const handleCheckDelivery = () => {
    const formatted = localPostcode.trim().toUpperCase();
    if (validDeliveryPostcodes.includes(formatted)) {
      setIsValid(true);
      setSubmittedCode(formatted);
    } else {
      setIsValid(false);
      setSubmittedCode("");
    }
  };

  const handleClosePopup = () => {
    setIsValid(null);
    onClose();
  };

  const handleChange = () => {
    setOrderType(localOrderType);
    setPickupTime(localPickupTime);
    setPostcode(localPostcode);
    if (
      localOrderType === "delivery" &&
      !validDeliveryPostcodes.includes(localPostcode.trim().toUpperCase())
    ) {
      setPostcode("");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-auto lg:min-w-[25rem] lg:max-w-[25rem]">
        <button
          onClick={handleClosePopup}
          className="cursor-pointer bg-transparent absolute right-0 p-2">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="edit-pop-up max-w-md mx-auto bg-white rounded-sm2 shadow-custom p-9">
          {/* Pickup / Delivery Toggle */}
          <div className="flex flex-col gap-1 min-w-[300px] lg:min-w-0">
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setLocalOrderType("pickup")}
                className={`border-2 rounded-md p-2 flex-1 cursor-pointer flex flex-col gap-1 ${
                  localOrderType === "pickup"
                    ? "border-red bg-grayback"
                    : "border-gray"
                }`}>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orderType"
                    checked={localOrderType === "pickup"}
                    onChange={() => setLocalOrderType("pickup")}
                    className="h-5 w-5 cursor-pointer"
                  />
                  <span className="text-red text-base font-semibold capitalize">
                    Pickup
                  </span>
                </div>
                <span className="text-xs ps-1">Starting at : 02:00 PM</span>
              </button>

              <button
                onClick={() => setLocalOrderType("delivery")}
                className={`border-2 rounded-md p-2 flex-1 cursor-pointer flex flex-col gap-1 ${
                  localOrderType === "delivery"
                    ? "border-red bg-grayback"
                    : "border-gray"
                }`}>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orderType"
                    checked={localOrderType === "delivery"}
                    onChange={() => setLocalOrderType("delivery")}
                    className="h-5 w-5 cursor-pointer"
                  />
                  <span className="text-red text-base font-semibold capitalize">
                    Delivery
                  </span>
                </div>
                <span className="text-xs ps-1">Starting at : 02:00 PM</span>
              </button>
            </div>
          </div>

          {/* Conditional Content */}
          {localOrderType === "pickup" ? (
            <div className="flex flex-col justify-center gap-4 items-center mt-5">
              <div className="flex flex-col gap-3 w-full">
                <p className="text-cgreen-500 text-base font-semibold text-center capitalize">
                  Pickup Time
                </p>
                <div className="flex flex-col gap-1">
                  <select
                    className="w-full p-2 border rounded"
                    value={localPickupTime}
                    onChange={handlePickupChange}>
                    <option value="" disabled>
                      Select Your Pickup Time
                    </option>
                    {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 w-full mt-5">
              {isValid === true && (
                <div className="w-full bg-green-100 text-green-700 p-2 rounded-md text-center font-semibold">
                  Delivery Available to: {submittedCode}
                </div>
              )}

              <div className="w-full">
                <p className="text-cgreen-500 text-base font-semibold text-center">
                  Enter Delivery Postcode
                </p>
                <input
                  type="text"
                  placeholder="Enter Your Postcode"
                  value={localPostcode}
                  onChange={(e) => setLocalPostcode(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md mt-3"
                />
              </div>
              <button
                onClick={handleCheckDelivery}
                className="bg-red text-base font-semibold text-white w-full p-2 rounded-md cursor-pointer">
                CHECK DELIVERY
              </button>

              {/* Pop-up */}
              {isValid === false && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
                  <div className="edit-pop-up max-w-md mx-auto bg-white rounded-md shadow-custom p-5 text-center">
                    <div className="flex justify-end">
                      <div
                        className="cursor-pointer text-xl text-gray-500"
                        onClick={() => setIsValid(null)}>
                        ×
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 items-center py-3">
                      <img
                        src={deliveryman}
                        alt="Delivery Not Eligible"
                        className="w-20 h-20"
                      />
                      <p className="text-base font-semibold text-black">
                        No Delivery to this Area
                      </p>
                      <button
                        onClick={() => setIsValid(null)}
                        className="p-2 px-6 rounded-md bg-red w-50 text-white text-base font-semibold">
                        Ok
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-center space-x-3 mt-6">
            <button
              onClick={handleClosePopup}
              className="text-sm text-white font-AvertaStdBold bg-red hover:bg-red text-center py-3 px-6 rounded-sm2">
              Close
            </button>
            <button
              onClick={handleChange}
              className="text-sm text-white font-AvertaStdBold bg-red hover:bg-red text-center py-3 px-6 rounded-sm2">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePopup;
