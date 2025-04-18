import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Search, X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductList({ addToCart }) {
  const products = [
    // Soap Products
    {
      id: 1,
      name: "300gm×20pcs",
      images: ["./300gmX20Cartoon.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "300×20",
      package: "20 Pieces",
      price: 410,
      category: "Saabun",
      available: true,
    },
    {
      id: 2,
      name: "270gm×20pcs",
      images: ["./270X20SoapImg.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "270×20",
      package: "20 Pieces",
      price: 370,
      category: "Saabun",
      available: true,
    },
    {
      id: 3,
      name: "250gm×20pcs",
      images: ["./250X20SoapImg.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "250×20",
      package: "20 Pieces",
      price: 335,
      category: "Saabun",
      available: true,
    },
    {
      id: 4,
      name: "225gm×20pcs",
      images: ["./225gmX20Cartoon.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "225×20",
      package: "20 Pieces",
      price: 300,
      category: "Saabun",
      available: true,
    },
    {
      id: 5,
      name: "190gm×20pcs",
      images: ["./190X20SoapImg.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "190×20",
      package: "20 Pieces",
      price: 270,
      category: "Saabun",
      available: true,
    },
    {
      id: 33,
      name: "150gm×40pcs",
      images: ["./150X20SoapImg.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "150×40",
      package: "40 Pieces",
      price: 410,
      category: "Saabun",
      available: true,
    },
    {
      id: 32,
      name: "140gm×40pcs",
      images: ["./140X20SoapImg.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "140×40",
      package: "40 Pieces",
      price: 380,
      category: "Saabun",
      available: true,
    },
    {
      id: 6,
      name: "120gm×50pcs",
      images: ["./120X50SoapImg.jpg"],
      description: "Clothing washing soap with essential oils",
      Size: "120×50",
      package: "50 Pieces",
      price: 400,
      category: "Saabun",
      available: true,
    },
    // Mustard Oil Products
    {
      id: 12,
      name: "Kachi Ghani Mustard Oil Bottle",
      images: ["./KachiGhaniAndMustardOil1kgBottle.jpg"],
      description: "Pure cold-pressed mustard oil",
      package: "12X1L Bottle",
      price: 1812,
      category: "Sarason-Tel",
      available: true,
    },
    {
      id: 13,
      name: "Kachi Ghani Mustard Oil Packet",
      images: ["./KachiGhaniAndMustardOil1kg2.webp"],
      description: "Pure cold-pressed mustard oil",
      package: "12X1L Packet",
      price: 1776,
      category: "Sarason-Tel",
      available: true,
    },
    {
      id: 14,
      name: "Refined Soybean Oil Bottle",
      images: ["./RefinedSoyabeanOil1KgBottle.jpg"],
      description: "Pure refined soybean oil for cooking",
      package: "12X1L Bottle",
      price: 1716,
      category: "Sarason-Tel",
      available: true,
    },
    {
      id: 15,
      name: "Refined Soybean Oil Packet",
      images: ["./RefinedSoybeanOil1kgPac.jpg"],
      description: "Pure refined soybean oil for cooking",
      package: "12X1L Packet",
      price: 1680,
      category: "Sarason-Tel",
      available: true,
    },
    {
      id: 16,
      name: "Kachi Ghani Mustard Oil Jar",
      images: ["./KachiGhaniAndMustardOil15kg3.jpg"],
      description: "Pure cold-pressed mustard oil",
      package: "4X5L Jar",
      price: 3020,
      category: "Sarason-Tel",
      available: true,
    },
    {
      id: 17,
      name: "Refined Soybean Oil Jar",
      images: ["./RefinedSoybeanOil5Kg.jpg"],
      description: "Pure refined soybean oil for cooking",
      package: "4X5L Jar",
      price: 2800,
      category: "Sarason-Tel",
      available: true,
    },
    {
      id: 29,
      name: "Kachi Ghani Mustard Oil Jar",
      images: ["./RefinedSoybeanOil15kgImg.jpg"],
      description: "Pure cold-pressed mustard oil",
      package: "15L Jar",
      price: 0,
      category: "Sarason-Tel",
      available: false,
    },
    {
      id: 30,
      name: "Refined Soybean Oil Jar",
      images: ["./KachiGhaniMustard15kgImg.jpg"],
      description: "Pure refined soybean oil for cooking",
      package: "15L Jar",
      price: 0,
      category: "Sarason-Tel",
      available: false,
    },
    // Rice Products
    {
      id: 19,
      name: "Tibar Basmati Rice",
      images: ["./IndependentTibar5kgRice.jpg"],
      description: "Premium quality basmati rice",
      package: "5kg Bag",
      price: 425,
      category: "Chaaval",
      companyName: "Reliance",
      available: true,
    },
    {
      id: 7,
      name: "Dubar Basmati Rice",
      images: ["./DubarSellaBasmatiRice.png"],
      description: "Premium quality basmati rice with long grains",
      package: "30kg Bag",
      price: 1350,
      category: "Chaaval",
      available: false,
    },
    {
      id: 8,
      name: "Tibar Sella Rice",
      images: ["./TibarSellaBasmatiRice.png"],
      description: "Golden sella basmati rice for perfect biryani",
      package: "30kg Bag",
      price: 1440,
      category: "Chaaval",
      available: true,
    },
    {
      id: 9,
      name: "Select Biryani Rice",
      images: ["./SelectBiryaniWhiteSella.png"],
      description: "Long-grain, aromatic, aged rice for perfect biryani",
      package: "30kg Bag",
      price: 1935,
      category: "Chaaval",
      available: true,
    },
    {
      id: 10,
      name: "Dum Briyani Basmati Rice",
      images: ["./PremiumDumBriyani.png"],
      description: "Long grains, aromatic fragrance, fluffy texture",
      package: "30kg",
      category: "Chaaval",
      price: 2325,
      available: true,
    },
    {
      id: 11,
      name: "Mohtarma Biryani Basmati Rice",
      images: ["Mohtarma1121XXLBriyaniSpecialBasmatiRice.png"],
      description: "Extra-long, aromatic grains for rich biryanis",
      package: "30kg",
      category: "Chaaval",
      price: 2375,
      available: true,
    },

    // Agarbatti Products
    {
      id: 20,
      name: "Avida Agarbatti",
      images: ["./AvidaImg.png"],
      description: "Premium quality sandalwood incense sticks",
      package: "1 Dozen",
      price: 230,
      category: "Agarbatti",
      companyName: "Shalimar",
      available: true,
    },
    {
      id: 21,
      name: "6InOne Agarbatti",
      images: ["./6inOneImg.png"],
      description: "Soothing rose scented incense sticks",
      package: "1 Bandle/300gm",
      price: 250,
      category: "Agarbatti",
      companyName: "Shalimar",
      available: true,
    },
    {
      id: 26,
      name: "Utsav Agarbatti",
      images: ["./UtsavImg.png"],
      description: "Soothing rose scented incense sticks",
      package: "1 Bandle/400g",
      price: 240,
      category: "Agarbatti",
      companyName: "Shalimar",
      available: true,
    },
    {
      id: 27,
      name: "Zipper Compo Agarbatti",
      images: ["./Zipper6inOne.png"],
      description: "Soothing rose scented incense sticks",
      package: "1 Bandle/300g",
      price: 240,
      category: "Agarbatti",
      companyName: "Shalimar",
      available: true,
    },
    // Salt Products
    {
      id: 18,
      name: "Koyal Iodized Salt",
      images: ["./KoyalSaltImg.jpg"],
      description: "Refined iodized salt for daily cooking",
      package: "25kg Bag",
      price: 185,
      category: "Namak",
      available: true,
    },
    // Daal Products
    {
      id: 22,
      name: "Arhar Daal",
      images: ["./ArharDaalImg.jpg"],
      description: "Premium quality split pigeon peas",
      package: "50kg Bag",
      price: 0,
      category: "Daal",
      companyName: "Tata Sampann",
      available: false,
    },
    {
      id: 23,
      name: "Moong Daal",
      images: ["./MoongDaalImg.jpg"],
      description: "Premium quality yellow split mung beans",
      package: "50kg Bag",
      price: 0,
      category: "Daal",
      companyName: "Tata Sampann",
      available: false,
    },
    {
      id: 24,
      name: "Urad Daal",
      images: ["./UradDaalImg.jpg"],
      description: "High quality split black gram",
      package: "50kg Bag",
      price: 0,
      category: "Daal",
      companyName: "Tata Sampann",
      available: false,
    },
    // Sugar Products
    {
      id: 25,
      name: "Premium White Cheenee",
      images: ["./CheeneeImg.jpg"],
      description: "Fine grain white sugar for cooking and baking",
      package: "50kg Bag",
      price: 0,
      category: "Cheenee",
      companyName: "Tata Sampann",
      available: false,
    },
  ];

  const [filters, setFilters] = useState({
    category: "all",
    searchTerm: "",
  });

  const categories = [
    "all",
    "Saabun",
    "Sarason-Tel",
    "Agarbatti",
    "Chaaval",
    "Namak",
    "Daal",
    "Cheenee",
  ];

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
    <div className="container mx-auto -mt-10" id="products">
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
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium transition-all flex items-center ${
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
