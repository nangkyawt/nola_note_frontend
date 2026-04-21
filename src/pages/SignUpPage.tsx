/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockClosedIcon, EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteIcon from "../assets/images/note.png";
import GoogleIcon from "../assets/images/google.png";
import FacebookIcon from "../assets/images/facebook.png";
import Toast from "../components/Toast"; 

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
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success"); 
  const navigate = useNavigate();

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
  };

const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();

  // for username
  const usernameRegex = /^[A-Za-z\s]+$/;
  if (!usernameRegex.test(username)) {
  setError("Username must contain only letters!");
  showToast("Username must contain only letters!", "error");
  return;
  }

  // Gmail validation
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
  setError("Please enter a valid Gmail address!");
  showToast("Please enter a valid Gmail address!", "error");
  return;
  }

  // Password match
  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    showToast("Passwords do not match!", "error");
    return;
  }

  // Password length
  if (password.length < 6) {
    setError("Password must be at least 6 characters!");
    showToast("Password must be at least 6 characters!", "error");
    return;
  }

  const passwordRegex = /^[A-Za-z0-9]+$/;
  if (!passwordRegex.test(password)) {
    setError("Password can only contain letters and numbers!");
    showToast("Password can only contain letters and numbers!", "error");
    return;
  }

  try {
    const res = await fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Signup failed");
      showToast(data.message || "Signup failed", "error");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("userChange"));

    onSignUp();
    showToast("Signup successful!", "success");

    setTimeout(() => {
      navigate("/notes", {
        state: { toastMessage: "Signup successful!", toastType: "success" }
      });
    });
  } catch (err) {
    console.error(err);
    setError("Server error");
    showToast("Server error", "error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 overflow-y-auto relative">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50">
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage("")}
          />
        </div>
      )}

      {/* Background Circles */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-pink-400 rounded-full opacity-40 animate-pulse hidden sm:block"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-500 rounded-full opacity-30 animate-pulse hidden sm:block"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-pink-300 rounded-full opacity-20 animate-ping hidden sm:block"></div>

      {/* Sign Up Card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-5 sm:p-8 flex flex-col items-center overflow-hidden">
        <h1 
          className="text-5xl font-extrabold text-pink-600 mb-4 flex items-center justify-center gap-2"
          style={{fontFamily:"Quicksand"}}
        >
          <img src={NoteIcon} alt="note" className="w-10 h-10" />
          Nola
        </h1>
        <p className="text-center text-pink-400 mb-4 text-sm sm:text-base">Create your magical note account</p>

        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-3 sm:gap-4">
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              autoComplete="new-password"
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
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              autoComplete="new-password"
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="mt-3 w-full py-3 font-bold rounded-2xl bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg hover:scale-105 transform transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-3 sm:my-4 w-full">
          <hr className="flex-grow border-pink-300" />
          <span className="mx-2 text-pink-400 text-sm">or sign up with</span>
          <hr className="flex-grow border-pink-300" />
        </div>

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

        <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SignUpPage;