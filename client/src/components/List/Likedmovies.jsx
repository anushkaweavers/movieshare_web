import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import Tooltip from '@mui/material/Tooltip';
import Navbar from "../Navbar/Navbar";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const response = await axiosCustom.get("/like/liked-movies");
        if (response.status === 200) {
          const likedMovieIds = response.data.map((item) => item.movieId);
          const movieDetailsPromises = likedMovieIds.map((movieId) =>
            fetchData(`/movie/${movieId}`)
          );
          const movieDetails = await Promise.all(movieDetailsPromises);
          const validMovies = movieDetails.filter((movie) => movie !== null);
          setLikedMovies(validMovies);
        }
      } catch (error) {
        console.error("Error fetching liked movies:", error);
      }
    };
    fetchLikedMovies();
  }, []);

  const handleLike = async (movieId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    try {
      const endpoint = likedMovies.some((movie) => movie.id === movieId) ? "/like/unlike" : "/like/like";
      const response = await axiosCustom.post(endpoint, { movieId });

      if (response.status === 200) {
        setLikedMovies((prev) => prev.filter((movie) => movie.id !== movieId));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleNavigate = (movieId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/movie/${movieId}`); // Navigate immediately
  };

  const DEFAULT_IMAGE = "/images/movie-default.png";

  return (
    <div className="movie-list">
      <Navbar />
      <div className="movie-container">
        <h2 className="movie-row__title">Movies Liked by You</h2>
        <div className="liked-movies-grid">
          {likedMovies.map((movie) => (
            <div
              key={movie.id}
              style={{ position: "relative", cursor: "pointer" }}
              onClick={(e) => handleNavigate(movie.id, e)}
            >
              <img
                className="movie-row__poster"
                src={
                  movie.poster_path || movie.backdrop_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : DEFAULT_IMAGE
                }
                alt={movie.title || movie.name}
                onError={(e) => (e.target.src = DEFAULT_IMAGE)}
              />
              <Tooltip title={likedMovies.some((m) => m.id === movie.id) ? "Unlike" : "Like"}>
                <IconButton
                  onClick={(e) => handleLike(movie.id, e)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: likedMovies.some((m) => m.id === movie.id) ? "red" : "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                  }}
                >
                  {likedMovies.some((m) => m.id === movie.id) ? (
                    <FavoriteIcon style={{ fontSize: "24px", color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon style={{ fontSize: "24px", color: "white" }} />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedMovies;