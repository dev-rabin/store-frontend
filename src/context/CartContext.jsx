import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const count = cart.reduce((total, item) => total + item.quantity, 0);

      setCartCount(count);
    } catch (error) {
      console.log(error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();

    const handleStorageChange = () => {
      fetchCartCount();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        fetchCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
