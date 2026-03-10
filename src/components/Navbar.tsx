/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";

interface NavbarProps {
  username: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, isLoggedIn, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-pink-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-16 px-4">
          {/* Profile + Hi */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-200 text-pink-600 flex items-center justify-center font-bold">
              {username[0]?.toUpperCase() || "U"}
            </div>
            <span className="font-medium">Hi, {username || "User"}</span>
          </div>

          {/* Search */}
          <div className="flex items-center bg-white text-gray-500 rounded-lg px- py-1 gap-2 shadow-sm">
            <SearchIcon className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none text-gray-700 text-sm"
            />
          </div>

          {/* Notifications + Login */}
          <div className="flex items-center gap-4">
            <button className="relative">
              <BellIcon className="w-6 h-6 text-white hover:text-yellow-200 transition" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-white text-pink-500 font-semibold hover:bg-pink-50 hover:shadow transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-2 rounded-lg bg-white text-pink-500 font-semibold hover:bg-pink-50 hover:shadow transition"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between w-full px-3 py-3 bg-pink-500 shadow-md">
          {/* Profile at left */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-200 text-pink-600 flex items-center justify-center font-bold">
              {username[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-white font-medium text-sm">Hi, {username || "User"}</span>
          </div>

          {/* Spacer pushes icons to the right */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Search */}
            <button className="text-white">
              <SearchIcon className="w-6 h-6" />
            </button>

            {/* Notifications */}
            <button className="relative text-white">
              <BellIcon className="w-6 h-6 hover:text-yellow-200 transition" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Hamburger toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none ml-2">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-pink-500">
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 rounded-lg bg-white text-pink-500 font-semibold hover:bg-pink-50 hover:shadow transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="w-full px-4 py-2 rounded-lg bg-white text-pink-500 font-semibold hover:bg-pink-50 hover:shadow transition"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

