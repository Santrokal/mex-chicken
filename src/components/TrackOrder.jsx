import React from "react";

const TrackOrder = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h6 className="text-black text-lg font-semibold mb-4">Tracking Order</h6>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start mb-6">
        {/* Order No Fields */}
        <div className="md:col-span-6 grid grid-cols-1  gap-4">
          <input
            name="order_no"
            placeholder="Enter Your Order No"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm"
          />
          <input
            name="email"
            placeholder="Enter Email"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="button"
        className="bg-red text-white px-16 py-2.5 rounded-md font-semibold text-sm">
        Track
      </button>
    </div>
  );
};

export default TrackOrder;
