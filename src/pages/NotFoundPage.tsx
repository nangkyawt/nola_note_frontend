import React from "react";
import { Link } from "react-router-dom";
import errorPng from "../assets/images/ErrorDog .png";

const NotFoundPage: React.FC = () => {
  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-6">
  <div className="text-center max-w-md w-full">

    {/* Image */}
    <img
      src={errorPng}
      alt="404 Not Found"
      className="w-60 h-60 mx-auto mb-6 object-contain animate-[float_3s_ease-in-out_infinite]"
    />

    {/* 404 Title */}
    {/* <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
      404
    </h1> */}

    {/* Subtitle */}
    <h2 className="text-2xl font-semibold mt-3 text-gray-800">
      Page Not Found
    </h2>

    {/* Description */}
    <p className="text-gray-500 mt-2 leading-relaxed">
      Sorry, the page you’re looking for doesn’t exist or has been moved.
    </p>

    {/* Buttons */}
    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
      
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all font-medium"
      >
        Go Home
      </Link>

      <button
        onClick={() => window.history.back()}
        className="px-6 py-3 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-100 transition-all font-medium"
      >
        Go Back
      </button>

    </div>
  </div>
</div>
  );
};

export default NotFoundPage;