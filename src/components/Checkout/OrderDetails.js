import React from "react";

const orders = [
  {
    id: "EZYODR01",
    date: "15-10-2023",
    status: "Ready",
    items: 1,
    total: "£29.00",
    action: "View",
  },
  {
    id: "EZYODR01",
    date: "15-10-2023",
    status: "Delivered",
    items: 1,
    total: "£29.00",
    action: "View",
  },
];

const statusColor = (status) => {
  switch (status) {
    case "Order Placed":
      return "text-blue-600";
    case "Ready":
      return "text-red-500";
    case "Delivered":
      return "text-green-500";
    default:
      return "text-gray-600";
  }
};

const OrderDetails = () => {
  return (
    <div className="max-w-6xl bg-white rounded-lg mx-auto p-4">
      <h2 className="text-xl font-semibold text-black mb-4">My Order</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-red text-white">
              <th className="px-4 py-3">Order No</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td
                  className={`px-4 py-3 font-medium ${statusColor(
                    order.status
                  )}`}>
                  {order.status}
                </td>
                <td className="px-4 py-3">{order.items}</td>
                <td className="px-4 py-3">{order.total}</td>
                <td className="px-4 py-3">
                  {order.action === "Cancel" ? (
                    <button className="text-red-500 font-medium hover:underline">
                      Cancel
                    </button>
                  ) : (
                    <button className="text-black font-medium hover:underline">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm">
          <label htmlFor="pageSize" className="mr-2">
            Page size
          </label>
          <select id="pageSize" className="border px-2 py-1 rounded text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 border-2  rounded">&lt;</button>
          <button className="px-3 py-1 bg-red text-base2 rounded">1</button>
          <button className="px-2 py-1 border-2  rounded">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
