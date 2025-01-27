import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/index";
import Login from "./components/Auth/Login/index";
import ForgotPassword from "./components/Auth/Forgot-Password/index";
import ResetPassword from "./components/Auth/Reset-Password/index";
import MovieList from "./components/List/index";
import MovieDetails from "./components/Details/MovieDetails"; 
import Person from "./components/Person/person";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />
      <Route path="/list" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetails />} /> {/* Movie Details route */}
      <Route path="/person/:personId" element={<Person />} />
    </Routes>
  );
};

export default App;
