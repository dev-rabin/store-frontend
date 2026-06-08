import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const AddToCartBtn = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const { fetchCartCount } = useCart();

  const handleAddToCart = () => {
    try {
      console.log("Add TO Cart");
      setLoading(true);
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.product_id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          product_id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      if (fetchCartCount) {
        fetchCartCount();
      }
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
      className="rounded-xl w-full bg-black text-white px-2 py-2 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs md:px-5 md:py-2 md:text-sm font-medium shadow-lg whitespace-nowrap hover:bg-black/85 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Adding..." : added ? "✓ Added" : "Add To Cart"}
    </button>
  );
};

export default AddToCartBtn;
