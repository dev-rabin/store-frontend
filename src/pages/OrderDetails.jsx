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
      <div className=" min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Order Details</p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.id}
            </h1>

            <p className="text-gray-500">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-gray-500">Order Status</p>

              <span
                className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Status</p>

              <span
                className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  order.payment_status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {order.payment_status}
              </span>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-gray-500">Total Amount</p>

              <p className="text-2xl font-bold text-gray-900 mt-2">
                ₹{order.total_amount}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.total_amount}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Action */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Payment</h3>

              <p className="text-sm text-gray-500 mt-1">
                Complete your payment to start processing your order.
              </p>
            </div>

            {order.payment_status === "paid" ? (
              <div className="px-5 py-3 rounded-2xl bg-green-50 text-green-700 font-medium">
                ✓ Payment Completed
              </div>
            ) : (
              <button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="
                  px-6
                  py-3
                  rounded-2xl
                  bg-black
                  text-white
                  font-medium
                  transition-all
                  duration-300
                  hover:opacity-90
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {paymentLoading
                  ? "Redirecting to Payment..."
                  : `Pay ₹${order.total_amount}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
