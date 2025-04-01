import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Search, X } from "lucide-react";

function ProductList({ addToCart }) {
  // Products organized by category
  const products = [
    {
      id: 1,
      name: "Power Gold Clothing Soap",
      image: "./PowerGoldSoap.avif",
      description: "Clothing Washing soap with essential oils",
      category: "soap",
    },
    {
      id: 3,
      name: "Dubar Basmati Rice",
      image: "./DubarSellaBasmatiRice.png",
      description:
        "Dubar Sella Basmati Rice features medium-length grains, golden hue, and firm texture, ideal for everyday meals and flavorful biryanis.",
      category: "rice",
      price: 1350, // Base price for 30kg
    },
    {
      id: 4,
      name: "Tibar Basmati rice",
      image: "./TibarSellaBasmatiRice.png",
      description:
        "Tibar Sella Basmati rice offers long grains, rich aroma, and perfect fluffiness, ideal for flavorful, aromatic dishes and biryanis.",
      category: "rice",
      price: 1440, // Base price for 30kg
    },
    {
      id: 5,
      name: "Select Biryani Rice",
      image: "./SelectBiryaniWhiteSella.png",
      description:
        "Select Biryani White Sella offers Long-grain, aromatic, aged rice that enhances biryani with its fluffy texture and rich flavor. Premium quality for perfect dishes.",
      category: "rice",
      price: 1935, // Base price for 30kg
    },
    {
      id: 6,
      name: "Dum Briyani Basmati Rice",
      image: "./PremiumDumBriyani.png",
      description:
        "Premium Dum Briyani Basmati Rice offers long grains, aromatic fragrance, and fluffy texture, perfect for traditional Indian dishes and celebrations.",
      category: "rice",
      price: 2325, // Base price for 30kg
    },
    {
      id: 7,
      name: "Mohtarma Biryani Basmati Rice",
      image: "./Mohtarma1121XXLBriyaniSpecialBasmatiRice.png",
      description:
        "Mohtarma XXXL Biryani Basmati Rice offers extra-long, aromatic grains, perfect for rich, flavorful biryanis with a fluffy, non-sticky texture.",
      category: "rice",
      price: 2375, // Base price for 30kg
    },
    {
      id: 9,
      name: "Mustard Oil",
      image: "./IndependenceMustardOil.webp",
      description: "Pure cold-pressed mustard oil",
      category: "mustard-oil",
      price: 3700, // Base price for 1 liter
    },
    {
      id: 10,
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

  const categories = ["all", "soap", "rice", "mustard-oil", "salt"];

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      filters.category === "all" || product.category === filters.category;
    const searchMatch =
      filters.searchTerm === "" ||
      product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 py-12" id="products">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h2>

      <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Search bar */}
        <div className="w-full lg:w-64 order-1 lg:order-2 mb-4 lg:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            {filters.searchTerm && (
              <button
                onClick={() => setFilters({ ...filters, searchTerm: "" })}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="w-full lg:w-auto order-2 lg:order-1 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilters({ ...filters, category })}
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium transition-all ${
                filters.category === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.split("-").join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg mt-6">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg text-gray-600 mb-2">No products found</p>
          <p className="text-gray-500">
            Try changing your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
