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
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Pagination } from "swiper/modules";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
console.log("API KEY:", process.env.REACT_APP_API_KEY);
console.log("BASE URL:", process.env.REACT_APP_BASE_URL);
console.log("IMAGE BASE URL:", process.env.REACT_APP_IMAGE_BASE_URL);

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

const Banner = () => {
  const [movies, setMovies] = useState([]);

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
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop
      >
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
                  <Link to={`/movie/${movie.id}`}>
                    <button className="banner__button">Movie Details →</button>
                  </Link>
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
};

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
            <Link to={`/movie/${movie.id}`}>
              <img
                className={`movie-row__poster ${isLargeRow ? "movie-row__posterLarge" : ""}`}
                src={`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.title || movie.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

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
