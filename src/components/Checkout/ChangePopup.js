import React, { useState, useEffect } from "react";
import { useOrder } from "../Order/OrderContext";
import deliveryman from "../../images/delivery-man.svg";

const ChangePopup = ({ onClose, onValidationChange }) => {
  const {
    orderType: globalOrderType,
    setOrderType,
    pickupTime: globalPickupTime,
    setPickupTime,
    postcode,
    setPostcode,
  } = useOrder();

  const [localOrderType, setLocalOrderType] = useState(
    globalOrderType || "pickup"
  );
  const [localPickupTime, setLocalPickupTime] = useState(
    globalPickupTime || ""
  );
  const [timeOptions, setTimeOptions] = useState([]);
  const [isValid, setIsValid] = useState(null);
  const [submittedCode, setSubmittedCode] = useState("");

  // Generate pickup times on component mount
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

  const isValidWF10Postcode = (postcode) => {
    if (!postcode) return false;
    const postcodeRegex = /^WF10\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
  };

  const handleCheckDelivery = (e) => {
    e.preventDefault(); // Prevent any form submission
    if (!postcode) {
      setIsValid(false);
      setSubmittedCode("");
      onValidationChange(false, "");
      return;
    }
    const trimmedPostcode = postcode.trim().toUpperCase();
    if (isValidWF10Postcode(trimmedPostcode)) {
      setIsValid(true);
      setSubmittedCode(trimmedPostcode);
      onValidationChange(true, trimmedPostcode);
    } else {
      setIsValid(false);
      setSubmittedCode(trimmedPostcode);
      onValidationChange(false, trimmedPostcode);
    }
  };

  const handlePickupChange = (e) => {
    setLocalPickupTime(e.target.value);
  };

  const handleClosePopup = () => {
    setIsValid(null);
    setSubmittedCode("");
    onValidationChange(null, "");
    onClose();
  };

  const handleChange = () => {
    setOrderType(localOrderType);
    if (localOrderType === "pickup") {
      setPickupTime(localPickupTime);
      setPostcode("");
      localStorage.removeItem("postcode");
      onValidationChange(null, "");
    } else {
      setPickupTime("");
      localStorage.setItem("postcode", postcode);
      onValidationChange(isValid, submittedCode);
    }
    onClose();
  };

  const isChangeButtonEnabled =
    localOrderType === "pickup" ? localPickupTime !== "" : isValid === true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-auto lg:min-w-[25rem] lg:max-w-[25rem]">
        <button
          onClick={handleClosePopup}
          className="cursor-pointer bg-transparent absolute right-0 p-2"
          aria-label="Close popup">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="edit-pop-up max-w-md mx-auto bg-white rounded-sm2 shadow-custom p-9">
          <div className="flex flex-col gap-1 min-w-[300px] lg:min-w-0">
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setLocalOrderType("pickup")}
                className={`border-2 rounded-md p-2 flex-1 cursor-pointer flex flex-col gap-1 ${
                  localOrderType === "pickup"
                    ? "border-red bg-grayback"
                    : "border-gray"
                }`}
                aria-label="Select pickup">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orderType"
                    checked={localOrderType === "pickup"}
                    onChange={() => setLocalOrderType("pickup")}
                    className="h-5 w-5 cursor-pointer accent-red"
                  />
                  <span className="text-red text-base font-semibold capitalize">
                    Pickup
                  </span>
                </div>
                <span className="text-xs ps-1">Starting at: 02:00 PM</span>
              </button>

              <button
                onClick={() => setLocalOrderType("delivery")}
                className={`border-2 rounded-md p-2 flex-1 cursor-pointer flex flex-col gap-1 ${
                  localOrderType === "delivery"
                    ? "border-red bg-grayback"
                    : "border-gray"
                }`}
                aria-label="Select delivery">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orderType"
                    checked={localOrderType === "delivery"}
                    onChange={() => setLocalOrderType("delivery")}
                    className="h-5 w-5 cursor-pointer accent-red"
                  />
                  <span className="text-red text-base font-semibold capitalize">
                    Delivery
                  </span>
                </div>
                <span className="text-xs ps-1">Starting at: 02:00 PM</span>
              </button>
            </div>
          </div>

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
                    onChange={handlePickupChange}
                    aria-label="Select pickup time">
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
                  value={postcode}
                  onChange={(e) =>
                    setPostcode(e.target.value.toUpperCase().trim())
                  }
                  className="border border-gray-300 p-3 w-full rounded-md mt-3"
                  aria-label="Enter delivery postcode"
                />
              </div>
              <button
                type="button" // Explicitly set to prevent form submission
                onClick={handleCheckDelivery}
                className="bg-red text-base font-semibold text-white w-full p-2 rounded-md cursor-pointer"
                aria-label="Check delivery availability">
                CHECK DELIVERY
              </button>
            </div>
          )}

          {isValid === false && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
              <div className="edit-pop-up max-w-md mx-auto bg-white rounded-md shadow-custom p-5 text-center">
                <div className="flex justify-end">
                  <button
                    className="cursor-pointer text-xl text-gray-500"
                    onClick={() => {
                      setIsValid(null);
                      setSubmittedCode("");
                      onValidationChange(null, "");
                    }}
                    aria-label="Close invalid postcode popup">
                    ×
                  </button>
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
                    type="button"
                    onClick={() => {
                      setIsValid(null);
                      setSubmittedCode("");
                      onValidationChange(null, "");
                    }}
                    className="p-2 px-6 rounded-md bg-red w-50 text-white text-base font-semibold"
                    aria-label="Close invalid postcode message">
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-3 mt-6">
            <button
              type="button"
              onClick={handleClosePopup}
              className="text-sm text-white font-AvertaStdBold bg-red hover:bg-red text-center py-3 px-6 rounded-sm2"
              aria-label="Close popup">
              Close
            </button>
            <button
              type="button"
              onClick={handleChange}
              disabled={!isChangeButtonEnabled}
              className={`text-sm text-white font-AvertaStdBold bg-red text-center py-3 px-6 rounded-sm2 ${
                !isChangeButtonEnabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red"
              }`}
              aria-label="Confirm changes">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePopup;
