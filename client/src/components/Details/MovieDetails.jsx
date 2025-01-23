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
  const [keywords, setKeywords] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [director, setDirector] = useState(null);

  // Refs for each section
  const detailsRef = useRef(null);
  const reviewsRef = useRef(null);
  const trailersRef = useRef(null);
  const castRef = useRef(null);
  const crewRef = useRef(null);
  const releasesRef = useRef(null);
  const playlistsRef = useRef(null);

  const [activeTab, setActiveTab] = useState("DETAILS");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await apiClient.get(`/movie/${id}`);
        setMovie(response.data);

        const creditsResponse = await apiClient.get(`/movie/${id}/credits`);
        const director = creditsResponse.data.crew.find(
          (crew) => crew.job === "Director"
        );
        setDirector(director?.name || "Unknown");

        const keywordsResponse = await apiClient.get(`/movie/${id}/keywords`);
        setKeywords(keywordsResponse.data.keywords || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(`/movie/${id}/reviews`);
        setReviews(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchMovieDetails();
    fetchReviews();
  }, [id]);

  // Intersection Observer to track section visibility and update active tab
  useEffect(() => {
    const sections = [
      { name: "DETAILS", ref: detailsRef },
      { name: "REVIEWS", ref: reviewsRef },
      { name: "TRAILERS", ref: trailersRef },
      { name: "CAST", ref: castRef },
      { name: "CREW", ref: crewRef },
      { name: "RELEASES", ref: releasesRef },
      { name: "PLAYLISTS", ref: playlistsRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.getAttribute("data-section"));
          }
        });
      },
      {
        rootMargin: "-50% 0px", // Trigger when a section is half in the viewport
      }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
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
          {["DETAILS", "REVIEWS", "TRAILERS", "CAST", "CREW", "RELEASES", "PLAYLISTS"].map(
            (tab) => (
              <li
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => {
                  const refMap = {
                    DETAILS: detailsRef,
                    REVIEWS: reviewsRef,
                    TRAILERS: trailersRef,
                    CAST: castRef,
                    CREW: crewRef,
                    RELEASES: releasesRef,
                    PLAYLISTS: playlistsRef,
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

      <div ref={detailsRef} className="movie-details__section" data-section="DETAILS">
  <h2>Details</h2>

  {/* Left Side */}
  <div className="details-left">
    <div>
      <strong>Director:</strong> {director}
    </div>
    <div>
      <strong>Languages:</strong>{" "}
      {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
    </div>
    <div>
      <strong>Studio:</strong>{" "}
      {movie.production_companies.map((company) => company.name).join(", ")}
    </div>
  </div>

  {/* Right Side */}
  <div className="details-right">
    <div className="genres">
      <strong>Genres:</strong>{" "}
      {movie.genres.map((genre) => (
        <span key={genre.id} className="genre-tag">
          {genre.name}
        </span>
      ))}
    </div>
    <div className="tags">
      <strong>Tags:</strong> {keywords.map((keyword) => keyword.name).join(", ")}
    </div>
  </div>
</div>

<div ref={reviewsRef} className="movie-details__section" data-section="REVIEWS">
  <h2>Movie Sharer’s Reviews</h2>

  {/* Total Score and Write a Review Button */}
  <div className="score-and-action">
    {/* Scores */}
    <div className="scores-row">
      <p className="total-score">Total Score: ⭐ 6 / 10</p>
      <span className="score-item">Plot 4/10</span>
      <span className="score-item">Story 6/10</span>
      <span className="score-item">Characters 6/10</span>
      <span className="score-item">Cinematography 4/10</span>
      <span className="score-item">Pacing 4/10</span>
    </div>
    {/* Write a Review Button */}
    <button className="write-review-button">
      <i className="fas fa-comment-dots"></i> Write a Review
    </button>
  </div>

  {/* Reviews */}
  <div className="reviews-list">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-card-left">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="review-poster"
              onError={(e) => (e.target.src = "/images/default-poster.jpg")}
            />
          </div>
          <div className="review-card-right">
            <div className="review-header">
              <img
                src={
                  review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                    : "/images/default-avatar.png"
                }
                alt={review.author || "Anonymous"}
                className="review-avatar"
                onError={(e) => (e.target.src = "/images/default-avatar.png")}
              />
              <div>
                <p className="review-author">{review.author || "Anonymous"}</p>
                <p className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="review-score">
                {review.author_details.rating || "N/A"} / 10 ⭐
              </p>
            </div>
            <div className="review-body">
              <p className="review-content">
                “{review.content ? review.content.slice(0, 150) : "No review content available."}...”
              </p>
              <button
                className="read-more"
                onClick={() =>
                  window.open(`https://www.themoviedb.org/review/${review.id}`, "_blank")
                }
              >
                Read more
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No reviews available for this movie.</p>
    )}
  </div>
</div>


      <div ref={trailersRef} className="movie-details__section" data-section="TRAILERS">
        <h2>Trailers</h2>
      </div>
      <div ref={castRef} className="movie-details__section" data-section="CAST">
        <h2>Cast</h2>
      </div>
      <div ref={crewRef} className="movie-details__section" data-section="CREW">
        <h2>Crew</h2>
      </div>
      <div ref={releasesRef} className="movie-details__section" data-section="RELEASES">
        <h2>Releases</h2>
      </div>
      <div ref={playlistsRef} className="movie-details__section" data-section="PLAYLISTS">
        <h2>Playlists</h2>
      </div>
    </div>
  );
};

export default MovieDetails;
