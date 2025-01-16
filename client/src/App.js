import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/index";
import Login from "./components/Auth/Login/index";
import ForgotPassword from "./components/Auth/Forgot-Password/index";
import ResetPassword from "./components/Auth/Reset-Password/index"; // Assuming ResetPassword is exported from index.js

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} /> {/* Register page at "/" */}
      <Route path="/login" element={<Login />} /> {/* Login page at "/login" */}
      <Route path="/forgot_password" element={<ForgotPassword />} /> {/* Forgot Password page */}
      <Route path="/reset_password" element={<ResetPassword />} /> {/* Reset Password page */}
    </Routes>
  );
};

export default App;
