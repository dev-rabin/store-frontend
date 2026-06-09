import React, { useEffect, useState } from "react";
import ViewAllBtn from "./ViewAllBtn";
import Heading from "./Heading";
import { fetchProducts } from "../../services/storeApis";
import AddToCart from "./AddToCartBtn";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import BuyNowBtn from "./BuyNowBtn";

const TodayDeal = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("Products API:", data);
        const randomProducts = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setProducts(randomProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <Heading title="Today's Deal" />

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          Flash Sales
        </h2>
        <ViewAllBtn url="/products" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="
        group
        relative
        overflow-hidden
        rounded-2xl
        lg:rounded-3xl
        bg-white
        shadow-md
        hover:shadow-xl
        lg:hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        transition-all
        duration-300
        hover:-translate-y-1
        lg:hover:-translate-y-2
      "
          >
            <div className="relative h-40 sm:h-52 md:h-60 lg:h-80 overflow-hidden">
              {/* Discount Badge */}
              <div className="absolute left-2 top-2 sm:left-3 sm:top-3 lg:left-4 lg:top-4 z-20">
                <span className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 sm:px-3 lg:px-4 lg:py-1.5 text-[10px] sm:text-xs font-semibold text-white shadow-lg">
                  SAVE {product.discount || 10}%
                </span>
              </div>
              <img
                src={product.img}
                alt={product.name}
                className=" h-full w-full object-contain p-2 sm:p-3 lg:p-4 transition duration-700 group-hover:scale-110 group-hover:rotate-2"
              />

              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 translate-y-20 gap-1 sm:gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <BuyNowBtn productId={product.id} />
                <AddToCart product={product} />
              </div>
            </div>

            <div className="p-3 sm:p-4 lg:p-6">
              <p className="mb-1 text-[10px] sm:text-xs lg:text-sm uppercase tracking-wider text-gray-400">
                {product.category || "Electronics"}
              </p>

              <h3
                onClick={() => navigate(`/product-detail/${product.id}`)}
                className="mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg font-semibold text-gray-900 line-clamp-2 min-h-[40px] sm:min-h-[48px] hover:cursor-pointer hover:underline"
              >
                {product.name}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <span className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>

                  <span className="ml-2 text-xs sm:text-sm text-gray-400 line-through">
                    ₹{(product.price || 0) + 40}
                  </span>
                </div>

                <span className="w-fit rounded-full bg-green-100 px-2 py-1 lg:px-3 text-[10px] sm:text-xs font-medium text-green-700">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayDeal;
