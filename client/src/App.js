
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/index"; // Assuming your RegisterForm is exported from index.js

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
    </Routes>
  );
};

export default App;
