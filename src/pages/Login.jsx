import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/storeApis";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
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
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_name", data.user.name);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert(error?.message || "Login failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 flex items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[250px] sm:min-h-[350px]">
            <img
              src="/image/shopping.png"
              alt="Shopping"
              className=" w-full max-w-[180px] sm:max-w-[250px] md:max-w-[320px] lg:max-w-md object-contain"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-md">
              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Welcome Back
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
                Login to your Shoppy account
              </p>

              <form onSubmit={handleSubmit}>
                {/* Email / Phone */}
                <div className="mb-4 sm:mb-5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Email or Phone
                  </label>

                  <input
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder="Enter email or phone"
                    className=" w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4 sm:mb-5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className=" w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                w-full
                bg-red-500
                hover:bg-red-600
                text-white
                py-2.5
                sm:py-3
                text-sm
                sm:text-base
                rounded-lg
                sm:rounded-xl
                font-semibold
                transition
                duration-300
                disabled:opacity-50
              "
                >
                  {loading ? "Logging In..." : "Login"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-4 sm:my-6">
                <div className="flex-1 border-t"></div>
                <span className="px-3 sm:px-4 text-gray-400 text-xs sm:text-sm">
                  OR
                </span>
                <div className="flex-1 border-t"></div>
              </div>

              {/* Signup */}
              <p className="text-center text-sm sm:text-base text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-red-500 font-semibold hover:text-red-600"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
