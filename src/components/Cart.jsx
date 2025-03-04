import React, { useState } from "react";
import { X } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

function Cart({ cartItems, closeCart, removeItem, updateQuantity, clearCart }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const initiateCheckout = () => {
    setShowCheckoutForm(true);
  };

  const completeOrder = (customerData) => {
    // Construct order details for WhatsApp message
    const productDetails = cartItems
      .map((item) => {
        if (item.category === "soap") {
          return `${item.name} - Qty: ${item.quantity}, Size: ${item.selectedSize}, Color: ${item.selectedColor}`;
        } else if (["salt", "sugar", "dal"].includes(item.category)) {
          return `${item.name} - Qty: ${item.quantity}, Weight: ${item.selectedWeight}`;
        } else {
          return `${item.name} - Qty: ${item.quantity}`;
        }
      })
      .join("%0A");

    const message = `New Order:%0A
    Name: ${customerData.name}%0A
    Mobile: ${customerData.mobile}%0A
    Village: ${customerData.village}%0A
    Pincode: ${customerData.pincode}%0A
    Products:%0A${productDetails}`;

    const whatsappUrl = `https://wa.me/9060917383?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Clear the cart after sending the order
    clearCart();

    alert("Thank you for your order! We will process it shortly.");
    closeCart();
    setShowCheckoutForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="p-4 flex">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Product specifications based on category */}
                    {item.category === "soap" && (
                      <div className="text-sm text-gray-600">
                        <p>Size: {item.selectedSize}</p>
                        <p>Color: {item.selectedColor}</p>
                      </div>
                    )}

                    {["salt", "sugar", "dal"].includes(item.category) && (
                      <div className="text-sm text-gray-600">
                        <p>Weight: {item.selectedWeight}</p>
                      </div>
                    )}

                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        className="w-8 h-8 border rounded-l flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 border-t border-b flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                        className="w-8 h-8 border rounded-r flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4 mt-auto">
              <button
                onClick={initiateCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition"
              >
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
        />
      )}
    </div>
  );
}

export default Cart;
