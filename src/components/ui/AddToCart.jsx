import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { addToCart } from "../../services/storeApis";

const AddToCart = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartCount } = useCart();

  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await addToCart(productId);
      await fetchCartCount();

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="rounded-full bg-black text-white px-5 py-2 text-sm font-medium shadow-lg whitespace-nowrap hover:bg-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Adding..." : added ? "✓ Added" : "Add To Cart"}
    </button>
  );
};

export default AddToCart;
