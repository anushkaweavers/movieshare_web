import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react"; // Corrected import
import "swiper/css";
import "./MovieDetails.css";
import { useNavigate } from 'react-router-dom';

const API_KEY = "41b7e34d009af460e22e4a8e91279433";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


function MovieDetails() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [releases, setReleases] = useState([]); // Define releases state
  const [director, setDirector] = useState(null);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const [setPlaylists] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const toggleCrewVisibility = () => {
    setShowAllCrew((prev) => !prev);
  };

  // Refs for each section
  const detailsRef = useRef(null);
  const reviewsRef = useRef(null);
  const trailersRef = useRef(null);
  const castRef = useRef(null);
  const crewRef = useRef(null);
  const releasesRef = useRef(null);
  const playlistsRef = useRef(null);
  const navigate = useNavigate();
  const handleClick = (movieId) => {
    navigate(`/movie/${movieId}`, { state: { scrollToTop: true } });
    window.scrollTo(0, 0); // Scroll to the top when the movie is clicked
  };

  const [activeTab, setActiveTab] = useState("DETAILS");
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details and credits concurrently
        const [movieResponse, creditsResponse] = await Promise.all([
          apiClient.get(`/movie/${id}`),
          apiClient.get(`/movie/${id}/credits`),
        ]);

        // Set movie details and include credits
        setMovie({
          ...movieResponse.data,
          credits: creditsResponse.data, // Include cast and crew in movie state
        });

        // Extract and set the director name
        const director = creditsResponse.data.crew.find(
          (crew) => crew.job === "Director"
        );
        setDirector(director?.name || "Unknown");

        // Fetch and set keywords
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

    const fetchTrailers = async () => {
      try {
        const response = await apiClient.get(`/movie/${id}/videos`);
        const filteredTrailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailers(filteredTrailers);
      } catch (error) {
        console.error("Error fetching movie trailers:", error);
      }
    };

    const fetchReleases = async () => {
      try {
        const response = await apiClient.get(`/movie/${id}/release_dates`);
        setReleases(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movie releases:", error);
      }
    };

    const fetchPlaylists = async () => {
      try {
        // Replace with your API call for playlists if applicable
        setPlaylists(["My Favorite Movies", "Watchlist", "Oscar Winners"]);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    const fetchSimilarMovies = async () => {
      try {
        const response = await apiClient.get(`/movie/${id}/similar`);
        setSimilarMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchMovieDetails();
    fetchReviews();
    fetchTrailers();
    fetchReleases();
    fetchPlaylists();
    fetchSimilarMovies();
  }, [id]);

  useEffect(() => {
    const sections = [
      { name: "DETAILS", ref: detailsRef },
      { name: "REVIEWS", ref: reviewsRef },
      { name: "TRAILERS", ref: trailersRef },
      { name: "CAST", ref: castRef },
      { name: "CREW", ref: crewRef },
      { name: "RELEASES", ref: releasesRef },
      { name: "SIMILAR MOVIES", ref: playlistsRef },
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
          alt={movie.title} />

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

      <div className="movie-details__tabs">
        <ul>
          {["DETAILS", "REVIEWS", "TRAILERS", "CAST", "CREW", "RELEASES", "SIMILAR MOVIES"].map((tab) => (
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
                  "SIMILAR MOVIES": playlistsRef, // Fix: Quotes around "SIMILAR MOVIES"
                };
                refMap[tab]?.current?.scrollIntoView({ behavior: "smooth" }); // Ensure refs are optional chained
              } }
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>


      {/* Details Section */}
      <div ref={detailsRef} className="movie-details__section" data-section="DETAILS">
        <h2>Details</h2>
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

      {/* Reviews Section */}
      <div ref={reviewsRef} className="movie-details__section" data-section="REVIEWS">
        <h2>Movie Sharer’s Reviews</h2>
        <div className="score-and-action">
          <div className="scores-row">
            <p className="total-score">
              Total Score: ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>
            <span className="score-item">Based on {movie.vote_count} votes</span>
          </div>
          <button className="write-review-button">
            <i className="fas fa-comment-dots"></i> Write a Review
          </button>
        </div>

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-left">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="review-poster"
                    onError={(e) => (e.target.src = "/images/default-poster.jpg")} />
                </div>
                <div className="review-card-right">
                  <div className="review-header">
                    <img
                      src={review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                        : "/images/default-avatar.png"}
                      alt={review.author || "Anonymous"}
                      className="review-avatar"
                      onError={(e) => (e.target.src = "/images/default-avatar.png")} />
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
                      onClick={() => window.open(`https://www.themoviedb.org/review/${review.id}`, "_blank")}
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

      {/* Trailers Section */}
      <div ref={trailersRef} className="movie-details__section trailers-section" data-section="TRAILERS">
        <h2 className="trailers-title">Trailers</h2>
        <div className="trailers-line"></div>

        {trailers.length > 0 ? (
          <>
            {/* Highlighted Trailer */}
            <div className="trailers-highlight">
              <iframe
                src={`https://www.youtube.com/embed/${trailers[0].key}`}
                title={trailers[0].name}
                className="highlighted-trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                className="youtube-button"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${trailers[0].key}`, "_blank")}
              ></button>
            </div>

            {/* Swiper for other trailers */}
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              className="trailers-swiper"
            >
              {trailers.slice(1).map((trailer) => (
                <SwiperSlide key={trailer.id} className="trailer-slide">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    className="swiper-trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p className="trailer-name">{trailer.name}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <p className="no-trailers">No trailers available for this movie.</p>
        )}
      </div>
      {/* Cast Section */}
      <div ref={castRef} className="movie-details__section cast-section" data-section="CAST">
        <h2 className="section-title">Cast</h2>
        <div className="section-line"></div>
        {movie.credits?.cast && movie.credits.cast.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={6}
            navigation
            className="cast-swiper"
          >
            {movie.credits.cast.map((actor) => (
              <SwiperSlide key={actor.id} className="cast-slide">
                <div className="cast-item">
                  <img
                    src={actor.profile_path
                      ? `${IMAGE_BASE_URL}${actor.profile_path}`
                      : "/images/default-avatar.png" // Fallback image for missing profile
                    }
                    alt={actor.name}
                    className="cast-image"
                    onError={(e) => (e.target.src = "/images/default-avatar.png")} // Fallback on error
                  />
                  <p className="cast-name">{actor.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-data">No cast information available.</p>
        )}
      </div>

      {/* Crew Section */}
      <div className="movie-details__section crew-section" data-section="CREW">
        <h2 className="section-title">Crew</h2>
        <div className="section-line"></div>
        {movie.credits?.crew && movie.credits.crew.length > 0 ? (
          <div>
            <div
              className="crew-roles"
              style={{ maxHeight: showAllCrew ? "none" : "150px" }}
            >
              {Object.entries(
                movie.credits.crew.reduce((acc, crewMember) => {
                  if (!acc[crewMember.job]) acc[crewMember.job] = [];
                  acc[crewMember.job].push(crewMember.name);
                  return acc;
                }, {})
              ).map(([role, names]) => (
                <div key={role} className="crew-role">
                  <strong>{role}</strong>
                  <div className="crew-names">
                    {names.map((name, index) => (
                      <span key={index} className="crew-name">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="see-all-button" onClick={toggleCrewVisibility}>
              {showAllCrew ? "Show Less" : "See All"}
            </button>
          </div>
        ) : (
          <p className="no-data">No crew information available.</p>
        )}
      </div>
      {/* Releases Section */}
      <div ref={releasesRef} className="movie-details__section releases-section" data-section="RELEASES">
        <h2 className="section-title">Releases</h2>
        {releases.length > 0 ? (
          <Swiper
            spaceBetween={16}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            className="release-swiper"
          >
            {releases.map((release) => (
              <SwiperSlide key={release.iso_3166_1}>
                <div className="release-card">
                  <img
                    src={`/images/release-icon.png`} // Replace with your image path
                    alt="Release Icon"
                    className="release-icon" />
                  <div className="release-info">
                    <strong>{release.iso_3166_1}:</strong>
                    {release.release_dates.map((date) => (
                      <div key={date.certification} className="release-date-cert">
                        <span className="release-date">
                          {date.release_date.split("T")[0]}
                        </span>{" "}
                        -{" "}
                        <span className="release-certification">
                          {date.certification || "Unrated"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-info">No release information available.</p>
        )}

      </div>

      <div ref={playlistsRef} className="movie-details__section similar-movies-section" data-section="SIMILAR_MOVIES">
        <h2 className="section-title">Similar Movies</h2>
        {similarMovies.length > 0 ? (
          <Swiper
            spaceBetween={20} // Space between slides
            slidesPerView={3} // Number of slides visible at once
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 1,
              },
            }}
          >
            {similarMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="similar-movie-item">
                <div className="movie-card">
                  <div onClick={() => handleClick(movie.id)} className="movie-link">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB poster image URL
                      alt={`${movie.title} Poster`}
                      className="movie-poster" />
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <p className="movie-release-date">{movie.release_date}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-info">No similar movies available.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;