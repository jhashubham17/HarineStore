import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Search, X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductList({ addToCart }) {
  const products = [
    // Soap Products (20 Pieces)
    {
      id: 1,
      name: "Power Gold Soap",
      images: [
        "./PowerGoldSoap.avif",
        // "./SoapImg2.jpg",
        // "/images/PowerGoldSoap3.avif",
      ],
      description: "Clothing Washing soap with essential oils",
      Size: "300×20",
      package: "20 Pieces",
      price: 410,
      category: "soap",
    },
    {
      id: 2,
      name: "Power Gold Soap",
      images: [
        "./PowerGoldSoap.avif",
        // "/images/PowerGoldSoap2.avif",
        // "/images/PowerGoldSoap3.avif",
      ],
      description: "Clothing Washing soap with essential oils",
      Size: "270×20",
      package: "20 Pieces",
      price: 370,
      category: "soap",
    },
    {
      id: 3,
      name: "Power Gold Soap",
      images: [
        "./PowerGoldSoap.avif",
        // "/images/PowerGoldSoap2.avif",
        // "/images/PowerGoldSoap3.avif",
      ],
      description: "Clothing Washing soap with essential oils",
      Size: "250×20",
      package: "20 Pieces",
      price: 350,
      category: "soap",
    },
    {
      id: 4,
      name: "Power Gold Soap",
      images: [
        "./PowerGoldSoap.avif",
        // "/images/PowerGoldSoap2.avif",
        // "/images/PowerGoldSoap3.avif",
      ],
      description: "Clothing Washing soap with essential oils",
      Size: "225×20",
      package: "20 Pieces",
      price: 310,
      category: "soap",
    },
    {
      id: 5,
      name: "Power Gold Soap",
      images: [
        "./PowerGoldSoap.avif",
        // "/images/PowerGoldSoap2.avif",
        // "/images/PowerGoldSoap3.avif",
      ],
      description: "Clothing Washing soap with essential oils",
      Size: "190×20",
      package: "20 Pieces",
      price: 270,
      category: "soap",
    },
    // Soap Product (50 Pieces)
    {
      id: 6,
      name: "Power Gold Soap",
      images: [
        "./PowerGoldSoap.avif",
        // "/images/PowerGoldSoap2.avif",
        // "/images/PowerGoldSoap3.avif",
      ],
      description: "Clothing Washing soap with essential oils",
      Size: "120×50",
      package: "50 Pieces",
      price: 400,
      category: "soap",
    },
    // Rice Products (30kg)
    {
      id: 7,
      name: "Dubar Basmati Rice",
      images: [
        "./DubarSellaBasmatiRice.png",
        // "/images/DubarRice2.png",
        // "/images/DubarRice3.png",
      ],
      description: "Medium-length grains, golden hue, firm texture",
      package: "30kg",
      category: "rice",
      price: 1350,
    },
    {
      id: 8,
      name: "Tibar Basmati Rice",
      images: [
        "./TibarSellaBasmatiRice.png",
        // "/images/TibarRice2.png",
        // "/images/TibarRice3.png",
      ],
      description: "Long grains, rich aroma, perfect fluffiness",
      package: "30kg",
      category: "rice",
      price: 1440,
    },
    {
      id: 9,
      name: "Select Biryani Rice",
      images: [
        "./SelectBiryaniWhiteSella.png",
        // "/images/SelectRice2.png",
        // "/images/SelectRice3.png",
      ],
      description: "Long-grain, aromatic, aged rice for perfect biryani",
      package: "30kg",
      category: "rice",
      price: 1935,
    },
    {
      id: 10,
      name: "Dum Briyani Basmati Rice",
      images: [
        "./PremiumDumBriyani.png",
        // "/images/DumRice2.png",
        // "/images/DumRice3.png",
      ],
      description: "Long grains, aromatic fragrance, fluffy texture",
      package: "30kg",
      category: "rice",
      price: 2325,
    },
    {
      id: 11,
      name: "Mohtarma Biryani Basmati Rice",
      images: [
        "Mohtarma1121XXLBriyaniSpecialBasmatiRice.png",
        // "/images/MohtarmaRice2.png",
        // "/images/MohtarmaRice3.png",
      ],
      description: "Extra-long, aromatic grains for rich biryanis",
      package: "30kg",
      category: "rice",
      price: 2375,
    },
    // Oil Products
    {
      id: 12,
      name: "Kachi Ghani Mustard Oil",
      images: [
        "./KachiGhaniAndMustardOil1kgBottle.jpg",
        "./KachiGhaniAndMustardOil1kg2.webp",
        "./KachiGhaniAndMustardOil1kg1.jpg",
        // "/images/MustardOil3.jpg",
      ],
      description: "Pure cold-pressed mustard oil",
      package: "12×1L",
      category: "mustard-oil",
      price: 3700,
    },
    {
      id: 13,
      name: "Refined Soybean Oil",
      images: [
        "./RefinedSoybeanOil1kgPac.jpg",
        "./RefinedSoybeanOil1kg.jpg",
        // "/images/SoybeanOil3.jpg",
      ],
      description: "Pure refined soybean oil",
      package: "12×1L",
      category: "mustard-oil",
      price: 3700,
    },
    {
      id: 14,
      name: "Refined Soybean Oil",
      images: [
        "./RefinedSoybeanOil5Kg.jpg",
        "./RefinedSoybeanOil15Kg.jpg",
        // "/images/SoybeanOil5L3.jpg",
      ],
      description: "Pure refined soybean oil",
      package: "4×5L",
      category: "mustard-oil",
      price: 3700,
    },
    // Salt Product (25kg)
    {
      id: 15,
      name: "Salt",
      images: [
        "./KoyalSaltImg.jpg",
        //  "/images/Salt2.jpg", "/images/Salt3.jpg"
      ],
      description: "Refined Iodised Salt, rich in minerals",
      package: "25kg",
      category: "salt",
      price: 185,
    },
  ];

  const [filters, setFilters] = useState({
    category: "all",
    searchTerm: "",
  });

  const categories = ["all", "soap", "rice", "mustard-oil", "salt"];

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h2>

      <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

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
