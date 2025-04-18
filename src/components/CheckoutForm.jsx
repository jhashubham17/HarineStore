import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Send,
  Clock,
  Truck,
  Check,
  Gift,
} from "lucide-react";

function CheckoutForm({
  closeForm,
  completeOrder,
  cartItems,
  totalAmount,
  deliveryFee,
  finalTotal,
  hasQualifiedForFreeDelivery,
  amountToFreeDelivery,
  freeDeliveryThreshold,
}) {
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
      {/* Close button outside the form */}
      <button
        onClick={closeForm}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
        aria-label="Close form"
      >
        <X size={20} className="text-gray-600" />
      </button>

      <div className="bg-white w-full max-w-sm rounded-xl overflow-hidden shadow-2xl animate-fade-in mx-4">
        <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-green-50 to-white">
          <div className="flex items-center gap-2">
            <MapPin className="text-green-600" size={18} />
            <h2 className="text-lg font-bold text-gray-800">
              Delivery Details
            </h2>
          </div>
          <button
            onClick={closeForm}
            className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Free Delivery Banner - Smaller version */}
            {hasQualifiedForFreeDelivery ? (
              <div className="bg-green-50 p-2 rounded-lg border border-green-100 flex items-center gap-2">
                <Gift size={16} className="text-green-600" />
                <p className="font-medium text-green-700 text-xs flex items-center gap-1">
                  <Check size={12} /> Free Delivery Applied!
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1 mb-1">
                  <Truck size={14} className="text-gray-600" />
                  <p className="font-medium text-gray-700 text-xs">
                    Add ₹{amountToFreeDelivery.toFixed(2)} more for free
                    delivery
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div
                    className="bg-green-600 h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(
                        (totalAmount / freeDeliveryThreshold) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Order Summary - Smaller version */}
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium text-right">
                  {cartItems.length}
                </span>

                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-right">
                  ₹{totalAmount.toFixed(2)}
                </span>

                <span className="text-gray-600">Delivery:</span>
                {hasQualifiedForFreeDelivery ? (
                  <span className="font-medium text-green-600 flex items-center justify-end gap-1">
                    <Check size={12} /> Free
                  </span>
                ) : (
                  <span className="font-medium text-right">
                    ₹{deliveryFee.toFixed(2)}
                  </span>
                )}

                <span className="font-medium text-gray-800 pt-1 border-t border-gray-200 mt-1">
                  Total:
                </span>
                <span className="font-bold text-green-600 text-right pt-1 border-t border-gray-200 mt-1">
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Suggestion - More compact */}
            {suggestion && (
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Clock size={12} className="text-gray-500" />
                  <p className="text-gray-600 text-xs">Use previous details:</p>
                </div>
                <button
                  type="button"
                  onClick={handleSuggestionClick}
                  className="block w-full text-left bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 text-sm"
                >
                  <div className="font-medium text-gray-800">
                    {suggestion.name}
                  </div>
                  <div className="text-gray-600 text-xs flex flex-wrap gap-1 mt-0.5">
                    <span>{suggestion.mobile}</span>
                    <span>•</span>
                    <span>
                      {suggestion.village}, {suggestion.pincode}
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* Form Fields - More compact */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <User size={14} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  } focus:outline-none focus:ring-1 focus:ring-opacity-50 transition-colors`}
                  placeholder="Your Full Name *"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <Phone size={14} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg ${
                    errors.mobile
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  } focus:outline-none focus:ring-1 focus:ring-opacity-50 transition-colors`}
                  placeholder="10-digit Mobile Number *"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.mobile}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <MapPin size={14} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg ${
                    errors.village
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  } focus:outline-none focus:ring-1 focus:ring-opacity-50 transition-colors`}
                  placeholder="Your Village or Town *"
                />
                {errors.village && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.village}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <MapPin size={14} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg ${
                    errors.pincode
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  } focus:outline-none focus:ring-1 focus:ring-opacity-50 transition-colors`}
                  placeholder="6-digit Pincode *"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Button - More compact */}
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <Send size={16} className="mr-1" />
            Place Order via WhatsApp{" "}
            {hasQualifiedForFreeDelivery && "• Free Delivery"}
          </button>

          <p className="text-center mt-3 text-xs text-gray-500">
            By placing your order, you'll be redirected to WhatsApp to confirm.
          </p>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
