import React, { useState, useEffect } from "react";

function ProductCard({ product, addToCart }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [displayPrice, setDisplayPrice] = useState(product.price);

  // Check product category
  const isSoap = product.category === "soap";
  const isWeightedProduct = ["salt", "sugar", "dal"].includes(product.category);

  // Soap price mapping based on size
  const soapPrices = {
    "300×20": 415,
    "270×20": 370,
    "240×20": 335,
    "225×20": 300,
    "190×20": 270,
    "115×50": 400,
  };

  // Update price when size changes for soap products
  useEffect(() => {
    if (isSoap && selectedSize) {
      setDisplayPrice(soapPrices[selectedSize]);
    } else {
      setDisplayPrice(product.price);
    }
  }, [selectedSize, isSoap, product.price]);

  // Handle adding product to cart with selections
  const handleAddToCart = () => {
    if (isSoap) {
      if (!selectedSize || !selectedColor) {
        alert("Please select both size and color for soap products");
        return;
      }

      // Add soap to cart with the selected options and price
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity,
        price: soapPrices[selectedSize],
      });
    } else if (isWeightedProduct) {
      if (!selectedWeight) {
        alert("Please select weight");
        return;
      }

      // Add weighted product to cart
      addToCart({
        ...product,
        selectedWeight,
        quantity,
      });
    } else {
      // For other products
      addToCart({
        ...product,
        quantity,
      });
    }
    setQuantity(1);
    setSelectedColor("");
    setSelectedSize("");
    setSelectedWeight("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="text-lg font-bold text-green-700">
            ₹{displayPrice}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>

        {isSoap ? (
          <div className="space-y-3 mb-3">
            {/* Size selection for soap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="">Select Size</option>
                <option value="300×20">300×20 - ₹415</option>
                <option value="270×20">270×20 - ₹370</option>
                <option value="240×20">240×20 - ₹335</option>
                <option value="225×20">225×20 - ₹300</option>
                <option value="190×20">190×20 - ₹270</option>
                <option value="115×50">110×50 - ₹400</option>
              </select>
            </div>

            {/* Color selection for soap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color:
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedColor("red")}
                  className={`w-8 h-8 rounded-full bg-red-500 border-2 ${
                    selectedColor === "red"
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  aria-label="Red"
                ></button>
                <button
                  type="button"
                  onClick={() => setSelectedColor("green")}
                  className={`w-8 h-8 rounded-full bg-green-500 border-2 ${
                    selectedColor === "green"
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  aria-label="Green"
                ></button>
                <button
                  type="button"
                  onClick={() => setSelectedColor("yellow")}
                  className={`w-8 h-8 rounded-full bg-yellow-400 border-2 ${
                    selectedColor === "yellow"
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  aria-label="Yellow"
                ></button>
              </div>
            </div>
          </div>
        ) : isWeightedProduct ? (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight:
            </label>
            <select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="25kg">25kg</option>
              {/* <option value="50kg">50kg</option> */}
            </select>
          </div>
        ) : null}

        {/* Quantity selector for all products */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity:
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 border rounded-l flex items-center justify-center"
            >
              -
            </button>
            <span className="w-10 h-8 border-t border-b flex items-center justify-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 border rounded-r flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {isSoap && selectedSize && (
          <div className="mb-3 text-sm text-gray-700">
            Total: ₹{(displayPrice * quantity).toFixed(2)}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
