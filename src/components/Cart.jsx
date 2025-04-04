import React, { useState } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

function Cart({ cartItems, closeCart, removeItem, updateQuantity, clearCart }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const initiateCheckout = () => {
    setShowCheckoutForm(true);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price || 0) * item.quantity;
    }, 0);
  };

  const completeOrder = (customerData) => {
    const productDetails = cartItems
      .map((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        const pricePerUnit = item.price.toFixed(2);
        const itemNumber = index + 1;

        let productMessage = `${itemNumber}. ${item.name}\n`;
        productMessage += `   Quantity: ${item.quantity}\n`;
        productMessage += `   Package: ${item.package}\n`;

        if (item.category === "Soap") {
          // Always include size information for soaps
          productMessage += `   Size: ${item.selectedSize || item.Size}\n`;

          // Only include color if it was selected
          if (item.selectedColor) {
            productMessage += `   Color: ${item.selectedColor}\n`;
          }
        }

        productMessage += `   Price: ₹${pricePerUnit}\n`;
        productMessage += `   Total: ₹${itemTotal}`;

        return productMessage;
      })
      .join("\n\n");

    const totalAmount = calculateTotal().toFixed(2);

    const message = `New Order:
Name: ${customerData.name}
Mobile: ${customerData.mobile}
Village: ${customerData.village}
Pincode: ${customerData.pincode}

Products:
${productDetails}

Total Order Amount: ₹${totalAmount}`;

    const whatsappUrl = `https://wa.me/9060917383?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    alert("Thank you for your order! We will process it shortly.");
    closeCart();
    setShowCheckoutForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end backdrop-blur-sm transition-all duration-300">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl animate-slide-in">
        <div className="p-5 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-green-600" size={20} />
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center h-64">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <button
              onClick={closeCart}
              className="mt-4 text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-none w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                          {item.category === "Soap" && item.Size && (
                            <span className="ml-1 text-sm text-gray-600">
                              ({item.Size})
                            </span>
                          )}
                        </h3>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="text-sm text-gray-600 mt-1">
                        {item.package && (
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                            {item.package}
                          </span>
                        )}
                        {item.category === "Soap" && (
                          <div className="flex gap-2 mt-1">
                            {item.selectedSize && (
                              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                Size: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                Color: {item.selectedColor}
                              </span>
                            )}
                          </div>
                        )}
                        <p className="font-semibold mt-2 text-gray-700">
                          ₹{item.price}{" "}
                          {item.category === "Soap" ? "each" : "per unit"}
                        </p>
                      </div>

                      <div className="flex items-center mt-3 justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-green-600 font-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-5 mt-auto shadow-lg">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="font-semibold text-lg">Total:</span>
                <span className="font-bold text-green-600 text-lg">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={initiateCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {showCheckoutForm && (
        <CheckoutForm
          closeForm={() => setShowCheckoutForm(false)}
          completeOrder={completeOrder}
          cartItems={cartItems}
          totalAmount={calculateTotal()}
        />
      )}
    </div>
  );
}

export default Cart;
