import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSwipeable } from "react-swipeable";

function Navbar({ cartItems, toggleCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  console.log("Card Items : ", cartItems);

  return (
    <nav className="bg-green-700 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo and store name */}
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-bold">Sujal General Store</h1>
        </div>

        {/* Right: Cart button */}
        <div>
          <button
            onClick={toggleCart}
            className="relative bg-green-600 p-2 rounded-full hover:bg-green-800 transition"
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
