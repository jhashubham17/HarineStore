import React, { useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ addToCart }) {
  // Products ordered as: Soap → Rice → Washing Powder → Mustard Oil → Salt
  const products = [
    {
      id: 1,
      name: "Power Gold Clothing Soap",
      image: "./PowerGoldSoap.avif",
      description: "Clothing Washing soap with essential oils",
      category: "soap",
    },
    {
      id: 2,
      name: "Dubar Basmati Rice",
      image: "./DubarSellaBasmatiRice.png",
      description:
        "Dubar Sella Basmati Rice features medium-length grains, golden hue, and firm texture,ideal for everyday meals and flavorful biryanis.",
      category: "rice",
      price: 1335, // Base price for 30kg
    },
    {
      id: 3,
      name: "Tibar Basmati rice",
      image: "./TibarSellaBasmatiRice.png",
      description:
        "Tibar Sella Basmati rice offers long grains, rich  aroma, and perfect fluffiness, ideal for flavorful, aromatic dishes and biryanis.",
      category: "rice",
      price: 1440, // Base price for 30kg
    },
    {
      id: 4,
      name: "Select Biryani Rice",
      image: "./SelectBiryaniWhiteSella.png",
      description:
        "Select Biryani White Sella offers Long-grain, aromatic, aged rice that enhances biryani with its fluffy texture and rich flavor. Premium quality for perfect dishes.",
      category: "rice",
      price: 2325, // Base price for 30kg
    },

    {
      id: 5,
      name: "Dum Briyani Basmati Rice",
      image: "./PremiumDumBriyani.png",
      description:
        "Premium Dum Briyani Basmati Rice offers long grains, aromatic fragrance, and fluffy texture, perfect for traditional Indian dishes and celebrations.",
      category: "rice",
      price: 2375, // Base price for 30kg
    },
    {
      id: 6,
      name: "Mohtarma Biryani Basmati Rice",
      image: "./Mohtarma1121XXLBriyaniSpecialBasmatiRice.png",
      description:
        "Mohtarma XXXL Biryani Basmati Rice offers extra-long,aromatic grains, perfect for rich, flavorful biryanis with a fluffy, non-sticky texture.",
      category: "rice",
      price: 2375, // Base price for 30kg
    },
    {
      id: 7,
      name: "Washing Powder",
      image: "./WashingPowderImg.jpg",
      description: "Powerful cleaning washing powder",
      category: "washing-powder",
      price: 1000, // Base price for 10kg
    },
    {
      id: 8,
      name: "Mustard Oil",
      image: "./IndependenceMustardOil.webp",
      description: "Pure cold-pressed mustard oil",
      category: "mustard-oil",
      price: 200, // Base price for 1 liter
    },
    {
      id: 9,
      name: "Salt",
      image: "./KoyalSaltImg.jpg",
      description: "Refined Iodised Salt, rich in minerals",
      category: "salt",
      price: 185, // Base price for 25kg
    },
  ];

  const [filters, setFilters] = useState({
    category: "all",
    searchTerm: "",
  });

  // Categories ordered as: all → soap → rice → washing-powder → mustard-oil → salt
  const categories = [
    "all",
    "soap",
    "rice",
    "washing-powder",
    "mustard-oil",
    "salt",
  ];

  // Split categories into two rows
  const firstRowCategories = categories.slice(0, 3); // First 3 categories
  const secondRowCategories = categories.slice(3); // Remaining categories

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      filters.category === "all" || product.category === filters.category;
    const searchMatch =
      product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12" id="products">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
        Our Products
      </h2>

      <div className="mb-4 sm:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
        <div className="w-full md:w-auto order-2 md:order-1">
          <div className="grid grid-rows-2 gap-2">
            {/* First row of categories */}
            <div className="flex gap-2">
              {firstRowCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilters({ ...filters, category })}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full capitalize whitespace-nowrap text-xs sm:text-sm flex-grow ${
                    filters.category === category
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {category.split("-").join(" ")}
                </button>
              ))}
            </div>

            {/* Second row of categories */}
            <div className="flex gap-2">
              {secondRowCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilters({ ...filters, category })}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full capitalize whitespace-nowrap text-xs sm:text-sm flex-grow ${
                    filters.category === category
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {category.split("-").join(" ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto md:min-w-[250px] order-1 md:order-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
            />
            {filters.searchTerm && (
              <button
                onClick={() => setFilters({ ...filters, searchTerm: "" })}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg text-gray-600">
            No products found. Try different filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
