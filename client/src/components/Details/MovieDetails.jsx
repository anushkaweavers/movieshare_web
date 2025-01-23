import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

const API_KEY = "41b7e34d009af460e22e4a8e91279433";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await apiClient.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      {/* Banner */}
      <div
        className="movie-details__banner"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></div>

      {/* Content Section */}
      <div className="movie-details__content">
        {/* Poster */}
        <img
          className="movie-details__poster"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Movie Info */}
        <div className="movie-details__info">
          <h1 className="movie-details__title">{movie.title}</h1>
          <p className="movie-details__year">
            {movie.release_date?.split("-")[0]} • {movie.runtime} min
          </p>
          <p className="movie-details__overview">{movie.overview}</p>
          <div className="movie-details__actions">
            <button className="movie-details__rent-button">Rent Movie ($0.99)</button>
            <button className="movie-details__playlist-button">
              Add to Playlist <span className="arrow-down">▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="movie-details__tabs">
        <ul>
          <li className="active">Details</li>
          <li>Reviews</li>
          <li>Trailers</li>
          <li>Cast</li>
          <li>Crew</li>
          <li>Releases</li>
          <li>Playlists</li>
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
