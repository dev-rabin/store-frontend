import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkout, createPayment, fetchProduct } from "../services/storeApis";
import Loader from "../components/ui/Loader";

const Checkout = () => {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product_id");
  const quantity = Number(searchParams.get("quantity")) || 1;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("customer_details");
    return saved
      ? JSON.parse(saved)
      : {
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          shipping_address: "",
          city: "",
          state: "",
          pincode: "",
        };
  });

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = "Full name is required";
    } else if (!/^[A-Za-z ]{2,50}$/.test(formData.customer_name)) {
      newErrors.customer_name = "Enter a valid name";
    }

    if (!formData.customer_email.trim()) {
      newErrors.customer_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      newErrors.customer_email = "Enter a valid email";
    }

    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.customer_phone)) {
      newErrors.customer_phone = "Enter a valid 10 digit mobile number";
    }

    if (!formData.shipping_address.trim()) {
      newErrors.shipping_address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6 digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (productId) {
      loadProduct();
    } else {
      loadCart();
    }
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    setCartTotal(total);
  };

  const loadProduct = async () => {
    try {
      const data = await fetchProduct(productId);

      setProduct(data);

      setCartTotal(data.price * quantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async () => {
    try {
      if (!validateForm()) return;
      setLoading(true);
      let items = [];
      if (productId) {
        items = [
          {
            product_id: Number(productId),
            quantity,
          },
        ];
      } else {
        items = cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        }));
      }
      localStorage.setItem("customer_details", JSON.stringify(formData));
      const orderRes = await checkout({
        ...formData,
        items,
      });

      const paymentRes = await createPayment(orderRes.order_id);

      if (paymentRes.checkout_url) {
        localStorage.setItem("last_order_number", orderRes.order_number);

        window.location.href = paymentRes.checkout_url;
      }
    } catch (error) {
      console.log(error);

      alert(error?.message || "Unable to process checkout");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-2xl p-5">
            <h2 className="text-xl font-semibold mb-5">Customer Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="customer_name"
                placeholder="Full Name"
                value={formData.customer_name}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="email"
                name="customer_email"
                placeholder="Email"
                value={formData.customer_email}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />
              <input
                type="tel"
                name="customer_phone"
                placeholder="Phone Number"
                value={formData.customer_phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    setFormData((prev) => ({
                      ...prev,
                      customer_phone: value,
                    }));
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 6) {
                    setFormData((prev) => ({
                      ...prev,
                      pincode: value,
                    }));
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />
            </div>

            <textarea
              name="shipping_address"
              placeholder="Full Address"
              value={formData.shipping_address}
              onChange={handleChange}
              rows={4}
              className="border rounded-lg p-3 w-full mt-4"
            />
          </div>
        </div>

        <div>
          <div className="bg-white border rounded-2xl p-5 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

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
                      <h3>{product.name}</h3>

                      <p>Qty: {quantity}</p>
                    </div>

                    <div>₹{product.price * quantity}</div>
                  </div>
                </div>
              )
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm">{item.name}</h3>

                      <p>Qty: {item.quantity}</p>
                    </div>

                    <div>₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t mt-5 pt-5">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 shadow-lg"
            >
              {loading ? "Processing..." : `Pay ₹${cartTotal}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
