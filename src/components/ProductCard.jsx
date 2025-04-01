import React, { useState, useEffect } from "react";
import {
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";

function ProductCard({ product, addToCart }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [displayPrice, setDisplayPrice] = useState(product.price || 0);
  const [expanded, setExpanded] = useState(false);

  // Check product category and specific product
  const isSoap = product.category === "soap";
  const isWeightedProduct = ["salt", "rice"].includes(product.category);
  const isMustardOil = product.category === "mustard-oil";
  const isFixedUnitProduct = isWeightedProduct || isMustardOil;

  // Define company names based on product ID or other criteria
  const getCompanyName = () => {
    // Map company names based on product id or other logic
    const companyMap = {
      1: "Power Gold",
      3: "GateWay Of India",
      4: "GateWay Of India",
      5: "GateWay Of India",
      6: "GateWay Of India",
      7: "GateWay Of India",
      9: "relience",
      10: "Koyal",
    };

    return companyMap[product.id] || "Brand";
  };

  // Product variations and pricing
  const soapPrices = {
    "300×20": 415,
    "270×20": 370,
    "240×20": 335,
    "225×20": 300,
    "190×20": 270,
    "115×50": 400,
  };

  const weightOptions = {
    salt: [{ value: "25kg", label: "25kg", price: product.price }],
    rice: [{ value: "30kg", label: "30kg", price: product.price }],
  };

  const mustardOilOptions = [
    { value: "25L", label: "25 Liters", price: product.price || 2800 },
  ];

  const colorOptions = [
    { name: "red", label: "Red", hex: "#EF4444" },
    { name: "green", label: "Green", hex: "#10B981" },
    { name: "yellow", label: "Yellow", hex: "#F59E0B" },
  ];

  // Auto-select default options
  useEffect(() => {
    if (isWeightedProduct) {
      const defaultWeight = product.category === "rice" ? "30kg" : "25kg";
      setSelectedWeight(defaultWeight);
    }
    if (isMustardOil) {
      setSelectedVolume("25L");
    }
  }, [product.category, isWeightedProduct, isMustardOil]);

  // Update price when selection changes
  useEffect(() => {
    if (isSoap && selectedSize) {
      setDisplayPrice(soapPrices[selectedSize]);
    } else if (isWeightedProduct && selectedWeight) {
      const option = weightOptions[product.category]?.find(
        (opt) => opt.value === selectedWeight
      );
      setDisplayPrice(option?.price || product.price);
    } else if (isMustardOil && selectedVolume) {
      const option = mustardOilOptions.find(
        (opt) => opt.value === selectedVolume
      );
      setDisplayPrice(option?.price || product.price);
    } else {
      setDisplayPrice(product.price || 0);
    }
  }, [selectedSize, selectedWeight, selectedVolume, product]);

  const handleAddToCart = () => {
    if (isSoap) {
      if (!selectedSize || !selectedColor) {
        alert("Please select both size and color for soap products");
        return;
      }
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity,
        price: soapPrices[selectedSize],
      });
    } else if (isWeightedProduct) {
      const option = weightOptions[product.category]?.find(
        (opt) => opt.value === selectedWeight
      );
      addToCart({
        ...product,
        selectedWeight,
        quantity,
        price: option?.price || product.price,
      });
    } else if (isMustardOil) {
      const option = mustardOilOptions.find(
        (opt) => opt.value === selectedVolume
      );
      addToCart({
        ...product,
        selectedVolume,
        quantity,
        price: option?.price || product.price,
      });
    } else {
      addToCart({
        ...product,
        quantity,
      });
    }

    // Reset selections after adding to cart
    setQuantity(1);
    setSelectedColor("");
    setSelectedSize("");
    if (!isWeightedProduct) {
      setSelectedWeight("");
    }
    setSelectedVolume("");
  };

  // Determine if we should show the total price calculation
  const showTotalCalculation =
    ((isSoap && selectedSize) || isFixedUnitProduct) && displayPrice;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100">
      {/* Product image with category badge and company badge */}
      <div className="relative overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category badge (right side) */}
        <div className="absolute top-3 right-3">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category.split("-").join(" ")}
          </span>
        </div>
        {/* Company badge (left side) */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {getCompanyName()}
          </span>
        </div>
      </div>

      {/* Product details */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          {displayPrice && (
            <div className="text-lg font-bold text-green-600">
              ₹{displayPrice}
            </div>
          )}
        </div>

        {/* Description with expand/collapse */}
        <div className="mb-4">
          <p
            className={`text-gray-600 text-sm ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {product.description}
          </p>
          {product.description.length > 60 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-green-600 text-xs mt-1 hover:underline focus:outline-none flex items-center"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp size={14} className="ml-1" />
                </>
              ) : (
                <>
                  Read more <ChevronDown size={14} className="ml-1" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Product options */}
        <div className="space-y-4 mb-4">
          {/* Soap options */}
          {isSoap && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size:
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Size</option>
                  {Object.entries(soapPrices).map(([size, price]) => (
                    <option key={size} value={size}>
                      {size} - ₹{price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color:
                </label>
                <div className="flex space-x-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        selectedColor === color.name
                          ? "ring-2 ring-offset-2 ring-gray-800"
                          : "ring-1 ring-gray-200"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.label}
                    >
                      {selectedColor === color.name && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Fixed unit products display */}
          {isFixedUnitProduct && (
            <div>
              <div className="inline-flex bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {isWeightedProduct &&
                  `Package: ${product.category === "rice" ? "30kg" : "25kg"}`}
                {isMustardOil && "Package: 25 Liters"}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-100 rounded-l-lg border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Minus size={18} className="text-gray-600" />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 h-10 border-t border-b border-gray-300 text-center text-sm"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-100 rounded-r-lg border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Plus size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Total price calculation */}
        {showTotalCalculation && displayPrice && (
          <div className="mb-4 text-sm font-medium text-gray-700 bg-gray-50 p-2 rounded-md">
            Total:{" "}
            <span className="text-green-600 font-bold">
              ₹{(displayPrice * quantity).toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Add to cart button */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
