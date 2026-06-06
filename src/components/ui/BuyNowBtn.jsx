import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyNowBtn = ({ productId, quantity = 1 }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    try {
      setLoading(true);
      navigate(`/checkout?product_id=${productId}&quantity=${quantity}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={loading}
      className="rounded-xl w-full bg-red-500 text-white px-2 py-2 text-[10px] sm:px-3 sm:py-2 sm:text-xs md:px-5 md:py-2 md:text-sm font-medium shadow-lg whitespace-nowrap hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Loading..." : "Buy Now"}
    </button>
  );
};

export default BuyNowBtn;
