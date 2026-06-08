import React from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentReturn from "./pages/PaymentReturn";
import AboutUs from "./pages/AboutUs";
import TrackOrder from "./pages/TrackOrder";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/products" element={<Products />} />

        <Route path="/product-detail/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/track-order" element={<TrackOrder />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/payment/return" element={<PaymentReturn />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
