import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/actions/movies";
import FakeFilter from "./FakeFilter";
import RowMovieList from "./RowMovieList";
import MovieCarousel from "./MovieCarousel";

const MovieList = async () => {
  const popularMovieList = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upComingMovies = await getUpcomingMovies();
  return (
    <>
      <MovieCarousel movieList={popularMovieList} />
      <FakeFilter />
      <RowMovieList
        title='Top Rated'
        allowNum
        movieList={topRatedMovies.results}
      />
      <RowMovieList
        title='Upcoming Movies'
        movieList={upComingMovies.results}
      />
    </>
  );
};

export default MovieList;
