import React, { useEffect, useState } from "react";
import {
  faHeart,
  faEye,
  faRotate,
  faForward,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewAllBtn from "./ViewAllBtn";
import Heading from "./Heading";
import Loader from "./Loader";
import { fetchNewArrivals } from "../../services/storeApis";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";

const DiscoverProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchNewArrivals();
      setProducts(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <Heading title="New" />

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          Discovered Something New
        </h2>
        <ViewAllBtn />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loading ? (
          <div className="col-span-full flex justify-center py-10">
            <Loader />
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="
          group
          relative
          bg-white
          border-r
          border-b
          border-gray-200
          overflow-hidden
          transition-all
          duration-300
          hover:-translate-y-1
          lg:hover:-translate-y-2
          hover:z-10
          hover:shadow-lg
          lg:hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
        "
            >
              {/* Action Buttons */}
              <div
                className="
            absolute
            top-2
            right-2
            sm:top-3
            sm:right-3
            z-20
            flex
            flex-col
            gap-1.5
            sm:gap-2
            opacity-0
            translate-x-4
            group-hover:translate-x-0
            group-hover:opacity-100
            transition-all
            duration-300
          "
              >
                <button
                  onClick={() => navigate(`/product-detail/${product.id}`)}
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                >
                  <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={product.img}
                  alt={product.name}
                  className="
              w-full
              h-[140px]
              sm:h-[180px]
              md:h-[220px]
              lg:h-[260px]
              xl:h-[300px]
              object-contain
              p-2
              sm:p-3
              md:p-4
              lg:p-6
              transition-all
              duration-700
              group-hover:scale-110
              group-hover:rotate-2
            "
                />

                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-full flex justify-center">
                    <AddToCart productId={product.id} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3 md:p-4 lg:p-5">
                <h3
                  onClick={() => navigate(`/product-detail/${product.id}`)}
                  className=" text-xs sm:text-sm md:text-base lg:text-lg font-medium  text-gray-900 line-clamp-2 min-h-[36px] sm:min-h-[42px] md:min-h-[50px] hover:underline hover:cursor-pointer"
                >
                  {product.name}
                </h3>

                <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-xs sm:text-sm md:text-base text-gray-400 line-through">
                    ₹{product.old_price || product.price}
                  </span>

                  <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DiscoverProducts;
