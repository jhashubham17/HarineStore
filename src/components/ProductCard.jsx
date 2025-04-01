import React, { useState, useEffect } from "react";

function ProductCard({ product, addToCart }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [displayPrice, setDisplayPrice] = useState(product.price);
  const [expanded, setExpanded] = useState(false);

  // Check product category
  const isSoap = product.category === "soap";
  const isWeightedProduct = ["salt", "rice"].includes(product.category);
  const isWashingPowder = product.category === "washing-powder";
  const isMustardOil = product.category === "mustard-oil";

  // Auto-select weights for rice and salt
  useEffect(() => {
    if (isWeightedProduct) {
      setSelectedWeight(product.category === "rice" ? "30kg" : "25kg");
    }
  }, [product.category, isWeightedProduct]);

  // Price mappings
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
    "washing-powder": [
      { value: "1kg", label: "1kg", price: 120 },
      { value: "5kg", label: "5kg", price: 550 },
      { value: "10kg", label: "10kg", price: 1000 },
    ],
  };

  const mustardOilOptions = [
    { value: "1L", label: "1 Liter", price: 200 },
    { value: "5L", label: "5 Liters", price: 950 },
    { value: "15L", label: "15 Liters", price: 2800 },
  ];

  // Update price when selection changes
  useEffect(() => {
    if (isSoap && selectedSize) {
      setDisplayPrice(soapPrices[selectedSize]);
    } else if (isWashingPowder && selectedWeight) {
      const option = weightOptions["washing-powder"].find(
        (opt) => opt.value === selectedWeight
      );
      setDisplayPrice(option?.price || product.price);
    } else if (isWeightedProduct && selectedWeight) {
      const option = weightOptions[product.category].find(
        (opt) => opt.value === selectedWeight
      );
      setDisplayPrice(option?.price || product.price);
    } else if (isMustardOil && selectedVolume) {
      const option = mustardOilOptions.find(
        (opt) => opt.value === selectedVolume
      );
      setDisplayPrice(option?.price || product.price);
    } else {
      setDisplayPrice(product.price);
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
    } else if (isWashingPowder || isWeightedProduct) {
      if (!selectedWeight) {
        alert(`Please select ${isWashingPowder ? "size" : "weight"}`);
        return;
      }
      const options = isWashingPowder
        ? weightOptions["washing-powder"]
        : weightOptions[product.category];
      const option = options.find((opt) => opt.value === selectedWeight);
      addToCart({
        ...product,
        selectedWeight,
        quantity,
        price: option?.price || product.price,
      });
    } else if (isMustardOil) {
      if (!selectedVolume) {
        alert("Please select volume for mustard oil");
        return;
      }
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

    // Reset selections
    setQuantity(1);
    setSelectedColor("");
    setSelectedSize("");
    if (!isWeightedProduct) {
      setSelectedWeight("");
    }
    setSelectedVolume("");
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  // Determine if we should show the total price calculation
  const showTotalCalculation =
    (isSoap && selectedSize) ||
    (isWashingPowder && selectedWeight) ||
    isWeightedProduct ||
    (isMustardOil && selectedVolume);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-contain"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            {product.category.split("-").join(" ")}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1 sm:mb-2">
          <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>
          <div className="text-base sm:text-lg font-bold text-green-700">
            ₹{displayPrice}
          </div>
        </div>
        <div className="mb-2 sm:mb-3">
          <p
            className={`text-gray-600 text-xs sm:text-sm ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {product.description}
          </p>
          {product.description.length > 60 && (
            <button
              onClick={toggleDescription}
              className="text-green-600 text-xs mt-1 hover:underline focus:outline-none"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {isSoap ? (
          <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-3">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Size:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-1 sm:p-2 border rounded text-xs sm:text-sm"
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
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Color:
              </label>
              <div className="flex space-x-2">
                {["red", "green", "yellow"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={color.charAt(0).toUpperCase() + color.slice(1)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : isWashingPowder ? (
          <div className="mb-2 sm:mb-3">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Size:
            </label>
            <select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full p-1 sm:p-2 border rounded text-xs sm:text-sm"
            >
              <option value="">Select Size</option>
              {weightOptions["washing-powder"].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - ₹{option.price}
                </option>
              ))}
            </select>
          </div>
        ) : isWeightedProduct ? (
          <div className="mb-2 sm:mb-3">
            <div className="text-xs sm:text-sm font-medium text-gray-700">
              {product.category === "rice" ? "30kg" : "25kg"}
            </div>
          </div>
        ) : isMustardOil ? (
          <div className="mb-2 sm:mb-3">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Volume:
            </label>
            <select
              value={selectedVolume}
              onChange={(e) => setSelectedVolume(e.target.value)}
              className="w-full p-1 sm:p-2 border rounded text-xs sm:text-sm"
            >
              <option value="">Select Volume</option>
              {mustardOilOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - ₹{option.price}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="mb-2 sm:mb-3 mt-auto">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Quantity:
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 sm:w-8 sm:h-8 border rounded-l flex items-center justify-center text-xs sm:text-sm"
            >
              -
            </button>
            <span className="w-8 sm:w-10 h-6 sm:h-8 border-t border-b flex items-center justify-center text-xs sm:text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 sm:w-8 sm:h-8 border rounded-r flex items-center justify-center text-xs sm:text-sm"
            >
              +
            </button>
          </div>
        </div>

        {showTotalCalculation && (
          <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-gray-700">
            Total: ₹{(displayPrice * quantity).toFixed(2)}
          </div>
        )}

        <div className="flex justify-end mt-auto">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
