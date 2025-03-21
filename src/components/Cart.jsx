import React, { useState } from "react";
import { X } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

function Cart({ cartItems, closeCart, removeItem, updateQuantity, clearCart }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const initiateCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const completeOrder = (customerData) => {
    // Construct product details for WhatsApp message with numbering
    const productDetails = cartItems
      .map((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        const pricePerUnit = item.price.toFixed(2);
        const itemNumber = index + 1; // Add 1 to make it 1-based instead of 0-based

        if (item.category === "soap") {
          return `${itemNumber}. ${item.name} - Qty: ${item.quantity}, Size: ${item.selectedSize}, Color: ${item.selectedColor}, Price: ₹${pricePerUnit}/each, Total: ₹${itemTotal}`;
        } else if (["salt", "sugar", "dal"].includes(item.category)) {
          return `${itemNumber}. ${item.name} - Qty: ${item.quantity}, Weight: ${item.selectedWeight}, Price: ₹${pricePerUnit}/pack, Total: ₹${itemTotal}`;
        } else {
          return `${itemNumber}. ${item.name} - Qty: ${item.quantity}, Price: ₹${pricePerUnit}/unit, Total: ₹${itemTotal}`;
        }
      })
      .join("\n");

    const totalAmount = calculateTotal().toFixed(2);

    // Create WhatsApp message with proper line breaks and formatting
    const message = `New Order:
Name: ${customerData.name}
Mobile: ${customerData.mobile}
Village: ${customerData.village}
Pincode: ${customerData.pincode}
Products:
${productDetails}

Total Order Amount: ₹${totalAmount}`;

    // Open WhatsApp with the encoded message
    const whatsappUrl = `https://wa.me/7759958831?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    // Clear the cart after sending the order
    clearCart();

    // Close forms and notify user
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
              {cartItems.map((item, index) => (
                <div key={item.cartItemId} className="p-4 flex">
                  <div className="flex-none w-6 text-gray-500 font-medium">
                    {index + 1}.
                  </div>
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
                        <p className="font-semibold">Price: ₹{item.price}</p>
                      </div>
                    )}

                    {["salt", "sugar", "dal"].includes(item.category) && (
                      <div className="text-sm text-gray-600">
                        <p>Weight: {item.selectedWeight}</p>
                        <p className="font-semibold">Price: ₹{item.price}</p>
                      </div>
                    )}

                    <div className="flex items-center mt-2 justify-between">
                      <div className="flex items-center">
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
                      <div className="text-green-700 font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4 mt-auto">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-green-700">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
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
          totalAmount={calculateTotal()}
        />
      )}
    </div>
  );
}

export default Cart;
