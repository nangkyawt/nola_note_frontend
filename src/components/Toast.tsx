/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  // Use a numeric offset for the 'slide' to get pixel-perfect control
  const [slideOffset, setSlideOffset] = useState("120%"); // Start off-screen (Right)
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // 1. SLIDE IN: Move to 0 (center) and fade in
    const enterTimer = setTimeout(() => {
      setSlideOffset("0px");
      setOpacity(1);
    }, 50);

    // 2. SLIDE OUT: Move back to 120% and fade out before unmounting
    const exitTimer = setTimeout(() => {
      setSlideOffset("120%");
      setOpacity(0);
    }, 2700);

    // 3. REMOVE: Finally call the close function
    const closeTimer = setTimeout(() => {
      onClose();
    }, 3100); // Slightly longer than the CSS transition to ensure it finishes

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const handleManualClose = () => {
    setSlideOffset("120%");
    setOpacity(0);
    setTimeout(onClose, 400); 
  };

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-300 text-green-700"
      : "bg-red-100 border-red-300 text-red-700";

  return (
    <div
      // We use the style attribute for the values we want to "Control"
      style={{
        transform: `translateX(${slideOffset})`,
        opacity: opacity,
        transition: "transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.4s ease",
      }}
      className={`fixed top-20 right-6 flex items-center w-full max-w-sm p-4 rounded shadow-lg border z-[9999] ${bgColor}`}
    >
      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
        {type === "success" ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        onClick={handleManualClose}
        className="ml-auto text-sm text-gray-500 hover:text-gray-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;