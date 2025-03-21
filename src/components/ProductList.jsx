import React, { useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ addToCart }) {
  const products = [
    {
      id: 1,
      name: "Clothing Soap",
      image: "./soap.avif",
      description: "Clothing Washing soap with essential oils",
      category: "soap",
      // price: 300, // Default price, will be updated based on size selection
    },
    {
      id: 2,
      name: "Salt",
      image: "./salt.jpeg",
      description: "Pure salt, rich in minerals",
      category: "salt",
      price: 250, // Example price for salt
    },
    // {
    //   id: 3,
    //   name: "Premium Sugar",
    //   image: "./sugar.jpg",
    //   description: "Fine grain premium quality sugar",
    //   category: "sugar",
    //   price: 180,
    // },
    // {
    //   id: 4,
    //   name: "Organic Toor Dal",
    //   image: "./ToorDal.jpeg",
    //   description: "Organic yellow split pigeon peas (toor dal)",
    //   category: "dal",
    //   price: 220,
    // },
    // {
    //   id: 5,
    //   name: "Organic Moong Dal",
    //   image: "MoongDal.webp",
    //   description: "Organic split mung beans (moong dal)",
    //   category: "dal",
    //   price: 240,
    // },
    // {
    //   id: 6,
    //   name: "Premium Salt",
    //   image: "./premiumSalt.jpeg",
    //   description: "Natural rock salt for cooking",
    //   category: "salt",
    //   price: 280,
    // },
  ];

  const [filters, setFilters] = useState({
    category: "all",
    searchTerm: "",
  });

  const categories = [
    "all",
    "soap",
    "salt",
    //  "sugar", "dal"
  ];

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
    <div className="container mx-auto px-4 py-12" id="products">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex overflow-x-auto mb-4 md:mb-0 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilters({ ...filters, category })}
              className={`px-4 py-2 mr-2 rounded-full capitalize whitespace-nowrap ${
                filters.category === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
          />
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
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            No products found. Try different filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
