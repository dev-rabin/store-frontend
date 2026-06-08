import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPaymentDetails } from "../services/storeApis";

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const txnId = searchParams.get("txn_id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const isSuccess = status === "success";

  useEffect(() => {
    if (!txnId || !isSuccess) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const data = await getPaymentDetails(txnId);

        console.log("Payment Details:", data);

        if (data?.success) {
          setOrder(data);

          localStorage.setItem("order_number", data.order_number);

          localStorage.setItem("lastOrder", JSON.stringify(data));
        } else {
          setError("Unable to fetch order details.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [txnId, isSuccess]);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.order_number);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-3xl border border-gray-100 p-8 text-center shadow-sm">
        {isSuccess ? (
          <>
            <div className="text-6xl mb-4">✅</div>

            <h1 className="text-2xl font-bold">Payment Successful</h1>

            <p className="text-gray-500 mt-3">
              Your payment has been received successfully.
            </p>

            {loading ? (
              <div className="mt-6 text-gray-500">Loading order details...</div>
            ) : order ? (
              <>
                <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Order ID</p>

                  <div className="flex flex-col gap-3">
                    <span className="font-bold text-xl text-green-700 break-all">
                      {order.order_number}
                    </span>

                    <button
                      onClick={copyOrderId}
                      className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                      {copied ? "Copied ✓" : "Copy Order ID"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 border rounded-2xl p-4 text-left">
                  <p className="text-xs text-gray-500">Transaction ID</p>

                  <p className="font-medium break-all mt-1">
                    {order.transaction_id}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border rounded-2xl p-4">
                    <p className="text-xs text-gray-500">Payment Status</p>

                    <p className="font-semibold text-green-600 mt-1 capitalize">
                      {order.payment_status}
                    </p>
                  </div>

                  <div className="bg-gray-50 border rounded-2xl p-4">
                    <p className="text-xs text-gray-500">Order Status</p>

                    <p className="font-semibold mt-1 capitalize">
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-xl p-3">
                  Save your <strong>Order ID</strong> for tracking your order.
                </div>
              </>
            ) : (
              <div className="mt-6 text-red-500">
                {error || "Order details not found"}
              </div>
            )}

            <Link
              to="/track-order"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition"
            >
              Track Order
            </Link>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">❌</div>

            <h1 className="text-2xl font-bold">Payment Failed</h1>

            <p className="text-gray-500 mt-3">
              Your payment could not be completed.
            </p>

            <Link
              to="/cart"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-2xl"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentReturn;
