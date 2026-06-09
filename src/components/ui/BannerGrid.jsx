import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BannerGrid = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const banners = [
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Best Tech Deals",
      subtitle:
        "Discover the latest gadgets and electronics with exclusive discounts.",
      button: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Feels Premium",
      subtitle: "As powerful as it is portable",
      button: "Explore",
    },
    {
      image: "https://images.unsplash.com/photo-1570829460005-c840387bb1ca",
      title: "Smart Watches",
      subtitle: "Latest collection available now",
      button: "Shop Now",
    },
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      title: "Audio Gear",
      subtitle: "Premium sound experience",
      button: "Shop Now",
    },
  ];

  const nextSlide = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-4 px-2">
      {/* MOBILE CAROUSEL */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-3xl h-[280px]">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {banners.map((banner, index) => (
              <div key={index} className="w-full shrink-0 relative h-full">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45 flex items-center">
                  <div className="px-6">
                    <h2 className="text-white text-3xl font-bold mb-4">
                      {banner.title}
                    </h2>

                    <p className="text-white/90 mb-6">{banner.subtitle}</p>

                    <button
                      onClick={() => navigate("/products")}
                      className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                      {banner.button}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            ❮
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            ❯
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden lg:grid grid-cols-12 gap-5 h-[580px] px-2">
        {/* Left Large Banner */}
        <div className="group col-span-6 relative rounded-3xl overflow-hidden cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="Tech Deals"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-500">
            <div className="h-full flex flex-col justify-center px-10">
              <span className="text-white/80 uppercase tracking-[4px] text-sm mb-3">
                Limited Offer
              </span>

              <h1 className="text-white text-6xl font-bold mb-4">
                Festive Tech Deals
              </h1>

              <p className="text-white/90 text-lg mb-8 max-w-md">
                Discover the latest gadgets and electronics with exclusive
                discounts.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="bg-teal-600 text-white px-8 py-4 rounded-xl w-fit"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Middle Banner */}
        <div className="group col-span-3 relative rounded-3xl overflow-hidden cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sneakers"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-6">
            <div>
              <h2 className="text-white text-4xl font-bold mb-4">
                Feels Premium
              </h2>

              <p className="text-white mb-6">As powerful as it is portable</p>

              <button
                onClick={() => navigate("/products")}
                className="bg-black text-white px-7 py-3 rounded-full"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 flex flex-col gap-5">
          <div className="group relative flex-1 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1621319332247-ce870cdad56c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Watch"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30 flex items-center px-3 sm:px-5 lg:px-8">
              <div>
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                  Smart Watches
                </h3>
                <button
                  onClick={() => navigate("/products")}
                  className="text-white border-b border-white text-xs sm:text-sm lg:text-base pb-0.5 hover:text-red-400 transition"
                >
                  Shop Now →
                </button>
              </div>
            </div>
          </div>

          <div className="group relative flex-1 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              alt="Headphones"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30 flex items-center px-8">
              <div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Audio Gear
                </h3>

                <button
                  onClick={() => navigate("/products")}
                  className="text-white border-b border-white text-xs sm:text-sm lg:text-base pb-0.5 hover:text-red-400 transition"
                >
                  Shop Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerGrid;
