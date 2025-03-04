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

  const fetchLikedMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axiosCustom.get(`/like/liked-movies?page=${page}&limit=8`);
      if (response.status === 200) {
        const likedMovieIds = response.data.map((item) => item.movieId);
        const movieDetailsPromises = likedMovieIds.map((movieId) => fetchData(`/movie/${movieId}`));
        const movieDetails = await Promise.all(movieDetailsPromises);
        const validMovies = movieDetails.filter((movie) => movie !== null);

        setLikedMovies((prev) => [...prev, ...validMovies]);
        setHasMore(validMovies.length === 8);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching liked movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchLikedMovies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        fetchLikedMovies();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchLikedMovies]);

  const handleLike = async (movieId, e) => {
    e.stopPropagation();
    try {
      const isLiked = likedMovies.some((movie) => movie.id === movieId);
      const endpoint = isLiked ? "/like/unlike" : "/like/like";
      const response = await axiosCustom.post(endpoint, { movieId });

      if (response.status === 200) {
        setLikedMovies((prev) =>
          isLiked ? prev.filter((movie) => movie.id !== movieId) : [...prev, { id: movieId }]
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
              <Tooltip title={likedMovies.some((m) => m.id === movie.id) ? "Unlike" : "Like"}>
                <IconButton
                  onClick={(e) => handleLike(movie.id, e)}
                  className="like-button"
                >
                  {likedMovies.some((m) => m.id === movie.id) ? (
                    <FavoriteIcon className="liked" />
                  ) : (
                    <FavoriteBorderIcon className="not-liked" />
                  )}
                </IconButton>
              </Tooltip>
            </motion.div>
          ))}
        </div>

        {loading && <CircularProgress className="loading-spinner" />}
      </div>
    </div>
  );
};

export default LikedMovies;