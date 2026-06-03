import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/storeApis";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await signup(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_name", data.user.name);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert(error?.message || "Signup failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 flex items-center justify-center p-10">
            <img
              src="/image/shopping.png"
              alt="Shopping"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Create Account
              </h1>

              <p className="text-gray-500 mb-8">
                Join Shoppy and start shopping today
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    minLength={10}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className=" w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 border-t"></div>
                <span className="px-4 text-gray-400 text-sm">OR</span>
                <div className="flex-1 border-t"></div>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-red-500 font-semibold hover:text-red-600"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
