import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    if (location.pathname !== "/products") return;

    const timer = setTimeout(() => {
      if (search.trim()) {
        navigate(`/products?search=${encodeURIComponent(search)}`, {
          replace: true,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, navigate, location.pathname]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (location.pathname !== "/products") {
      navigate(`/products?search=${encodeURIComponent(value)}`);
      return;
    }

    if (!value.trim()) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`, {
      replace: true,
    });
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
            to="/track-order"
            className={`transition duration-200 ${
              isActive("/track-order")
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            Track Order
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
              value={search}
              onChange={handleSearch}
              className="w-72 bg-gray-100 rounded-lg py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-red-400"
            />

            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

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
        </div>
      </nav>

      <hr className="border-gray-200" />
    </>
  );
}
