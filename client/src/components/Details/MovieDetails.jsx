import React, { useEffect, useState, useRef } from "react";
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

  // Refs for each section
  const detailsRef = useRef(null);
  const reviewsRef = useRef(null);
  const trailersRef = useRef(null);
  const castRef = useRef(null);
  const crewRef = useRef(null);
  const releasesRef = useRef(null);
  const playlistsRef = useRef(null);

  const [activeTab, setActiveTab] = useState("Details");

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

  // Scroll listener to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { name: "Details", ref: detailsRef },
        { name: "Reviews", ref: reviewsRef },
        { name: "Trailers", ref: trailersRef },
        { name: "Cast", ref: castRef },
        { name: "Crew", ref: crewRef },
        { name: "Releases", ref: releasesRef },
        { name: "Playlists", ref: playlistsRef },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (
          section.ref.current &&
          scrollPosition >= section.ref.current.offsetTop &&
          scrollPosition < section.ref.current.offsetTop + section.ref.current.offsetHeight
        ) {
          setActiveTab(section.name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          {["Details", "Reviews", "Trailers", "Cast", "Crew", "Releases", "Playlists"].map(
            (tab) => (
              <li
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => {
                  const refMap = {
                    Details: detailsRef,
                    Reviews: reviewsRef,
                    Trailers: trailersRef,
                    Cast: castRef,
                    Crew: crewRef,
                    Releases: releasesRef,
                    Playlists: playlistsRef,
                  };
                  refMap[tab].current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {tab}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Sections */}
      <div ref={detailsRef} className="movie-details__section">
        <h2>Details</h2>
        {/* Additional movie details here */}
      </div>
      <div ref={reviewsRef} className="movie-details__section">
        <h2>Reviews</h2>
        {/* Fetch and display reviews */}
      </div>
      <div ref={trailersRef} className="movie-details__section">
        <h2>Trailers</h2>
        {/* Fetch and display trailers */}
      </div>
      <div ref={castRef} className="movie-details__section">
        <h2>Cast</h2>
        {/* Fetch and display cast */}
      </div>
      <div ref={crewRef} className="movie-details__section">
        <h2>Crew</h2>
        {/* Fetch and display crew */}
      </div>
      <div ref={releasesRef} className="movie-details__section">
        <h2>Releases</h2>
        {/* Fetch and display release info */}
      </div>
      <div ref={playlistsRef} className="movie-details__section">
        <h2>Playlists</h2>
        {/* Fetch and display playlists */}
      </div>
    </div>
  );
};

export default MovieDetails;
