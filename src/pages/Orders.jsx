import React, { useEffect, useState } from "react";
import { getOrders } from "../services/storeApis";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      setOrders(data.orders || data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-600";

      case "cancelled":
        return "bg-red-100 text-red-600";

      case "shipped":
        return "bg-blue-100 text-blue-600";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <img
              src="/image/shopping.png"
              alt="No Orders"
              className="w-48 mx-auto mb-6"
            />

            <h2 className="text-2xl font-bold text-gray-800">No Orders Yet</h2>

            <p className="text-gray-500 mt-2">
              Start shopping and your orders will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Order #{order.id}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>

                    <h3 className="text-2xl font-bold text-red-500">
                      ₹{order.total_amount}
                    </h3>
                  </div>

                  {/* Right */}

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        order.payment_status === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </div>
                </div>

                {/* Bottom Section */}

                <div className="mt-5 border-t pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-5
                      py-2
                      rounded-xl
                      transition
                    "
                  >
                    View Details
                  </button>

                  <button
                    className="
                      border
                      border-gray-300
                      hover:bg-gray-100
                      px-5
                      py-2
                      rounded-xl
                      transition
                    "
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
