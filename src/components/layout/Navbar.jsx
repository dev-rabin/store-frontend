import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cartCount } = useCart();
  const userName = localStorage.getItem("user_name") || "U";
  const [search, setSearch] = useState("");

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    if (!search.trim()) return;

    const timer = setTimeout(() => {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };
  return (
    <>
      <nav className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide text-black">
          MobileVarse
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <NavLink
            to="/"
            className={`transition duration-200 ${
              isActive("/")
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            Home
          </NavLink>

          <NavLink
            to="/orders"
            className={`transition duration-200 ${
              isActive("/orders")
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            Orders
          </NavLink>

          <NavLink
            to="/products"
            className={`transition duration-200 ${
              isActive("/products")
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={`transition duration-200 ${
              isActive("/about")
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            About
          </NavLink>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden lg:block">
            <input
              type="search"
              placeholder="Search products..."
              className="w-72 bg-gray-100 rounded-lg py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-red-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />

            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/cart")}
                className="relative hover:scale-110 transition"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-xl text-gray-700"
                />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center justify-center font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      <hr className="border-gray-200" />
    </>
  );
}
