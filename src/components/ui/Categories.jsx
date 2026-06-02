import React, { useEffect, useRef, useState } from "react";
import {
  faMobileScreen,
  faLaptop,
  faHeadphones,
  faCamera,
  faGamepad,
  faClock,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "./Heading";
import ViewAllBtn from "./ViewAllBtn";
import { fetchCategories } from "../../services/storeApis";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const iconMap = {
  Mobiles: faMobileScreen,
  Laptops: faLaptop,
  Audio: faHeadphones,
  Earbuds: faHeadphones,
  Camera: faCamera,
  Gaming: faGamepad,
  "Smart Watch": faClock,
  Charger: faMobileScreen,
  "Power Bank": faMobileScreen,
};

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -1200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 1200,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <Heading title="Categories" />

      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 lg:mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          Browse
        </h2>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={scrollLeft}
            className="
        w-5 h-5
        sm:w-10 sm:h-10
        rounded-full
        bg-gray-100
        hover:bg-red-500
        hover:text-white
        transition
      "
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            onClick={scrollRight}
            className="
       w-5 h-5
        sm:w-10 sm:h-10
        rounded-full
        bg-gray-100
        hover:bg-red-500
        hover:text-white
        transition
      "
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <ViewAllBtn />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="
    flex
    gap-3
    sm:gap-4
    lg:gap-6
    overflow-x-auto
    scroll-smooth
    scrollbar-hide
    py-3
    sm:py-4
    lg:py-5
    px-1
    sm:px-2
  "
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="
        group
        relative
        overflow-hidden
        rounded-2xl
        lg:rounded-3xl
        bg-white
        p-3
        sm:p-4
        lg:p-6
        cursor-pointer
        shadow-md
        hover:shadow-xl
        lg:hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        hover:-translate-y-1
        lg:hover:-translate-y-3
        transition-all
        duration-300
        lg:duration-500
        flex-shrink-0
        w-[120px]
        sm:w-[150px]
        lg:w-[180px]
      "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition duration-300"></div>

            <div className="absolute -right-10 -top-10 w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition duration-500"></div>

            <div
              className="relative z-10 flex flex-col items-center"
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(category)}`)
              }
            >
              <div
                className="
            w-12 h-12
            sm:w-16 sm:h-16
            lg:w-20 lg:h-20
            rounded-xl
            lg:rounded-2xl
            bg-gray-100
            flex
            items-center
            justify-center
            mb-3
            sm:mb-4
            lg:mb-5
            transition
            duration-300
            group-hover:bg-white/20
            group-hover:rotate-6
            group-hover:scale-110
          "
              >
                <FontAwesomeIcon
                  icon={iconMap[category] || faMobileScreen}
                  className="
              text-xl
              sm:text-2xl
              lg:text-4xl
              text-gray-700
              group-hover:text-white
              transition
            "
                />
              </div>

              <h3
                className="
            font-semibold
            text-xs
            sm:text-sm
            lg:text-base
            text-gray-900
            group-hover:text-white
            transition
            text-center
            line-clamp-2
          "
              >
                {category}
              </h3>

              <p
                className="
            text-[10px]
            sm:text-xs
            lg:text-sm
            text-gray-500
            mt-1
            lg:mt-2
            group-hover:text-white/80
            transition
          "
              >
                Products
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
