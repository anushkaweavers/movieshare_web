import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";
import "react-datepicker/dist/react-datepicker.css";
import "../responsive.css";
import "../dark.css";
import "../developer.css";
import Navbar from "../Navbar/Navbar";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

const fetchData = async (endpoints) => {
  try {
    const responses = await Promise.all(
      endpoints.map((endpoint) => apiClient.get(endpoint))
    );
    return responses.map((res) => res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Banner = lazy(() => Promise.resolve({
  default: React.memo(({ movies }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    if (!movies || movies.length === 0) return null;

    const handleNavigation = (movieId) => {
      setLoading(true);
      setTimeout(() => navigate(`/movie/${movieId}`), 100);
    };

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
                  <h1 className="banner__title">{movie.title || movie.name}</h1>
                  <div className="banner__buttons">
                    <button className="banner__button" onClick={() => handleNavigation(movie.id)} disabled={loading}>
                      {loading ? <CircularProgress size={20} color="inherit" /> : "Movie Details →"}
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
  }),
}));

const Row = lazy(() => Promise.resolve({
  default: React.memo(({ title, movies, isLargeRow = false, likedMovieIds, onLike }) => {
    const navigate = useNavigate();
    const handleNavigate = (movieId, e) => {
      e.stopPropagation();
      navigate(`/movie/${movieId}`);
    };

    return (
      <div className="movie-row">
        <h2 className="movie-row__title">{title}</h2>
        <Swiper modules={[Navigation, Scrollbar]} navigation scrollbar={{ draggable: true }} spaceBetween={10} slidesPerView={isLargeRow ? 6 : 5}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div style={{ position: "relative", cursor: "pointer" }} onClick={(e) => handleNavigate(movie.id, e)}>
                <img className={`movie-row__poster ${isLargeRow ? "movie-row__posterLarge" : ""}`} src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title || movie.name} loading="lazy" />
                <Tooltip title={likedMovieIds.has(movie.id) ? "Unlike" : "Like"}>
                  <IconButton onClick={(e) => { e.stopPropagation(); onLike(movie.id); }} style={{ position: "absolute", top: 10, right: 10, color: likedMovieIds.has(movie.id) ? "red" : "white" }}>
                    {likedMovieIds.has(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }),
}));

const MovieList = () => {
  const [movies, setMovies] = useState({ trending: [], topRated: [], upcoming: [], nowPlaying: [] });
  const [likedMovies, setLikedMovies] = useState([]);
  const [likedMovieIds, setLikedMovieIds] = useState(new Set());

  useEffect(() => {
    const fetchMovies = async () => {
      const [trending, topRated, upcoming, nowPlaying] = await fetchData([
        "/trending/movie/week",
        "/movie/top_rated",
        "/movie/upcoming",
        "/movie/now_playing",
      ]);
      setMovies({ trending: trending.results, topRated: topRated.results, upcoming: upcoming.results, nowPlaying: nowPlaying.results });
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const response = await axiosCustom.get("/like/liked-movies");
        if (response.status === 200) {
          const likedIds = new Set(response.data.map((item) => item.movieId));
          setLikedMovieIds(likedIds);
          const likedDetails = await Promise.all([...likedIds].map((id) => fetchData([`/movie/${id}`])));
          setLikedMovies(likedDetails.map(res => res[0]));
        }
      } catch (error) {
        console.error("Error fetching liked movies:", error);
      }
    };
    fetchLikedMovies();
  }, []);

  // Handle like/unlike functionality
  const handleLike = async (movieId) => {
    try {
      const endpoint = likedMovieIds.has(movieId) ? "/like/unlike" : "/like/like";
      const response = await axiosCustom.post(endpoint, { movieId });

      if (response.status === 200) {
        // Update likedMovieIds state
        setLikedMovieIds((prev) => {
          const newLikedMovieIds = new Set(prev);
          if (newLikedMovieIds.has(movieId)) {
            newLikedMovieIds.delete(movieId);
          } else {
            newLikedMovieIds.add(movieId);
          }
          return newLikedMovieIds;
        });

        // Update likedMovies state
        if (likedMovieIds.has(movieId)) {
          setLikedMovies((prev) => prev.filter((movie) => movie.id !== movieId));
        } else {
          const movieDetails = await fetchData([`/movie/${movieId}`]);
          setLikedMovies((prev) => [...prev, movieDetails[0]]);
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="movie-list">
      <Navbar />
      <Suspense fallback={<CircularProgress />}>
        {/* Banner with at least 5 movies */}
        <Banner movies={movies.trending.slice(0, 5)} />

        {/* Movies Liked by You (limited to 10 movies) */}
        {likedMovies.length > 0 && (
          <div className="liked-movies-section">
            <Row
              title="Movies Liked by You"
              movies={likedMovies.slice(0, 10)}
              isLargeRow={true}
              likedMovieIds={likedMovieIds}
              onLike={handleLike}
            />
            <Link to="/liked-movies" className="see-all-link">
              See All →
            </Link>
          </div>
        )}

        {/* Other movie rows */}
        <Row
          title="Trending Movies"
          movies={movies.trending}
          likedMovieIds={likedMovieIds}
          onLike={handleLike}
        />
        <Row
          title="Top Rated Movies"
          movies={movies.topRated}
          likedMovieIds={likedMovieIds}
          onLike={handleLike}
        />
        <Row
          title="Upcoming Movies"
          movies={movies.upcoming}
          likedMovieIds={likedMovieIds}
          onLike={handleLike}
        />
        <Row
          title="Now Playing"
          movies={movies.nowPlaying}
          likedMovieIds={likedMovieIds}
          onLike={handleLike}
        />
      </Suspense>
    </div>
  );
};

export default MovieList;