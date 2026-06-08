import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const txnId = searchParams.get("txn_id");

  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  const isSuccess = status === "success";

  useEffect(() => {
    if (!txnId || !isSuccess) return;
    fetch(`https://mobilevarse.com/api/public/api/payment/details/${txnId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data);
        }
      })
      .catch(console.error);
  }, [txnId, isSuccess]);

  const copyOrderId = () => {
    if (!order?.order_number) return;

    navigator.clipboard.writeText(order.order_number);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-3xl border border-gray-100 p-8 text-center">
        {isSuccess ? (
          <>
            <div className="text-6xl mb-4">✅</div>

            <h1 className="text-2xl font-bold">Payment Successful</h1>

            <p className="text-gray-500 mt-3">
              Your payment has been received successfully.
            </p>

            {order && (
              <>
                <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Order ID</p>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-lg break-all">
                      {order.order_number}
                    </span>

                    <button
                      onClick={copyOrderId}
                      className="bg-black text-white px-3 py-1 rounded-lg text-sm"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 rounded-2xl p-4 text-left">
                  <p className="text-xs text-gray-500">Transaction ID</p>

                  <p className="font-medium break-all mt-1">
                    {order.transaction_id}
                  </p>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Save your Order ID for tracking your order.
                </p>
              </>
            )}

            <Link
              to="/track-order"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-2xl"
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
