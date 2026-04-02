/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";


const RoutesWrapper: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignUp = () => setIsLoggedIn(true);

  return (

    
    // <Routes>

    //   <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
    //   <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
      

    //   <Route
    //     path="/notes/*"
    //     element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
    //   />

    //   <Route
    //     path="*"
    //     element={<Navigate to={isLoggedIn ? "/notes" : "/login"} replace />}
    //   />
    // </Routes>)

  // orignial
   <Routes>

    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
  <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
    <Route
  path="/login"
  element={
    !isLoggedIn ? (
      <LoginPage onLogin={handleLogin} />
    ) : (
      <Navigate to="/notes" replace />
    )
  }
/>

<Route
  path="/signup"
  element={
    isLoggedIn ? (
      <Navigate to="/notes" replace />
    ) : (
      <SignUpPage onSignUp={handleSignUp} />
    )
  }
/>
      <Route
        path="/notes/*"
        element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
      />

      {/* 1. Handle the "Home" redirect specifically */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/notes" : "/login"} replace />}
      />

      {/* 2. Any other URL that doesn't match above shows your new 404 page */}
      <Route path="*" element={<NotFoundPage />} />

        {/* Protected route */}
     <Route
      path="/notes/*"
      element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
   />
    {/* Redirect root */}
   <Route
         path="/"
       element={<Navigate to={isLoggedIn ? "/notes" : "/login"} replace />}
     />
          {/* Global 404 */}
     <Route path="*" element={<NotFoundPage />} />
    </Routes>
    
  );

  // Test
  // <Routes>
  //     {/* Public routes */}
  //     <Route
  //       path="/login"
  //       element={
  //         !isLoggedIn ? (
  //           <LoginPage onLogin={handleLogin} />
  //         ) : (
  //           <Navigate to="/notes" replace />
  //         )
  //       }
  //     />

  //     <Route
  //       path="/signup"
  //       element={
  //         !isLoggedIn ? (
  //           <SignUpPage onSignUp={handleSignUp} />
  //         ) : (
  //           <Navigate to="/notes" replace />
  //         )
  //       }
  //     />

  //     {/* Protected route */}
  //     <Route
  //       path="/notes/*"
  //       element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
  //     />

  //     {/* Redirect root */}
  //     <Route
  //       path="/"
  //       element={<Navigate to={isLoggedIn ? "/notes" : "/login"} replace />}
  //     />

  //     {/* Global 404 */}
  //     <Route path="*" element={<NotFoundPage />} />
  //   </Routes>
  // );
};




export default RoutesWrapper;