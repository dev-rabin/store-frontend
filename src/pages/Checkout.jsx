import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getProfile,
  checkout,
  getCart,
  fetchProduct,
} from "../services/storeApis";

const Checkout = () => {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product_id");
  const quantity = Number(searchParams.get("quantity")) || 1;

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchAddresses();

    if (productId) {
      loadProduct();
    } else {
      fetchCart();
    }
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getProfile();

      const userAddresses = response.user?.addresses || [];

      setAddresses(userAddresses);

      const defaultAddress = userAddresses.find(
        (address) => address.is_default,
      );

      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCart = async () => {
    try {
      const data = await getCart();

      const items = data.cart || [];

      setCartItems(items);

      const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      );

      setCartTotal(total);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProduct = async () => {
    try {
      const data = await fetchProduct(productId);

      setProduct(data);

      setCartTotal(data.price * quantity);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!selectedAddress) {
        alert("Please select an address");
        return;
      }

      setLoading(true);

      const payload = {
        address_id: selectedAddress,
      };

      if (productId) {
        payload.product_id = Number(productId);
        payload.quantity = quantity;
      }

      const response = await checkout(payload);

      navigate(`/orders/${response.order_id}`);
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
          error?.response?.data?.message ||
          "Unable to place order",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address Section */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-2xl p-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Delivery Address</h2>

              <button
                onClick={() => navigate("/profile")}
                className="text-blue-600 font-medium"
              >
                Manage Addresses
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-6">
                <p className="mb-3 text-gray-500">No address found</p>

                <button
                  onClick={() => navigate("/profile")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`border rounded-xl p-4 cursor-pointer transition ${
                      selectedAddress === address.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                      />

                      <div>
                        <h3 className="font-semibold">{address.full_name}</h3>

                        <p className="text-gray-500">{address.phone}</p>

                        <p className="text-gray-600 mt-2">
                          {[
                            address.address_line_1,
                            address.address_line_2,
                            address.city,
                            address.state,
                            address.pincode,
                            address.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border rounded-2xl p-5 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* Buy Now Product */}
            {productId ? (
              product && (
                <div className="border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>

                      <p className="text-gray-500">Qty: {quantity}</p>
                    </div>

                    <div className="font-semibold">
                      ₹{product.price * quantity}
                    </div>
                  </div>
                </div>
              )
            ) : (
              <>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b pb-4"
                      >
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-medium text-sm">
                            {item.product.name}
                          </h3>

                          <p className="text-gray-500 text-sm">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="font-semibold text-sm">
                          ₹{item.product.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Price Summary */}
            <div className="border-t mt-5 pt-5 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || !selectedAddress}
              className="
                w-full
                mt-6
                bg-red-500
                hover:bg-red-600
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
                disabled:opacity-50
              "
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
