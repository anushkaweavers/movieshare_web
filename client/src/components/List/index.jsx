import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import FakeFilter from "./FakeFilter";
import RowMovieList from "./RowMovieList";
import MovieCarousel from "./MovieCarousel";

// Mock data for movies (Replace with actual API calls when needed)
const mockPopularMovies = {
  results: [
    { id: 1, title: "Movie 1", backdrop_path: "/images/default-backdrop.jpg", overview: "Overview of Movie 1", genre_ids: [28, 35] },
    { id: 2, title: "Movie 2", backdrop_path: "/images/default-backdrop.jpg", overview: "Overview of Movie 2", genre_ids: [18, 28] },
    { id: 3, title: "Movie 3", backdrop_path: "/images/default-backdrop.jpg", overview: "Overview of Movie 3", genre_ids: [16, 12] },
    // More movies here...
  ]
};

const mockTopRatedMovies = {
  results: [
    { id: 1, title: "Top Rated 1", poster_path: "/images/default-poster.jpg", release_date: "2025-01-01" },
    { id: 2, title: "Top Rated 2", poster_path: "/images/default-poster.jpg", release_date: "2025-01-01" },
    { id: 3, title: "Top Rated 3", poster_path: "/images/default-poster.jpg", release_date: "2025-01-01" },
    // More movies here...
  ]
};

const mockUpcomingMovies = {
  results: [
    { id: 1, title: "Upcoming 1", poster_path: "/images/default-poster.jpg", release_date: "2025-02-01" },
    { id: 2, title: "Upcoming 2", poster_path: "/images/default-poster.jpg", release_date: "2025-02-01" },
    { id: 3, title: "Upcoming 3", poster_path: "/images/default-poster.jpg", release_date: "2025-02-01" },
    // More movies here...
  ]
};

const MovieList = () => {
  // Simulate API data loading
  const popularMovieList = mockPopularMovies;
  const topRatedMovies = mockTopRatedMovies;
  const upComingMovies = mockUpcomingMovies;

  return (
    <>
      {/* Movie Carousel */}
      <MovieCarousel movieList={popularMovieList} />

      {/* Fake Filter Section */}
      <FakeFilter />

      {/* Top Rated Movies Row */}
      <RowMovieList
        title="Top Rated"
        allowNum
        movieList={topRatedMovies.results}
      />

      {/* Upcoming Movies Row */}
      <RowMovieList
        title="Upcoming Movies"
        movieList={upComingMovies.results}
      />
    </>
  );
};

export default MovieList;
