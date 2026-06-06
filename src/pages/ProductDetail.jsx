import React, { useEffect, useState } from "react";
import {
  faHeart,
  faStar,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../services/storeApis";
import AddToCart from "../components/ui/AddToCartBtn";
import Loader from "../components/ui/Loader";
import BuyNowBtn from "../components/ui/BuyNowBtn";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await fetchProduct(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Breadcrumb */}
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 lg:mb-8">
          Home / Products / {product.category}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm p-3 sm:p-4 lg:p-6">
            <img
              src={product.img}
              alt={product.name}
              className="
              w-full
              h-[250px]
              sm:h-[350px]
              md:h-[450px]
              lg:h-[500px]
              object-contain
            "
            />
          </div>

          {/* Product Details */}
          <div>
            {/* Category */}
            <span
              className="
              inline-block
              px-3
              py-1
              sm:px-4
              sm:py-2
              bg-red-100
              text-red-500
              rounded-full
              text-xs
              sm:text-sm
              font-medium
            "
            >
              {product.category}
            </span>

            {/* Title */}
            <h1
              className="
              text-xl
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
              font-bold
              mt-3
              sm:mt-4
            "
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 sm:mt-6">
              <span
                className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
                font-bold
                text-red-500
              "
              >
                ₹{product.price}
              </span>

              <span
                className="
                ml-2
                sm:ml-4
                text-sm
                sm:text-lg
                lg:text-xl
                text-gray-400
                line-through
              "
              >
                ₹{product.price + 2000}
              </span>
            </div>

            {/* Description */}
            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                Description
              </h3>

              <p
                className="
                text-sm
                sm:text-base
                text-gray-600
                leading-relaxed
              "
              >
                {product.desc}
              </p>
            </div>

            {/* Quantity */}
            <div className="mt-6 sm:mt-8">
              <h3 className="font-semibold text-sm sm:text-base mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="
                  w-10
                  h-10
                  sm:w-12
                  sm:h-12
                  rounded-lg
                  sm:rounded-xl
                  bg-white
                  shadow
                "
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <span className="text-lg sm:text-xl font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="
                  w-10
                  h-10
                  sm:w-12
                  sm:h-12
                  rounded-lg
                  sm:rounded-xl
                  bg-white
                  shadow
                "
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6 sm:mt-10 w-full">
              <div className="w-full sm:flex-1">
                <AddToCart productId={product.id} />
              </div>

              <div className="w-full sm:flex-1">
                <BuyNowBtn productId={product.id} />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-10">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow">
                <h4 className="font-semibold text-sm sm:text-base">
                  Free Delivery
                </h4>

                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  On orders above ₹999
                </p>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow">
                <h4 className="font-semibold text-sm sm:text-base">
                  7 Days Return
                </h4>

                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Easy replacement policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
