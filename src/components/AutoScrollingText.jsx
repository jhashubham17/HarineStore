import React, { useEffect, useRef, useState } from "react";

/**
 * AutoScrollingText Component
 *
 * A component that creates a smooth scrolling text effect (marquee)
 *
 * @param {Object} props
 * @param {string | React.ReactNode} props.children - The content to be scrolled
 * @param {string} [props.direction="left"] - The scroll direction ("left" or "right")
 * @param {number} [props.speed=50] - Scrolling speed (lower is faster)
 * @param {boolean} [props.pauseOnHover=true] - Whether to pause scrolling on hover
 * @param {string} [props.className=""] - Additional CSS classes to apply
 * @param {string} [props.backgroundColor="bg-blue-600"] - Background color class
 * @param {string} [props.textColor="text-white"] - Text color class
 * @param {boolean} [props.gradient=true] - Whether to show fade gradient effects
 */
const AutoScrollingText = ({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  className = "",
  backgroundColor = "bg-blue-600",
  textColor = "text-white",
  gradient = true,
}) => {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);
  const [duplicateContent, setDuplicateContent] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Determine if we need to duplicate content to create continuous scroll
  useEffect(() => {
    if (scrollerRef.current && contentRef.current) {
      const scrollerWidth = scrollerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;

      // Only duplicate if content is smaller than the container
      setDuplicateContent(contentWidth < scrollerWidth * 2);
    }
  }, [children]);

  // Apply animation through CSS variables
  useEffect(() => {
    if (scrollerRef.current && contentRef.current) {
      const contentWidth = contentRef.current.scrollWidth;

      scrollerRef.current.style.setProperty(
        "--animation-duration",
        `${contentWidth / speed}s`
      );
    }
  }, [speed, children, duplicateContent]);

  // Direction-specific classes
  const directionClass = direction === "right" ? "animate-rtl" : "animate-ltr";

  // Gradient colors matching the background
  const gradientStart = gradient
    ? `from-${backgroundColor.replace("bg-", "")}`
    : "";
  const gradientEnd = gradient
    ? `to-${backgroundColor.replace("bg-", "")}/0`
    : "";

  return (
    <div
      className={`relative overflow-hidden ${backgroundColor} ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Scrolling container */}
      <div
        ref={scrollerRef}
        className={`whitespace-nowrap py-2 ${textColor} ${
          isPaused ? "pause-animation" : ""
        }`}
      >
        {/* Animated content */}
        <div
          ref={contentRef}
          className={`inline-block ${directionClass}`}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: "var(--animation-duration)",
          }}
        >
          {children}
        </div>

        {/* Duplicate content for continuous scroll effect */}
        {duplicateContent && (
          <div
            className={`inline-block ${directionClass}`}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
              animationDuration: "var(--animation-duration)",
            }}
          >
            {children}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scrollLeftToRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes scrollRightToLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-ltr {
          animation: scrollRightToLeft linear infinite;
        }

        .animate-rtl {
          animation: scrollLeftToRight linear infinite;
        }
      `}</style>
    </div>
  );
};

/**
 * Demo component showing various usages of AutoScrollingText
 */
const AutoScrollingTextDemo = () => {
  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-bold mb-4">Auto Scrolling Text Examples</h2>
      <div>
        <AutoScrollingText backgroundColor="bg-gray-800">
          <span className="inline-flex items-center gap-4">
            <span className="inline-block h-4 w-4 bg-white rounded-full"></span>
            <span className="font-bold text-blue-400">
              WELCOME TO SUJAL GENERAL STORE
            </span>
            <span className="inline-block h-4 w-4 bg-white rounded-full"></span>

            <span className="font-bold text-pink-400">
              "Sasta Bhi, Achha Bhi – Sujal General Store Se Hi!"
            </span>
            <span className="inline-block h-4 w-4 bg-white rounded-full"></span>
            <span className="font-bold text-yellow-400">NEW ARRIVALS</span>
            <span className="inline-block h-4 w-4 bg-white rounded-full"></span>
            <span className="font-bold text-green-400">FREE SHIPPING</span>
            <span className="inline-block h-4 w-4 bg-white rounded-full"></span>
            <span className="font-bold text-green-400">24 X 7</span>
            <span className="inline-block h-4 w-4 bg-white rounded-full"></span>
            <span className="font-bold text-green-400">ORDER ONLINE NOW</span>
          </span>
        </AutoScrollingText>
      </div>
    </div>
  );
};

export default AutoScrollingTextDemo;
export { AutoScrollingText };
