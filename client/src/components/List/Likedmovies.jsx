import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import "./LikeList.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const LikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Fetch liked movies
  const fetchLikedMovies = useCallback(async () => {
    if (loading || !hasMore) return; // Avoid duplicate requests
    setLoading(true);

    try {
      const response = await axiosCustom.get(`/like/liked-movies?page=${page}&limit=8`);
      if (response.status === 200) {
        const likedMovieIds = response.data.map((item) => item.movieId);

        // Fetch movie details for each liked movie ID
        const movieDetailsPromises = likedMovieIds.map((movieId) => fetchData(`/movie/${movieId}`));
        const movieDetails = await Promise.all(movieDetailsPromises);
        const validMovies = movieDetails.filter((movie) => movie !== null);

        // Update state with new movies
        setLikedMovies((prev) => [...prev, ...validMovies]);
        setHasMore(validMovies.length === 8); // Check if there are more movies to load
        setPage((prevPage) => prevPage + 1); // Increment page for the next request
      }
    } catch (error) {
      console.error("Error fetching liked movies:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  }, [page, loading, hasMore]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchLikedMovies();
  }, []);

  // Add scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // Fetch more movies if the user is near the bottom of the page
      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && hasMore) {
        fetchLikedMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchLikedMovies, loading, hasMore]);

  // Handle "unlike" action
  const handleLike = async (movieId, e) => {
    e.stopPropagation();
    try {
      const response = await axiosCustom.post("/like/unlike", { movieId });

      if (response.status === 200) {
        // Remove the movie from the liked list
        setLikedMovies((prev) => prev.filter((movie) => movie.id !== movieId));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Navigate to movie details page
  const handleNavigate = (movieId, e) => {
    e.stopPropagation();
    navigate(`/movie/${movieId}`);
  };

  const DEFAULT_IMAGE = "/images/movie-default.png";

  return (
    <div className="movie-list">
      <Navbar />
      <div className="movie-container">
        <h2 className="movie-row__title">Movies You Liked ❤️</h2>

        <div className="liked-movies-grid">
          {likedMovies.map((movie) => (
            <motion.div
              key={movie.id}
              className="movie-card"
              onClick={(e) => handleNavigate(movie.id, e)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                className="movie-poster"
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : DEFAULT_IMAGE}
                alt={movie.title || movie.name}
                onError={(e) => (e.target.src = DEFAULT_IMAGE)}
              />
              <div className="movie-info">
                <h4>{movie.title || movie.name}</h4>
              </div>
              <Tooltip title="Unlike">
                <IconButton onClick={(e) => handleLike(movie.id, e)} className="like-button">
                  <FavoriteIcon className="liked" />
                </IconButton>
              </Tooltip>
            </motion.div>
          ))}
        </div>

        {/* Show loading spinner when fetching more movies */}
        {loading && <CircularProgress className="loading-spinner" />}

        {/* Show a message if there are no more movies to load */}
        {!hasMore && <p className="no-more-movies">No more movies to load.</p>}
      </div>
    </div>
  );
};

export default LikedMovies;