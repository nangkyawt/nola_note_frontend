/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import App from "../App";

const RoutesWrapper: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignUp = () => setIsLoggedIn(true);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
      <Route
        path="/notes/*"
        element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
      />

      {/* Default redirect */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/notes" : "/login"} replace />}
      />
    </Routes>
  );
};

export default RoutesWrapper;