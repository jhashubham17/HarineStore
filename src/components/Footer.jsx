// components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white" id="contact">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Harine General Store has been serving quality products since 2000.
              We pride ourselves on offering the best groceries and household
              items.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">
              Near-Brahmasthan, Harine, Harlakhi
            </p>
            <p className="text-gray-300 mb-2">
              Phone: +91 7759958831, 91 8002253121
            </p>
            <p className="text-gray-300">Email: sjha870054@gmail.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <p className="text-gray-300 mb-2">
              Monday to Saturday: 9 AM - 10 PM
            </p>
            <p className="text-gray-300">Sunday: 10 AM - 8 PM</p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.facebook.com/share/16PGXWLmWy/"
                className="text-white hover:text-green-400"
              >
                Facebook
              </a>
              <a href="#" className="text-white hover:text-green-400">
                Instagram
              </a>
              <a href="#" className="text-white hover:text-green-400">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2025 Harine General Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
