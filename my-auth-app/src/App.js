
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/Auth/Register/index"; // Assuming your RegisterForm is exported from index.js

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
    </Routes>
  );
};

export default App;
