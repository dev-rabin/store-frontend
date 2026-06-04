import React from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import TopHeader from "./components/ui/TopHeader";
import ProductDetails from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProtectedRoute from "./guard/protectedRoute";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import PaymentReturn from "./pages/PaymentReturn";
import AboutUs from "./pages/AboutUs";
import Checkout from "./pages/Checkout";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {/* <TopHeader /> */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/payment/return" element={<PaymentReturn />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />

        {/* Protected Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
