import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    // Generate a unique cart item ID based on product options
    const cartItemId =
      product.category === "soap"
        ? `${product.id}-${product.selectedSize}-${product.selectedColor}`
        : ["salt", "sugar", "dal"].includes(product.category)
        ? `${product.id}-${product.selectedWeight}`
        : `${product.id}`;

    // Check if the item with these specific options already exists in cart
    const existingItem = cart.find(
      (item) =>
        item.category === product.category && item.cartItemId === cartItemId
    );

    const existingColor = cart.find(
      (item) =>
        item.category === product.category &&
        item.cartItemId === cartItemId &&
        item.selectedColor === product.selectedColor
    );

    if (existingItem) {
      // Update quantity if item already exists
      if (existingColor) {
        setCart(
          cart.map((item) => {
            if (
              item.cartItemId === cartItemId &&
              item.selectedColor === product.selectedColor
            ) {
              return { ...item, quantity: item.quantity + product.quantity };
            }
            return item;
          })
        );
      } else {
        setCart(
          cart.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          )
        );
      }
    } else {
      // Add new item with the cartItemId
      setCart([
        ...cart,
        { ...product, cartItemId, quantity: product.quantity || 1 },
      ]);
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]); // Clear the cart by setting it to an empty array
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  console.log("Carts : ", cart);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItems={cart} toggleCart={() => setShowCart(!showCart)} />
      <main className="flex-grow pt-16">
        <Hero />
        <ProductList addToCart={addToCart} />
        {showCart && (
          <Cart
            cartItems={cart}
            closeCart={() => setShowCart(false)}
            removeItem={removeFromCart}
            updateQuantity={updateQuantity}
            clearCart={clearCart} // Pass clearCart to Cart
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
