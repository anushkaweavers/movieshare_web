import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/index"; // Assuming Register is exported from index.js
import Login from "./components/Auth/Login/index"; // Assuming Login is exported from index.js

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />  {/* Register page at "/" */}
      <Route path="/login" element={<Login />} />  {/* Login page at "/login" */}
    </Routes>
  );
};

export default App;
