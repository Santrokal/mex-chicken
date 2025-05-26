import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";

const statusColor = (status) => {
  switch (status) {
    case "Order Placed":
      return "text-blue600";
    case "Ready":
      return "text-red";
    case "Delivered":
      return "text-green-500";
    default:
      return "text-gray-600";
  }
};

const formatDate = (timestamp) => {
  try {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return "N/A";
  }
};

const OrderDetails = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const totalPages = Math.ceil(orders.length / pageSize);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/orders");
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        const formattedOrders = sortedData.map((order, index) => ({
          id: order.orderId,
          date: formatDate(order.timestamp),
          orderType: order.orderType,
          status:
            index === 0
              ? "Order Placed"
              : order.orderType === "pickup"
              ? "Ready"
              : "Delivered",
          items: order.cartItems ? order.cartItems.length : 0,
          total: `£${Number(order.total).toFixed(2)}`,
          action: "View",
          isNew: index === 0,
        }));

        setOrders(formattedOrders);
        setError("");

        // Update only the newest order's status after 10 seconds
        if (formattedOrders.length > 0 && formattedOrders[0].isNew) {
          setTimeout(() => {
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.isNew
                  ? {
                      ...order,
                      status:
                        order.orderType === "pickup"
                          ? "Ready"
                          : order.orderType === "delivery"
                          ? "Delivered"
                          : order.status,
                      isNew: false,
                    }
                  : order
              )
            );
          }, 10000);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="max-w-6xl bg-white rounded-lg mx-auto p-4">
      <h2 className="text-xl font-semibold text-black mb-4">My Order</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {orders.length === 0 && !error ? (
        <div className="text-gray-600 text-sm">No orders found.</div>
      ) : (
        <>
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
                {paginatedOrders.map((order, idx) => (
                  <tr key={idx} className="">
                    <td className="px-4 py-3 font-AvertaStdBold">{order.id}</td>
                    <td className="py-3 font-AvertaStdBold ">{order.date}</td>
                    <td
                      className={`px-4 py-3 font-AvertaStdBold ${statusColor(
                        order.status
                      )}`}>
                      {order.status}
                    </td>
                    <td className="px-4 py-3 font-AvertaStdBold">
                      {order.items}
                    </td>
                    <td className="px-4 py-3 font-AvertaStdBold">
                      {order.total}
                    </td>
                    <td className="px-4 py-3 font-AvertaStdBold">
                      <button className="text-black font-medium hover:underline">
                        {order.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <label htmlFor="pageSize" className="mr-2">
                Page size
              </label>
              <select
                id="pageSize"
                className="border px-2 py-1 rounded text-sm"
                value={pageSize}
                onChange={handlePageSizeChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
