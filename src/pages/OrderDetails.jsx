import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPayment, getOrderById } from "../services/storeApis";
import Loader from "../components/ui/Loader";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);

      const paymentResponse = await createPayment(order.id);

      if (!paymentResponse.success) {
        throw new Error("Unable to initiate payment");
      }

      window.location.href = paymentResponse.checkout_url;
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to initiate payment. Please try again.",
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                Order Id: {order.id}
              </span>

              <h1 className="text-sm md:text-xl font-bold text-gray-900 mt-4">
                Thanks for your order 🎉
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                    order.status,
                  )}`}
                >
                  {order.status?.toUpperCase()}
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  PAYMENT {order.payment_status?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-gray-500 text-sm">Total Amount</p>

              <h2 className="text-5xl font-bold text-gray-900 mt-2">
                ₹{order.total_amount}
              </h2>

              {order.payment_status !== "paid" && (
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className=" mt-6 px-5 py-2 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-50
                "
                >
                  {paymentLoading ? "Redirecting..." : `Pay Now`}
                </button>
              )}

              {order.payment_status === "paid" && (
                <div className="mt-6 inline-flex items-center px-6 py-4 rounded-2xl bg-green-50 text-green-700 font-semibold">
                  ✓ Payment Completed
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            {/* Ordered Items */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-xl font-semibold mb-5">Ordered Items</h2>

              <div className="space-y-5">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-5">
                    <img
                      src={item.product.img}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-2xl object-cover border"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {item.product.name}
                      </h3>

                      <p className="text-gray-500">{item.product.category}</p>

                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>

                    <div className="font-bold text-xl">₹{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="font-semibold text-lg mb-4">Delivery Address</h2>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">
                  {order.address?.full_name}
                </h3>
                <p className="text-gray-500">{order.address?.phone}</p>
                <p className="text-gray-600 leading-relaxed">
                  {[
                    order.address?.address_line_1,
                    order.address?.address_line_2,
                    order.address?.city,
                    order.address?.state,
                    order.address?.pincode,
                    order.address?.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="font-semibold text-lg mb-4">Payment Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.total_amount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{order.total_amount}</span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            {order.payment_status !== "paid" && (
              <button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="
          w-full
          py-4
          rounded-2xl
          bg-black
          text-white
          font-semibold
          hover:opacity-90
          transition
        "
              >
                {paymentLoading
                  ? "Redirecting..."
                  : `Pay Now ₹${order.total_amount}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
