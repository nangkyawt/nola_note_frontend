/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockClosedIcon, EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import NoteIcon from "../assets/images/note.png";
import GoogleIcon from "../assets/images/google.png";
import FacebookIcon from "../assets/images/facebook.png";

interface SignUpPageProps {
  onSignUp: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!email || !password || !username) {
      setError("All fields are required!");
      return;
    }

    // For now, just simulate sign up
    onSignUp();
    navigate("/notes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 overflow-y-auto relative">
      {/* Decorative floating circles */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-pink-400 rounded-full opacity-40 animate-pulse hidden sm:block"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-500 rounded-full opacity-30 animate-pulse hidden sm:block"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-pink-300 rounded-full opacity-20 animate-ping hidden sm:block"></div>

      {/* Sign Up Card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center overflow-hidden">
        {/* Title with note icon */}
       <h1 
  className="text-5xl font-extrabold text-pink-600 mb-4 flex items-center justify-center gap-2"
  style={{fontFamily:"Quicksand"}}
>
  <img src={NoteIcon} alt="note" className="w-10 h-10" />
  Nola
</h1>
<p className="text-center text-pink-400 mb-4 text-sm sm:text-base">Create your magical note account ✨</p>

        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-3 sm:gap-5">
          {/* Username */}
          <div className="relative">
            <UserIcon className="w-5 h-5 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="w-full pl-10 p-4 border border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-pink-300"
            />
          </div>

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

          {/* Confirm Password */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className="w-full pl-10 pr-12 p-4 border border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-pink-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-transform transform hover:scale-110"
            >
              {showConfirm ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="mt-3 w-full py-3 font-bold rounded-2xl bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg hover:scale-105 transform transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Divider with text */}
        <div className="flex items-center my-3 sm:my-4 w-full">
          <hr className="flex-grow border-pink-300" />
          <span className="mx-2 text-pink-400 text-sm">or SignUp with</span>
          <hr className="flex-grow border-pink-300" />
        </div>

        {/* Social signup buttons */}
       <div className="flex justify-center gap-3 sm:gap-4 mb-4">
  <button
    type="button"
    className="w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-full border border-pink-300 hover:shadow-md transition-transform transform hover:scale-110"
    onClick={() => alert("Google login coming soon!")}
  >
    <img src={GoogleIcon} alt="Google login" className="w-full h-full object-contain" />
  </button>
  <button
    type="button"
    className="w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-full border border-pink-300 hover:shadow-md transition-transform transform hover:scale-110"
    onClick={() => alert("Facebook login coming soon!")}
  >
    <img src={FacebookIcon} alt="Facebook login" className="w-full h-full object-contain" />
  </button>
</div>

        <p className="text-center text-pink-400 mt-4 sm:mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>

        {/* Decorative floating hearts */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-pulse hidden sm:block"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-pulse hidden sm:block"></div>
      </div>
    </div>
  );
};

export default SignUpPage;