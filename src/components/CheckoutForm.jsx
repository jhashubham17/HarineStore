import React, { useState, useEffect } from "react";
import { X, User, Phone, MapPin, Send, Clock } from "lucide-react";

function CheckoutForm({ closeForm, completeOrder, cartItems, totalAmount }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    village: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [suggestion, setSuggestion] = useState(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutForm")) || null;
    setSuggestion(savedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSuggestionClick = () => {
    if (suggestion) {
      setFormData(suggestion);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.village.trim()) {
      newErrors.village = "Village is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Store form data in localStorage
      localStorage.setItem("checkoutForm", JSON.stringify(formData));
      setSuggestion(formData);

      // Pass form data to parent component to handle order completion
      completeOrder(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-2xl animate-fade-in">
        <div className="p-5 border-b flex justify-between items-center bg-gradient-to-r from-green-50 to-white">
          <div className="flex items-center gap-2">
            <MapPin className="text-green-600" size={20} />
            <h2 className="text-xl font-bold text-gray-800">
              Delivery Details
            </h2>
          </div>
          <button
            onClick={closeForm}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Order Summary */}
            <div className="mb-5 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">{cartItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">Order Total:</span>
                <span className="font-bold text-green-600">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Suggestion */}
            {suggestion && (
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-gray-500" />
                  <p className="text-gray-600 text-sm">Use previous details:</p>
                </div>
                <button
                  type="button"
                  onClick={handleSuggestionClick}
                  className="block w-full text-left bg-gray-50 p-3 rounded-lg mb-2 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="font-medium text-gray-800">
                    {suggestion.name}
                  </div>
                  <div className="text-gray-600 text-sm flex flex-wrap gap-2 mt-1">
                    <span>{suggestion.mobile}</span>
                    <span>•</span>
                    <span>
                      {suggestion.village}, {suggestion.pincode}
                    </span>
                  </div>
                </button>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                placeholder="Your Full Name *"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg ${
                  errors.mobile
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                placeholder="10-digit Mobile Number *"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg ${
                  errors.village
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                placeholder="Your Village or Town *"
              />
              {errors.village && (
                <p className="text-red-500 text-xs mt-1">{errors.village}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg ${
                  errors.pincode
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                placeholder="6-digit Pincode *"
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-600 text-white py-3.5 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            <Send size={18} className="mr-1" />
            Place Order via WhatsApp
          </button>

          <p className="text-center mt-4 text-xs text-gray-500">
            By placing your order, you'll be redirected to WhatsApp to confirm.
          </p>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
