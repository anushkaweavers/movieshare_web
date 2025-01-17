import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/index";
import Login from "./components/Auth/Login/index";
import ForgotPassword from "./components/Auth/Forgot-Password/index";
import ResetPassword from "./components/Auth/Reset-Password/index"; 
import BannerSection from "./components/Movies/Details/BannerSection"; // Import BannerSection

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} /> {/* Register page at "/" */}
      <Route path="/login" element={<Login />} /> {/* Login page at "/login" */}
      <Route path="/forgot_password" element={<ForgotPassword />} /> {/* Forgot Password page */}
      <Route path="/reset_password" element={<ResetPassword />} /> {/* Reset Password page */}
      <Route path="/movie-banner" element={<BannerSection movieDetails={{ title: "Example Movie", release_date: "2025-01-01", runtime: 120, overview: "This is an example movie.", poster_path: "/poster.jpg", backdrop_path: "/backdrop.jpg" }} />} /> {/* Example route for BannerSection */}
    </Routes>
  );
};

export default App;
