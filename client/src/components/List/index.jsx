import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";
import { Navigation, Scrollbar } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../responsive.css";
import "../dark.css";
import "../developer.css";
import { Pagination } from "swiper/modules";
import Navbar from "../Navbar/Navbar";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import Tooltip from '@mui/material/Tooltip';

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

// Banner Component
const Banner = React.memo(() => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBannerMovies = async () => {
      const data = await fetchData("/movie/popular");
      if (data && data.results.length > 0) {
        const shuffled = data.results.sort(() => 0.5 - Math.random());
        setMovies(shuffled.slice(0, 4));
      }
    };
    fetchBannerMovies();
  }, []);

  if (movies.length === 0) return null;

  return (
    <div className="banner-slider">
      <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={0} slidesPerView={1} loop>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
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
                  <button
                    className="banner__button"
                    onClick={() => navigate(`/movie/${movie.id}`)} // Navigate on click
                  >
                    Movie Details →
                  </button>
                  <button className="banner__button">Add To Playlist</button>
                </div>
                <p className="banner__description">{movie.overview}</p>
              </div>
              <div className="banner--fadeBottom" />
            </header>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

// Row Component
const Row = React.memo(({ title, endpoint, params = {}, isLargeRow = false, movies: propMovies }) => {
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    if (propMovies) {
      setMovies(propMovies);
    } else {
      const fetchMovies = async () => {
        const data = await fetchData(endpoint, params);
        if (data?.results) {
          setMovies(data.results);
        }
      };
      fetchMovies();
    }
  }, [endpoint, params, propMovies]);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const response = await axiosCustom.get("/like/liked-movies");
        if (response.status === 200) {
          const likedMovieIds = response.data.map((movie) => movie.movieId);
          setLikedMovies(new Set(likedMovieIds));
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
      const endpoint = likedMovies.has(movieId) ? "/like/unlike" : "/like/like";
      const response = await axiosCustom.post(endpoint, { movieId });

      if (response.status === 200) {
        setLikedMovies((prev) => {
          const newLikedMovies = new Set(prev);
          if (newLikedMovies.has(movieId)) {
            newLikedMovies.delete(movieId);
          } else {
            newLikedMovies.add(movieId);
          }
          return newLikedMovies;
        });
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
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation
        scrollbar={{ draggable: true }}
        spaceBetween={10}
        slidesPerView={isLargeRow ? 6 : 5}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onClick={(e) => handleNavigate(movie.id, e)} // Pass event to handleNavigate
            >
              <img
                className={`movie-row__poster ${isLargeRow ? "movie-row__posterLarge" : ""}`}
                src={
                  movie.poster_path || movie.backdrop_path
                    ? `${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`
                    : DEFAULT_IMAGE
                }
                alt={movie.title || movie.name}
                onError={(e) => (e.target.src = DEFAULT_IMAGE)}
              />
              <Tooltip title={likedMovies.has(movie.id) ? "Unlike" : "Like"}>
                <IconButton
                  onClick={(e) => handleLike(movie.id, e)} // Pass event to handleLike
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: likedMovies.has(movie.id) ? "red" : "white",
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
                  {likedMovies.has(movie.id) ? (
                    <FavoriteIcon style={{ fontSize: "24px", color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon style={{ fontSize: "24px", color: "white" }} />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

// Filter Component
const Filter = ({ onFilterChange, onResetFilters, genres, filters }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="filter">
      <select onChange={(e) => onFilterChange("genre", e.target.value)} className="filter__dropdown">
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          onFilterChange("releaseYear", date?.getFullYear() || "");
        }}
        showYearPicker
        dateFormat="yyyy"
        placeholderText="Select Release Year"
        className="filter__datePicker"
      />

      <div className="filter__rating">
        {[...Array(10)].map((_, index) => (
          <FaStar
            key={index}
            className={`filter__star ${index + 1 <= (parseInt(filters.rating) || 0) ? "active" : ""}`}
            onClick={() => onFilterChange("rating", index + 1)}
          />
        ))}
      </div>

      <select onChange={(e) => onFilterChange("sortBy", e.target.value)} className="filter__dropdown">
        <option value="">Sort By</option>
        <option value="popularity.desc">Popularity</option>
        <option value="release_date.desc">Release Date</option>
        <option value="vote_average.desc">Rating</option>
      </select>

      <button onClick={onResetFilters} className="filter__reset">
        Reset Filters
      </button>
    </div>
  );
};

// Main MovieList Component
const MovieList = () => {
  const [filters, setFilters] = useState({ genre: "", releaseYear: "", rating: "", sortBy: "" });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const isFilterApplied = useMemo(() => {
    return filters.genre || filters.releaseYear || filters.rating || filters.sortBy;
  }, [filters]);

  const buildParams = useMemo(() => {
    const params = {};
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.releaseYear) params.primary_release_year = filters.releaseYear;
    if (filters.rating) params["vote_average.gte"] = filters.rating;
    if (filters.sortBy) params.sort_by = filters.sortBy;
    return params;
  }, [filters]);

  useEffect(() => {
    if (isFilterApplied) {
      const fetchFilteredMovies = async () => {
        const data = await fetchData("/discover/movie", buildParams);
        setFilteredMovies(data?.results || []);
      };
      fetchFilteredMovies();
    }
  }, [isFilterApplied, buildParams]);

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
        return validMovies;
      }
    } catch (error) {
      console.error("Error fetching liked movies:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndSetLikedMovies = async () => {
      const movies = await fetchLikedMovies();
      setLikedMovies(movies);
    };
    fetchAndSetLikedMovies();
  }, []);

  const handleResetFilters = () => setFilters({ genre: "", releaseYear: "", rating: "", sortBy: "" });

  return (
    <div className="movie-list">
      <Navbar />
      <Banner />
      <Filter
        filters={filters}
        onFilterChange={(field, value) => setFilters((prev) => ({ ...prev, [field]: value }))}
        onResetFilters={handleResetFilters}
        genres={[
          { id: 28, name: "Action" },
          { id: 35, name: "Comedy" },
          { id: 18, name: "Drama" },
          { id: 27, name: "Horror" },
          { id: 10749, name: "Romance" },
        ]}
      />
      <div className="movie-container">
        {isFilterApplied ? (
          filteredMovies.length > 0 ? (
            <Row title="Filtered Results" endpoint="/discover/movie" params={buildParams} />
          ) : (
            <p className="no-results">No movies found.</p>
          )
        ) : (
          <>
            {likedMovies.length > 0 && (
              <Row title="Movies Liked by You" movies={likedMovies} isLargeRow={true} />
            )}
            <Row title="Trending Movies" endpoint="/trending/movie/week" />
            <Row title="Top Rated Movies" endpoint="/movie/top_rated" />
            <Row title="Upcoming Movies" endpoint="/movie/upcoming" />
            <Row title="Now Playing" endpoint="/movie/now_playing" />
          </>
        )}
      </div>
    </div>
  );
};

export default MovieList;