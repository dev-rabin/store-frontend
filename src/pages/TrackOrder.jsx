import React, { useEffect, useState } from "react";
import { trackOrder } from "../services/storeApis";
import Loader from "../components/ui/Loader";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!orderNumber || !phone) {
      alert("Please enter Order Number and Phone Number");
      return;
    }

    try {
      setLoading(true);

      const response = await trackOrder(orderNumber, phone);

      setOrder(response.order);
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message || error?.message || "Order not found",
      );

      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastOrderNumber = localStorage.getItem("last_order_number");

    const customerPhone = localStorage.getItem("customer_phone");

    if (lastOrderNumber) {
      setOrderNumber(lastOrderNumber);
    }

    if (customerPhone) {
      setPhone(customerPhone);
    }
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Track Your Order
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Enter your order number and phone number
          </p>

          <form onSubmit={handleTrack} className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Order Number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold py-3"
            >
              {loading ? "Tracking..." : "Track Order"}
            </button>
          </form>

          {loading && (
            <div className="mt-6 flex justify-center">
              <Loader />
            </div>
          )}

          {order && (
            <div className="mt-8 border rounded-2xl p-6 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
                <h2 className="text-2xl font-bold">Order Details</h2>

                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    Payment: {order.payment_status}
                  </span>

                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Order Number:</strong>
                  <div>{order.order_number}</div>
                </div>

                <div>
                  <strong>Customer Name:</strong>
                  <div>{order.customer_name}</div>
                </div>

                <div>
                  <strong>Phone:</strong>
                  <div>{order.customer_phone}</div>
                </div>

                <div>
                  <strong>Total Amount:</strong>
                  <div>₹{order.total_amount}</div>
                </div>

                <div>
                  <strong>Order Date:</strong>
                  <div>{formatDateTime(order.created_at)}</div>
                </div>

                <div>
                  <strong>Pincode:</strong>
                  <div>{order.pincode}</div>
                </div>

                <div>
                  <strong>City:</strong>
                  <div>{order.city}</div>
                </div>

                <div>
                  <strong>State:</strong>
                  <div>{order.state}</div>
                </div>

                <div className="md:col-span-2">
                  <strong>Shipping Address:</strong>
                  <div>{order.shipping_address}</div>
                </div>
              </div>

              {order.items?.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">Ordered Products</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border rounded-xl p-4"
                      >
                        <h4 className="font-semibold">{item.product?.name}</h4>

                        <div className="mt-2 flex justify-between text-sm text-gray-600">
                          <span>Qty: {item.quantity}</span>

                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
