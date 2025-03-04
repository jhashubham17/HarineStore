import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSwipeable } from "react-swipeable";

function Navbar({ cartItems, toggleCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  console.log("Card Items : ", cartItems);

  // Swipe handlers for mobile menu
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setMobileMenuOpen(false), // Close menu on swipe left
    onSwipedRight: () => setMobileMenuOpen(true), // Open menu on swipe right
    trackMouse: true, // Enable mouse swipe for desktop testing
  });

  return (
    <nav className="bg-green-700 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Menu button (mobile) or nav links (desktop) */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="p-2 focus:outline-none">
            <Menu size={24} />
          </button>
        </div>

        <div className="hidden lg:flex items-center">
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-green-200">
                Home
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-green-200">
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-green-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-green-200">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Center: Logo and store name */}
        <div className="flex items-center space-x-2 mx-auto absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-bold">Harine General Store</h1>
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

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          {...swipeHandlers} // Add swipe handlers to the overlay
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        >
          <div className="bg-green-800 h-full w-64 p-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={toggleMobileMenu}>
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="block py-2 hover:bg-green-700 px-4 rounded"
                  onClick={toggleMobileMenu}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="block py-2 hover:bg-green-700 px-4 rounded"
                  onClick={toggleMobileMenu}
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 hover:bg-green-700 px-4 rounded"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block py-2 hover:bg-green-700 px-4 rounded"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
