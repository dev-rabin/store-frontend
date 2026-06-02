import React from "react";

const FeaturedSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-8 bg-red-500 rounded"></div>

          <span className="text-red-500 font-semibold tracking-wide">
            Featured
          </span>
        </div>

        <h2 className="text-4xl sm:text-xs lg:text-lg font-bold">
          New Arrival
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[650px]">
        {/* Playstation Banner */}
        <div className="group relative overflow-hidden rounded-3xl bg-black">
          <img
            src="/image/ps.png"
            alt="PlayStation"
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-8 left-8 text-white z-10">
            <h3 className="text-4xl font-bold mb-3">PlayStation 5</h3>

            <p className="text-gray-300 mb-4 max-w-sm">
              Black and White version of the PS5 coming out on sale.
            </p>

            <button className="border-b-2 border-white pb-1 hover:text-red-400 transition">
              Shop Now →
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="grid grid-rows-[1fr_auto] gap-6">
          {/* Women Collection */}
          <div className="group relative overflow-hidden rounded-3xl">
            <img
              src="/image/w_model.jpg"
              alt="Women Collection"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            <div className="absolute bottom-8 left-8 text-white z-10">
              <h3 className="text-3xl font-bold mb-3">Women's Collection</h3>

              <p className="text-gray-300 mb-4">
                Featured woman collections that give you another vibe.
              </p>

              <button className="border-b-2 border-white pb-1 hover:text-red-400 transition">
                Shop Now →
              </button>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Speakers */}
            <div className="group relative overflow-hidden rounded-3xl bg-black">
              <img
                src="/image/jbl.png"
                alt="Speakers"
                className="w-full h-full object-contain p-8 transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Speakers</h3>

                <button className="border-b border-white hover:text-red-400 transition">
                  Shop Now →
                </button>
              </div>
            </div>

            {/* Furniture */}
            <div className="group relative overflow-hidden rounded-3xl bg-black">
              <img
                src="/image/jbl.png"
                alt="Furniture"
                className="w-full h-full object-contain p-8 transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Furniture</h3>

                <button className="border-b border-white hover:text-red-400 transition">
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

export default FeaturedSection;
