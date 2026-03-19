/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import App from "../App";

const RoutesWrapper: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignUp = () => setIsLoggedIn(true);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
      
      {/* ✅ Single /notes route with trailing * for nested routes */}
      <Route
        path="/notes/*"
        element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
      />

      {/* Redirect all unknown paths */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/notes" : "/login"} replace />}
      />
    </Routes>
  );
};

export default RoutesWrapper;