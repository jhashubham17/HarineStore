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
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [notifyMe, setNotifyMe] = useState(false);

  const isAvailable = product.available !== false;

  const isSaabun = product.category === "Saabun";
  const isSarasonTel = product.category === "Sarason-Tel";
  const isChaaval = product.category === "Chaaval";
  const isNamak = product.category === "Namak";
  const isAgarbatti = product.category === "Agarbatti";
  const isDaal = product.category === "Daal";
  const isCheenee = product.category === "Cheenee";

  const getCompanyName = () => {
    if (isSaabun) return "PowerGold";
    if (isChaaval) return product.companyName || "GateWay of India";
    if (isSarasonTel) return "Reliance";
    if (isNamak) return "Koyal";
    if (isAgarbatti) return product.companyName || "Divine Fragrances";
    if (isDaal) return product.companyName || "Annapurna";
    if (isCheenee) return product.companyName || "Sweetness";
    return "Brand";
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const openFullScreen = () => {
    setShowFullScreen(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullScreen = (e) => {
    if (e) e.stopPropagation();
    setShowFullScreen(false);
    document.body.style.overflow = "auto";
  };

  const getCurrentImage = () => {
    return product.images ? product.images[currentImageIndex] : product.image;
  };

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("This product is currently out of stock");
      return;
    }

    setIsAdding(true);

    const cartItem = {
      ...product,
      cartItemId: product.id || product.name,
      quantity,
      selectedSize: isSaabun ? product.Size : "",
      displayName: `${product.name}${isSaabun ? ` (${product.Size})` : ""}`,
      brand: getCompanyName(),
      image: getCurrentImage(),
    };

    setTimeout(() => {
      addToCart(cartItem);
      setIsAdding(false);
      setAdded(true);

      const successMessage = `${quantity} ${product.name} added to cart!`;
      toast.success(successMessage);

      setTimeout(() => {
        setAdded(false);
        setQuantity(1);
      }, 2000);
    }, 500);
  };

  const handleNotifyMe = () => {
    setNotifyMe(true);
    toast.info(`You will be notified when ${product.name} becomes available`);

    setTimeout(() => {
      setNotifyMe(false);
    }, 2000);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
        <div className="relative group">
          <div className="relative cursor-pointer" onClick={openFullScreen}>
            <img
              src={getCurrentImage()}
              alt={product.name}
              className={`w-full h-64 object-contain p-6 transition-transform duration-300 group-hover:scale-102 ${
                !isAvailable && "opacity-70"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white bg-gray-900/60 px-4 py-1.5 rounded-full text-sm font-medium">
                Zoom Image
              </span>
            </div>

            {/* Centered Out of Stock indicator */}
            {!isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md transform rotate-3">
                  Out of Stock
                </div>
              </div>
            )}

            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} className="text-gray-700" />
                </button>
              </>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-gray-800 scale-125"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-4 right-4 bg-blue-300 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
            {product.category.split("-").join(" ")}
          </div>
          <div className="absolute bottom-4 left-4 bg-blue-300 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
            {getCompanyName()}
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              {product.name}
            </h3>
            <div className="text-xl font-bold text-gray-900">
              {isAvailable ? `₹${product.price}` : "N/A"}
            </div>
          </div>

          {(isSaabun || product.package) && (
            <div className="flex gap-2 mb-3">
              {isSaabun && product.Size && (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  Size: {product.Size}
                </span>
              )}
              {product.package && (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  {product.package}
                </span>
              )}
            </div>
          )}

          <p
            className={`text-gray-500 text-sm mb-4 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {product.description}
          </p>
          {product.description.length > 80 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 text-sm font-medium hover:underline flex items-center mb-4"
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={16} className="ml-1" />
                </>
              )}
            </button>
          )}

          {isAvailable && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isAdding || added}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>
                <span className="w-12 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isAdding || added}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          )}

          {isAvailable && (
            <div className="text-sm font-medium text-gray-600 mb-4">
              Total:{" "}
              <span className="text-gray-900 font-bold">
                ₹{(product.price * quantity).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="mt-auto">
            {isAvailable ? (
              <button
                onClick={handleAddToCart}
                disabled={isAdding || added}
                className={`w-full py-3 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-500 text-white"
                    : isAdding
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    Added to Cart
                  </>
                ) : isAdding ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-gray-500"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNotifyMe}
                disabled={notifyMe}
                className={`w-full py-3 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  notifyMe
                    ? "bg-blue-400 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {notifyMe ? (
                  <>
                    <Check size={16} />
                    Notified
                  </>
                ) : (
                  <>
                    <AlertTriangle size={16} />
                    Notify When Available
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {showFullScreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={closeFullScreen}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={closeFullScreen}
              className="absolute top-6 right-6 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
              aria-label="Close fullscreen"
            >
              <X size={24} className="text-gray-800" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={getCurrentImage()}
                alt={product.name}
                className={`max-w-full max-h-full object-contain ${
                  !isAvailable && "opacity-80"
                }`}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Centered Out of Stock indicator in fullscreen mode */}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transform rotate-3">
                    Out of Stock
                  </div>
                </div>
              )}

              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-6 bg-white/90 rounded-full p-3 shadow-md hover:bg-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-6 bg-white/90 rounded-full p-3 shadow-md hover:bg-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-gray-400"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="absolute bottom-8 left-8 text-white bg-gray-900/60 px-3 py-1 rounded-full text-sm">
              {product.images
                ? `${currentImageIndex + 1} / ${product.images.length}`
                : "1 / 1"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
