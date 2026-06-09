import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PaymentReturn = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderNumber = searchParams.get("order_number");

    if (orderNumber) {
      localStorage.setItem("last_order_number", orderNumber);
      localStorage.setItem("order_number", orderNumber);
      console.log("Order Number Saved:", orderNumber);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-3xl border border-gray-100 p-8 text-center shadow-sm">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-2xl font-bold">Payment Received</h1>

        <p className="text-gray-500 mt-3">Thank you for your order.</p>

        <Link
          to="/track-order"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default PaymentReturn;
