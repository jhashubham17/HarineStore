import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function CheckoutForm({ closeForm, completeOrder, cartItems, total }) {
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

      // Construct product details for WhatsApp message
      const productDetails = cartItems
        .map((item) => {
          if (item.category === "soap") {
            return `{${item.name} - Qty: ${item.quantity}, Size: ${item.selectedSize}, Color: ${item.selectedColor}}`;
          } else if (["salt", "sugar", "dal"].includes(item.category)) {
            return `{${item.name} - Qty: ${item.quantity}, Weight: ${item.selectedWeight}}`;
          } else {
            return `{${item.name} - Qty: ${item.quantity}}`;
          }
        })
        .join("\n");

      const message = `New Order:
      Name: ${formData.name}
      Mobile: ${formData.mobile}
      Village: ${formData.village}
      Pincode: ${formData.pincode}
      Products: \n${productDetails}`;

      const whatsappUrl = `https://wa.me/9060917383?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");

      completeOrder(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Complete Your Order</h2>
          <button
            onClick={closeForm}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Suggestion */}
            {suggestion && (
              <div className="mb-2">
                <p className="text-gray-500 text-sm mb-1">
                  Use previous details:
                </p>
                <button
                  onClick={handleSuggestionClick}
                  className="block w-full text-left bg-gray-100 p-2 rounded-md mb-1 hover:bg-gray-200"
                >
                  {suggestion.name} - {suggestion.mobile}
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Village/Town *
              </label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.village ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your village or town"
              />
              {errors.village && (
                <p className="text-red-500 text-xs mt-1">{errors.village}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="6-digit pincode"
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition mt-6"
          >
            Place Order & Contact on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
