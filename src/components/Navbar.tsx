/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";

interface NavbarProps {
 username: string;
  isLoggedIn: boolean; // add this line
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Load username from localStorage and listen for updates
useEffect(() => {
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    console.log("Navbar reads user:", storedUser);
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUsername(userObj.username);
    } else {
      setUsername(null);
    }
  };

  loadUser();
  window.addEventListener("userChange", loadUser);

  return () => window.removeEventListener("userChange", loadUser);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUsername(null);
    onLogout();
  };

  const isLoggedIn = !!username;

  return (
    <nav className="w-full bg-pink-500 text-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Profile + Greeting */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-pink-500 flex items-center justify-center font-bold shadow">
              {username ? username[0].toUpperCase() : "U"}
            </div>
            <span className="font-medium text-white text-sm">
              Hi, {username || "User"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative group">
              <BellIcon className="w-6 h-6 text-white group-hover:text-yellow-200 transition" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
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
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white text-pink-500 flex items-center justify-center font-bold shadow">
              {username ? username[0].toUpperCase() : "U"}
            </div>
            <span className="text-white font-medium text-sm">
              Hi, {username || "User"}
            </span>
          </div>

          {/* Icons & Hamburger */}
          <div className="flex items-center gap-4">
            <button className="text-white">
              <SearchIcon className="w-6 h-6 hover:text-pink-200 transition" />
            </button>
            <button className="relative text-white">
              <BellIcon className="w-6 h-6 hover:text-yellow-200 transition" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Hamburger */}
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
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
          <div className="md:hidden mt-2 flex flex-col gap-2 pb-2 bg-pink-500 rounded-lg shadow-md">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
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