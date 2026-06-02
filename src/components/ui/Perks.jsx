import React from "react";
import { faTruck, faPhone, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const features = [
  {
    id: 1,
    icon: faTruck,
    title: "FREE & FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: faPhone,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: faCheck,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

const Perks = () => {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="
          group
          flex
          flex-col
          items-center
          text-center
          p-4
          sm:p-5
          md:p-6
          lg:p-8
          rounded-2xl
          lg:rounded-3xl
          bg-white
          shadow-md
          hover:shadow-xl
          hover:-translate-y-1
          lg:hover:-translate-y-2
          transition-all
          duration-300
        "
          >
            <div
              className="
            w-12 h-12
            sm:w-14 sm:h-14
            md:w-16 md:h-16
            lg:w-20 lg:h-20
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            mb-3
            sm:mb-4
            lg:mb-6
            group-hover:bg-red-500
            transition-all
            duration-300
          "
            >
              <FontAwesomeIcon
                icon={feature.icon}
                className="
              text-white
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
            "
              />
            </div>

            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>

            <p className="text-xs sm:text-sm lg:text-base text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Perks;
