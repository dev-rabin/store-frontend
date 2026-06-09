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
        error?.message || error?.response?.data?.message || "Order not found",
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Track Your Order
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Enter your order number and phone number
          </p>

          <form onSubmit={handleTrack} className="space-y-4">
            <input
              type="text"
              placeholder="Order Number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
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
              <h2 className="text-xl font-bold mb-4">Order Details</h2>

              <div className="space-y-2">
                <p>
                  <strong>Order Number:</strong> {order.order_number}
                </p>

                <p>
                  <strong>Name:</strong> {order.customer_name}
                </p>

                <p>
                  <strong>Phone:</strong> {order.customer_phone}
                </p>

                <p>
                  <strong>Total Amount:</strong> ₹{order.total_amount}
                </p>

                <p>
                  <strong>Payment Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.payment_status === "paid"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </p>

                <p>
                  <strong>Order Status:</strong>{" "}
                  <span className="font-semibold">{order.status}</span>
                </p>

                <p>
                  <strong>Address:</strong> {order.shipping_address}
                </p>

                <p>
                  <strong>City:</strong> {order.city}
                </p>

                <p>
                  <strong>State:</strong> {order.state}
                </p>

                <p>
                  <strong>Pincode:</strong> {order.pincode}
                </p>
              </div>

              {order.items?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold mb-3">Products</h3>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between border rounded-xl p-3"
                      >
                        <div>
                          <p className="font-medium">{item.product?.name}</p>

                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div>₹{item.price * item.quantity}</div>
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
