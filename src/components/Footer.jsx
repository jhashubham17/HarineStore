import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribeStatus({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    // In a real application, you would send this data to your backend
    // This is a simple simulation of the subscription process
    setTimeout(() => {
      setSubscribeStatus({
        success: true,
        message: "Thank you for subscribing!",
      });
      setEmail(""); // Clear the input after successful subscription
    }, 500);

    // You would typically have code like this:
    // fetch('/api/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setSubscribeStatus({ success: true, message: "Thank you for subscribing!" });
    //   setEmail("");
    // })
    // .catch(error => {
    //   setSubscribeStatus({ success: false, message: "Subscription failed. Please try again." });
    // });
  };

  return (
    <footer className="bg-gray-900 text-white" id="contact">
      <div className="container mx-auto px-6 py-12">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">
              Sujal General Store
            </h2>
            <p className="text-gray-400">
              Quality products for your everyday needs
            </p>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-0">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {subscribeStatus && (
                  <div
                    className={`absolute mt-1 text-xs ${
                      subscribeStatus.success
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {subscribeStatus.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center text-sm"
              >
                <Send size={16} className="mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              About Us
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Harine General Store has been serving quality products since 2000.
              We pride ourselves on offering the best groceries and household
              items at competitive prices.
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-400 mb-2">
                Our Mission
              </h4>
              <p className="text-xs text-gray-400">
                To provide high-quality products with exceptional service to our
                community.
              </p>
            </div>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-green-400 mr-3 mt-1 flex-shrink-0"
                />
                <span className="text-gray-400">
                  Near-Brahmasthan, Harine, Harlakhi
                </span>
              </li>
              <li className="flex items-start">
                <Phone
                  size={18}
                  className="text-green-400 mr-3 mt-1 flex-shrink-0"
                />
                <div className="text-gray-400">
                  <p>+91 7759958831</p>
                  <p>+91 8002253121</p>
                  <p>+91 9060917383</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail
                  size={18}
                  className="text-green-400 mr-3 mt-1 flex-shrink-0"
                />
                <span className="text-gray-400">sjha870054@gmail.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="https://g.co/kgs/qtvAdYk"
                className="inline-flex items-center text-sm text-green-400 hover:text-green-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="border-b border-green-400">
                  View on Google Maps
                </span>
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Hours & Social section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Opening Hours
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Clock
                  size={18}
                  className="text-green-400 mr-3 mt-1 flex-shrink-0"
                />
                <div className="text-gray-400">
                  <p className="font-medium">Monday to Saturday</p>
                  <p>9:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start pl-7">
                <div className="text-gray-400">
                  <p className="font-medium">Sunday</p>
                  <p>10:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-green-400">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/16PGXWLmWy/"
                className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} className="text-green-400" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded-full"
              >
                <Instagram size={20} className="text-green-400" />
              </a>
              <a
                href="https://wa.me/917759958831"
                className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-400"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M8 13h8" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2025 Sujal General Store. All rights reserved.</p>
          <div className="mt-3 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
