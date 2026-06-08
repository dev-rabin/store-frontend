import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const txnId = searchParams.get("txn_id");

  const isSuccess = status === "success";

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

            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm break-all">
              {txnId}
            </div>

            <Link
              to="/track-order"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-2xl"
            >
              View Orders
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
              to="/orders"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-2xl"
            >
              Back to Orders
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentReturn;
