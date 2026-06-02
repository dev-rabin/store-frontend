import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
      <div className="w-3 h-6 sm:w-4 sm:h-8 bg-red-500 rounded"></div>

      <span className="text-xs sm:text-base lg:text-lg text-red-500 font-semibold">
        {title}
      </span>
    </div>
  );
};

export default Heading;
