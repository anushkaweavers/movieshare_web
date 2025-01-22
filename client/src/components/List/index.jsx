import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./MovieList.css";
import { Navigation, Scrollbar } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../responsive.css";
import "../dark.css";
import "../developer.css";
// TMDB API Configuration
const API_KEY = "41b7e34d009af460e22e4a8e91279433";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// Axios instance for API calls
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Fetch API data
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
          <button className="banner__button">Movie Details →</button>
          <button className="banner__button">Add To Playlist</button>
        </div>
        <p className="banner__description">{movie.overview}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

// Row Component with Swiper
const Row = ({ title, endpoint, params = {}, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchData(endpoint, params);
      if (data && data.results) {
        setMovies(data.results);
      }
    };
    fetchMovies();
  }, [endpoint, params]);

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
            <img
              className={`movie-row__poster ${isLargeRow ? "movie-row__posterLarge" : ""}`}
              src={`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.title || movie.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Filter Component
const Filter = ({ onFilterChange, onResetFilters, genres, filters }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFilterChange = (field, value) => {
    onFilterChange((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  return (
    <div className="filter">
      <select
        onChange={(e) => handleFilterChange("genre", e.target.value)}
        className="filter__dropdown"
      >
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
    handleFilterChange("releaseYear", date?.getFullYear() || "");
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
      onClick={() => handleFilterChange("rating", index + 1)}
    />
  ))}
</div>

      <select
        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        className="filter__dropdown"
      >
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
  const [isFiltered, setIsFiltered] = useState(false);

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  const getGenreName = (id) =>
    genres.find((genre) => genre.id === parseInt(id))?.name || "Filtered Results";

  const buildParams = () => {
    const params = {};
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.releaseYear) params.primary_release_year = filters.releaseYear;
    if (filters.rating) params["vote_average.gte"] = filters.rating;
    if (filters.sortBy) params.sort_by = filters.sortBy;
    return params;
  };

  const handleResetFilters = () => {
    setFilters({ genre: "", releaseYear: "", rating: "", sortBy: "" });
    setIsFiltered(false);
  };

  const filteredTitle = filters.genre
    ? `Filtered Results (${getGenreName(filters.genre)})`
    : "Filtered Results";

  return (
    <div className="movie-list">
      <Banner />

      <Filter
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setIsFiltered(true);
        }}
        onResetFilters={handleResetFilters}
        genres={genres}
      />

      {isFiltered ? (
        <Row
          title={filteredTitle}
          endpoint="/discover/movie"
          params={buildParams()}
        />
      ) : (
        <>
          <Row title="Trending Now" endpoint="/trending/all/week" isLargeRow />
          <Row title="Top Rated" endpoint="/movie/top_rated" />
          <Row title="Action Movies" endpoint="/discover/movie" params={{ with_genres: 28 }} />
          <Row title="Comedy Movies" endpoint="/discover/movie" params={{ with_genres: 35 }} />
        </>
      )}
    </div>
  );
};

export default MovieList;
