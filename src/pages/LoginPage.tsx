/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockClosedIcon, EyeIcon, EyeOffIcon, MailIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteIcon from "../assets/images/note.png";
import GoogleIcon from "../assets/images/google.png"
import FacebookIcon from "../assets/images/facebook.png";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    // save token
    localStorage.setItem("token", data.token);
    console.log("Login successful, calling onLogin"); 
onLogin();
navigate("/notes", { 
  state: { toastMessage: "Logged in successfully!", toastType: "success" } 
});
  } catch (err) {
    console.error(err);
    setError("Server error");
  }
};
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 overflow-hidden relative">
      <div className="absolute top-10 left-10 w-12 h-12 bg-pink-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-pink-300 rounded-full opacity-20 animate-ping"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col items-center overflow-hidden">
  <h1 
  className="text-5xl font-extrabold text-pink-600 mb-4 flex items-center justify-center gap-2"
  style={{fontFamily:"Quicksand"}}
>
  <img src={NoteIcon} alt="note" className="w-10 h-10" />
  Nola
</h1>
        <p className="text-center text-pink-400 mb-8">Your magical note world ✨</p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          {/* Email */}
          <div className="relative">
            <MailIcon className="w-5 h-5 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full pl-10 p-4 border border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-pink-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full pl-10 pr-12 p-4 border border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-pink-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-transform transform hover:scale-110"
            >
              {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>
          )}

          <button
            type="submit"
            className="mt-3 w-full py-3 font-bold rounded-2xl bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg hover:scale-105 transform transition-all"
          >
            Login
          </button>
        </form>

        {/* Divider with text */}
        <div className="flex items-center my-4 w-full">
          <hr className="flex-grow border-pink-300" />
          <span className="mx-2 text-pink-400 text-sm">or login with</span>
          <hr className="flex-grow border-pink-300" />
        </div>

       {/* Social login icons - small buttons */}
 <div className="flex justify-center gap-4 mb-4">
  <button
    type="button"
    className="w-10 h-10 p-1 rounded-full border border-pink-300 hover:shadow-md transition-transform transform hover:scale-110"
    onClick={() => alert("Google login coming soon!")}
  >
    <img src={GoogleIcon} alt="Google login" className="w-full h-full object-contain" />
  </button>
  <button
    type="button"
    className="w-10 h-10 p-1 rounded-full border border-pink-300 hover:shadow-md transition-transform transform hover:scale-110"
    onClick={() => alert("Facebook login coming soon!")}
  >
    <img src={FacebookIcon} alt="Facebook login" className="w-full h-full object-contain" />
  </button>
</div>

        <p className="text-center text-pink-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>


        <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoginPage;