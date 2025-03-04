// components/Hero.jsx
import React from "react";

function Hero() {
  return (
    <div className="bg-gradient-to-r from-green-700 to-green-700 text-white h-full ">
      <div className="container px-4 py-12 md:py-24 flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 mt-14 flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to, <br /> Harine General Store
          </h2>
          <p className="text-lg mb-6">
            Your one-stop shop for quality groceries and household essentials
          </p>
          <a
            href="#products"
            className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-100 transition w-36"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
