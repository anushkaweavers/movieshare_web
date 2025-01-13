import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/Auth/RegisterForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
    </Routes>
  );
};

export default App;
