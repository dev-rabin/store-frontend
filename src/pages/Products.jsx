import React, { useEffect, useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCategories, fetchProducts } from "../services/storeApis";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import AddToCart from "../components/ui/AddToCartBtn";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("latest");

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, sort]);

  const loadCategories = async () => {
    try {
      const categoryData = await fetchCategories();
      setCategories(categoryData || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      if (products.length === 0) {
        setLoading(true);
      } else {
        setProductsLoading(true);
      }
      console.log("Search:", search);
      console.log("Category:", category);
      const productData = await fetchProducts(search, category);

      setProducts(productData || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProductsLoading(false);
    }
  };

  const filterProducts = () => {
    let data = [...products];

    if (selectedCategory) {
      data = data.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    switch (sort) {
      case "low-high":
        data.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        data.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredProducts(data);
  };

  if (loading) {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2">
        <p className="text-xs sm:text-sm text-gray-500">Home / Products</p>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-10">
        <div className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide py-1">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base rounded-full whitespace-nowrap transition ${
              selectedCategory === ""
                ? "bg-red-500 text-white"
                : "bg-white shadow"
            }`}
          >
            All
          </button>

          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base rounded-full whitespace-nowrap transition ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "bg-white shadow"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 pb-10 lg:pb-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 lg:mb-10">
          <p className="text-sm sm:text-base text-gray-500">
            Showing {filteredProducts.length} Products
          </p>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className=" border rounded-lg lg:rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base"
          >
            <option value="latest">Latest</option>
            <option value="low-high">Price Low to High</option>
            <option value="high-low">Price High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {productsLoading ? (
            <div className="col-span-full h-20 flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className=" group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden
              "
              >
                {/* Image */}
                <div className="relative h-36 sm:h-44 md:h-52">
                  <button className=" absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>

                  <img
                    src={product.img}
                    alt={product.name}
                    className=" h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3 lg:p-4">
                  <p className="text-[10px] sm:text-xs uppercase text-gray-400 mb-1">
                    {product.category}
                  </p>

                  <h3
                    onClick={() => navigate(`/product-detail/${product.id}`)}
                    className=" font-semibold text-xs sm:text-sm lg:text-base text-gray-900 line-clamp-2 min-h-[36px] sm:min-h-[48px] hover:underline cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  {/* <div className="flex items-center gap-1 text-amber-400 text-xs sm:text-sm mt-2">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} />
                    ))}

                    <span className="text-gray-500 ml-1 text-xs sm:text-sm">
                      (24)
                    </span>
                  </div> */}

                  <div className="flex justify-between items-center mt-3 lg:mt-4">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-red-500">
                      ₹{product.price}
                    </div>

                    <div>
                      <AddToCart productId={product.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-10 lg:py-20 text-gray-500">
            No products found.
          </div>
        )}
      </section>
    </>
  );
};

export default Products;
