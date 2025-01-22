// Importing dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css"; // Ensure this file styles your components

// TMDB API Key and Base URL
const API_KEY = "41b7e34d009af460e22e4a8e91279433";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// Fetch API data with Axios
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Banner Component
const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      const data = await fetchData("/movie/popular");
      if (data && data.results.length > 0) {
        setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      }
    };
    fetchBannerMovie();
  }, []);

  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">{movie.overview}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

// Row Component
const Row = ({ title, endpoint, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchData(endpoint);
      if (data && data.results) {
        setMovies(data.results);
      }
    };
    fetchMovies();
  }, [endpoint]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.title || movie.name}
          />
        ))}
      </div>
    </div>
  );
};

// Filter Component
const Filter = ({ onFilterChange }) => {
  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  return (
    <div className="filter">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter__dropdown"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Main MovieList Component
const MovieList = () => {
  const [genre, setGenre] = useState("");

  return (
    <div className="movieList">
      {/* Banner */}
      <Banner />

      {/* Filter */}
      <Filter onFilterChange={(selectedGenre) => setGenre(selectedGenre)} />

      {/* Movie Rows */}
      <Row
        title="Trending Now"
        endpoint={`/trending/all/week${genre ? `&with_genres=${genre}` : ""}`}
        isLargeRow
      />
      <Row
        title="Top Rated"
        endpoint={`/movie/top_rated${genre ? `&with_genres=${genre}` : ""}`}
      />
      <Row
        title="Action Movies"
        endpoint={`/discover/movie?with_genres=28${genre ? `,${genre}` : ""}`}
      />
      <Row
        title="Comedy Movies"
        endpoint={`/discover/movie?with_genres=35${genre ? `,${genre}` : ""}`}
      />
    </div>
  );
};

export default MovieList;
