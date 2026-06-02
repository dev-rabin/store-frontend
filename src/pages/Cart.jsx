import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  checkout,
  getCart,
  removeCart,
  updateCart,
} from "../services/storeApis";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);

      const data = await checkout();

      navigate(`/orders/${data.order_id}`);
    } catch (error) {
      console.log(error);

      alert(error?.message || "Unable to place order. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCartItems(data.cart || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await updateCart(id, quantity);

      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeCart(id);

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

    if (loading) {
      return (
        <div className=" min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      );
    }


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-2">
              Add products to start shopping.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-md p-5 flex flex-col md:flex-row gap-5 items-center"
                >
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-2xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {item.product.name}
                    </h3>

                    <p className="text-red-500 font-bold text-lg mt-2">
                      ₹{item.product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>

                    <span className="font-semibold w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="bg-white rounded-3xl shadow-md p-6 sticky top-5">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="flex justify-between mb-3">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between mb-3">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  {checkoutLoading ? "Placing Order..." : "Proceed To Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
