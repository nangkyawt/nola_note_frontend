/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Toast.tsx
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

// Toast Component
const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 6000); // auto dismiss after 6s
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-300 text-green-700"
      : "bg-red-100 border-red-300 text-red-700";

  const icon =
    type === "success" ? (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );

  return (
    <div
      className={`fixed top-6 right-6 flex items-center w-full max-w-sm p-4 rounded shadow-lg border z-50 ${bgColor}`}
    >
      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">{icon}</div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        onClick={onClose}
        className="ml-auto text-sm text-gray-500 hover:text-gray-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;