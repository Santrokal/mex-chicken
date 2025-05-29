/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from "react";
import { useOrder } from "../Order/OrderContext";
import ChangePopup from "./ChangePopup";

const PickupOrDeliveryInfo = () => {
  const [submittedPostcode, setSubmittedPostcode] = useState("");
  const [showChangePopup, setShowChangePopup] = useState(false);

  const {
    orderType,
    pickupTime,
    postcode,
    setPostcode,
    isValidPostcode,
    setIsValidPostcode,
    orderInstructions,
    setOrderInstructions,
  } = useOrder();

  const handleValidationChange = (isValid, submittedCode) => {
    console.log("Validation Change:", { isValid, submittedCode });
    setIsValidPostcode(isValid);
    setSubmittedPostcode(submittedCode);
  };

  return (
    <>
      <div className="payment-type">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h6 className="text-black font-AvertaStdEB text-sm mt-2">
            {orderType === "pickup"
              ? "Pickup Information"
              : "Delivery Information"}
          </h6>
          <p className="text-black font-Avertastd">£ 0.00</p>
          {!showChangePopup && (
            <button
              type="button"
              onClick={() => setShowChangePopup(true)}
              className="text-white bg-red px-3 py-2 rounded-sm2 font-Avertastd capitalize"
              aria-label="Change order type or details">
              <i className="bi bi-arrow-left-square-fill"></i>
              <span className="ml-1">Change</span>
            </button>
          )}
        </div>
        <div>
          <p className="text-black font-AvertaStdRegular text-sm mt-2">
            {orderType === "pickup" ? (
              <>
                Pickup Time:{" "}
                <span className="font-Avertastd">
                  {pickupTime || "Not selected yet"}
                </span>
              </>
            ) : (
              <>
                Delivery Postcode:{" "}
                <span className="font-Avertastd">
                  {isValidPostcode === false
                    ? `Delivery not available for ${
                        submittedPostcode || postcode || "Not provided"
                      }`
                    : postcode || "Not provided"}
                </span>
              </>
            )}
          </p>
        </div>
        <div className="mt-6">
          <textarea
            name="orderNote"
            placeholder="e.g Instruction of your order"
            className="w-full px-3 py-3 border bg-cwhite-primary text-cgreen-200 border-cgray-600 rounded-sm2 text-sm md:text-base font-AvertaStdRegular focus-visible:outline-none"
            spellCheck="false"
            value={orderInstructions}
            onChange={(e) => setOrderInstructions(e.target.value)}
            aria-label="Order instructions"
          />
        </div>
      </div>
      {showChangePopup && (
        <ChangePopup
          onClose={() => setShowChangePopup(false)}
          onValidationChange={handleValidationChange}
        />
      )}
    </>
  );
};
export default PickupOrDeliveryInfo;
