import React from "react";
import { Link } from "react-router-dom";
import errorPng from "../assets/images/ErrorDog .png";

const NotFoundPage: React.FC = () => {
  return (
<div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-5">
      
      <img 
        src={errorPng} 
        alt="404 Not Found"
        className="w-64 h-64 mb-8 object-contain animate-bounce-slow"
      />

      {/* <h1 className="text-7xl font-bold text-purple-600">404</h1> */}
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-all font-medium"
      >
        Go Back to My Notes
      </Link>
    </div>
  );
};

export default NotFoundPage;