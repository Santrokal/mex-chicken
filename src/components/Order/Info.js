import React, { useState } from "react";

const Info = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-[30rem]">
      <div className="flex flex-col mt-3 px-3">
        <div className="lg:p-5 lg:py-2 py-2 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-2 lg:px-5 py-2 border-2 rounded-md text-base font-medium ${
                activeTab === "info"
                  ? "border-red text-red"
                  : "border-gray-400 text-black"
              }`}>
              Information
            </button>
            <button
              onClick={() => setActiveTab("hours")}
              className={`px-2 lg:px-5 py-2 border-2 rounded-md text-base font-medium ${
                activeTab === "hours"
                  ? "border-red text-red"
                  : "border-gray-400 text-black"
              }`}>
              Opening Hours
            </button>
          </div>
          <div className="cursor-pointer flex items-center justify-end"></div>
        </div>
        {activeTab === "info" ? (
          <div className="flex flex-col gap-3 pl-5 my-3">
            <div>
              <p className="text-lg font-semibold text-black">
                Minimum Order For Delivery
              </p>
              <ul className="list-disc p-3 mx-3">
                <li className="py-2 border-b border-gray-200 text-sm font-medium text-black">
                  Minimum order £ 10 Within 1 Mile
                </li>
                <li className="py-2 border-b border-gray-200 text-sm font-medium text-black">
                  Minimum order £ 10 Within 2 Miles
                </li>
                <li className="py-2 border-b border-gray-200 text-sm font-medium text-black">
                  Minimum order £ 10 Within 3 Miles
                </li>
                <li className="py-2 border-b border-gray-200 text-sm font-medium text-black">
                  Minimum order £ 10 Within 4 Miles
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <p className="text-lg font-semibold text-black">
                Payment Method Accepted
              </p>
              <ul className="list-disc p-3 mx-3">
                <li className="py-2 border-b border-gray-200 text-sm font-medium text-black">
                  Cash
                </li>
                <li className="py-2 border-b border-gray-200 text-sm font-medium text-black">
                  Card
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pl-2 my-2">
            <p className="text-lg font-semibold text-black mb-2">
              Opening Hours
            </p>
            <table className="table-auto border-collapse rounded-md overflow-hidden table-box-shadow w-auto h-0">
              <thead>
                <tr>
                  <th className="px-4 py-4 border border-gray-300 text-black">
                    Day
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-black text-center">
                    Pickup
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-black text-center">
                    Delivery
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Mon", "05:00 PM- 11:30 PM", "03:00 PM- 11:00 PM"],
                  ["Tue", "02:00 PM- 11:45 PM", "02:00 PM- 11:45 PM"],
                  ["Wed", "03:00 PM- 11:00 PM", "04:00 PM- 11:00 PM"],
                  ["Thu", "03:00 PM- 11:00 PM", "04:00 PM- 11:00 PM"],
                  ["Fri", "03:00 PM- 11:30 PM", "04:00 PM- 11:00 PM"],
                  ["Sat", "03:00 PM- 11:30 PM", "04:00 PM- 11:30 PM"],
                  ["Sun", "03:00 PM- 11:00 PM", "04:00 PM- 11:00 PM"],
                ].map(([day, pickup, delivery]) => (
                  <tr key={day}>
                    <td className=" border border-gray-300 text-center">
                      {day}
                    </td>
                    <td className=" border border-gray-300 text-center">
                      {pickup}
                    </td>
                    <td className=" border border-gray-300 text-center">
                      {delivery}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
