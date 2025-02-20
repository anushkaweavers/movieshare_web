import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/index";
import Login from "./components/Auth/Login/index";
import ForgotPassword from "./components/Auth/Forgot-Password/index";
import ResetPassword from "./components/Auth/Reset-Password/index";
import MovieList from "./components/List/index";
import Community from './components/Community/Community'; // Adjust path as needed
import MovieDetails from "./components/Details/MovieDetails";
import Person from "./components/Person/person";
import WriteReviewPage from "./components/Review/WriteReviewPage";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import EditReviewPage from "./components/Review/EditReviewPage";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
      <Route path="/community" element={<Community />} />
        <Route path="/list" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/write-review/:movieId" element={<WriteReviewPage />} />
        <Route path="/edit-review/:reviewId" element={<EditReviewPage />} />
        <Route path="/person/:personId" element={<Person />} />
        <Route path="/navbar" element={<Navbar />} />
     
      </Route>
    </Routes>
  );
};

export default App;
