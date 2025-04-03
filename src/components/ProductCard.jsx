import React, { useState } from "react";
import {
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({ product, addToCart }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isSoap = product.category === "Soap";
  const isRice = product.category === "Rice";
  const isMustardOil = product.category === "Mustard-Oil";
  const isSalt = product.category === "Salt";

  const getCompanyName = () => {
    if (isSoap) return "PowerGold";
    if (isRice) return "GateWay of India";
    if (isMustardOil) return "Reliance";
    if (isSalt) return "Koyal";
    return "Brand";
  };

  const colorOptions = [
    { name: "red", label: "Red", hex: "#EF4444" },
    { name: "green", label: "Green", hex: "#10B981" },
    { name: "yellow", label: "Yellow", hex: "#F59E0B" },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleAddToCart = () => {
    if (isSoap && !selectedColor) {
      toast.warning("Please select a color for soap products");
      return;
    }

    setIsAdding(true);

    const cartItem = {
      ...product,
      quantity,
      selectedColor: isSoap ? selectedColor : "",
      selectedSize: isSoap ? product.Size : "",
      displayName: `${product.name}${isSoap ? ` (${product.Size})` : ""}`,
      brand: getCompanyName(),
      image: product.images ? product.images[0] : product.image,
    };

    setTimeout(() => {
      addToCart(cartItem);
      setIsAdding(false);
      setAdded(true);
      toast.success(`${quantity} ${product.name} added to cart!`);

      setTimeout(() => {
        setAdded(false);
        setQuantity(1);
        setSelectedColor("");
      }, 2000);
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100">
      <div className="relative overflow-hidden group">
        {product.images ? (
          <div className="relative">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-60 object-contain p-4"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} className="text-gray-800" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} className="text-gray-800" />
                </button>
              </>
            )}
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-contain p-4"
          />
        )}

        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-green-600" : "bg-gray-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category.split("-").join(" ")}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {getCompanyName()}
          </span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <div className="text-lg font-bold text-green-600">
            ₹{product.price}
          </div>
        </div>

        {isSoap && product.Size && (
          <div className="mb-2">
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
              Size: {product.Size}
            </span>
          </div>
        )}

        {product.package && (
          <div className="mb-2">
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
              Package: {product.package}
            </span>
          </div>
        )}

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
              className="text-green-600 text-xs mt-1 hover:underline flex items-center"
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

        {isSoap && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color:
            </label>
            <div className="flex space-x-3">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
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
        )}

        <div className="mt-1 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity:
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isAdding || added}
              className="w-10 h-10 bg-gray-100 rounded-l-lg border border-gray-300 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isAdding || added}
              className="w-10 h-10 bg-gray-100 rounded-r-lg border border-gray-300 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mb-4 text-sm font-medium text-gray-700 bg-gray-50 p-2 rounded-md">
          Total:{" "}
          <span className="text-green-600 font-bold">
            ₹{(product.price * quantity).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || added}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center font-medium transition-all ${
              added
                ? "bg-green-500 text-white"
                : isAdding
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {added ? (
              <>
                <Check size={18} className="mr-2" />
                Added!
              </>
            ) : isAdding ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
