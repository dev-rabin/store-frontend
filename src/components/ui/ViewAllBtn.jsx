import React from "react";
import { useNavigate } from "react-router-dom";

const ViewAllBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/products")}
      className="
        bg-red-500
        hover:bg-red-600
        text-white
        font-medium

        text-xs
        sm:text-sm
        md:text-base

        px-3
        sm:px-4
        md:px-5
        lg:px-6

        py-1
        sm:py-1.5
        md:py-2

        rounded-md
        sm:rounded-lg

        whitespace-nowrap

        transition-all
        duration-300
      "
    >
      View All
    </button>
  );
};

export default ViewAllBtn;
