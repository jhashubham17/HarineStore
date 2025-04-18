import React, { useState } from "react";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  Check,
} from "lucide-react";
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

        if (item.category === "Saabun") {
          productMessage += `   Size: ${item.selectedSize || item.Size}\n`;
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
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl animate-slide-in flex flex-col">
        {/* Header with logo and close button */}
        <div className="p-5 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Truck size={14} />
                <span>Free delivery on orders over ₹500</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <button
              onClick={closeCart}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y overflow-y-auto">
              {/* Free delivery progress bar */}
              {calculateTotal() < 500 && (
                <div className="p-4 bg-green-50 border-b">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck size={18} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {500 - calculateTotal() > 0 ? (
                        <>
                          Add ₹{(500 - calculateTotal()).toFixed(2)} more for
                          free delivery
                        </>
                      ) : (
                        <>You qualify for free delivery!</>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (calculateTotal() / 500) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-none w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                          {item.category === "Saabun" && item.Size && (
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

                      <div className="mt-1">
                        {item.package && (
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600 mb-1 mr-1">
                            {item.package}
                          </span>
                        )}
                        {item.category === "Saabun" && item.Size && (
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                            Size: {item.Size}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center mt-3 justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className={`w-8 h-8 flex items-center justify-center transition-colors ${
                              item.quantity <= 1
                                ? "text-gray-300 cursor-not-allowed"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
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
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
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
              {/* Order summary */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium">
                    {calculateTotal() >= 500 ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Check size={14} /> Free
                      </span>
                    ) : (
                      "₹50.00"
                    )}
                  </span>
                </div>
              </div>

              {/* Total with emphasized design */}
              <div className="flex justify-between items-center mb-6 py-3 border-y border-gray-100">
                <span className="font-semibold text-lg">Total:</span>
                <span className="font-bold text-green-600 text-xl">
                  ₹
                  {(
                    calculateTotal() + (calculateTotal() >= 500 ? 0 : 50)
                  ).toFixed(2)}
                </span>
              </div>

              {/* Checkout button with conditional free delivery message */}
              <button
                onClick={initiateCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Proceed to Checkout
                </span>
              </button>

              {calculateTotal() < 500 && (
                <div className="mt-3 text-center text-sm text-gray-500">
                  Add ₹{(500 - calculateTotal()).toFixed(2)} more to get free
                  delivery
                </div>
              )}
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
          deliveryFee={calculateTotal() >= 500 ? 0 : 50}
          finalTotal={calculateTotal() + (calculateTotal() >= 500 ? 0 : 50)}
          hasQualifiedForFreeDelivery={calculateTotal() >= 500}
          amountToFreeDelivery={Math.max(500 - calculateTotal(), 0)}
          freeDeliveryThreshold={500}
        />
      )}
    </div>
  );
}

export default Cart;
