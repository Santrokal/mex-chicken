import React, { useState } from "react";
import Info from "./Info";

const OrderHead = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 justify-end md:justify-between items-center">
        <div className="text-black text-cgreen-500 font-Avertastd">
          <span>Open at 1:00 PM to 11:00 PM</span>
        </div>
        <div className="text-black text-cgreen-500 font-Avertastd">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <span className="text-center">
              Online ordering is now available, place your orders today!
            </span>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setShowInfo(true)}
              aria-hidden="true">
              <i className="bi bi-info-circle"></i>
              <span className="text-[#005FCB]">Info</span>
            </div>
            {showInfo && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative bg-white rounded-lg shadow-xl max-w-[95%] sm:max-w-[32rem] w-full p-4">
                  <button
                    onClick={() => setShowInfo(false)}
                    className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500">
                    &times;
                  </button>
                  <Info />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHead;
