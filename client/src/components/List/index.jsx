import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/actions/movies";
import FakeFilter from "./FakeFilter";
import RowMovieList from "./RowMovieList";
import MovieCarousel from "./MovieCarousel";

const MovieList = () => {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = await getPopularMovies();
      const topRated = await getTopRatedMovies();
      const upcoming = await getUpcomingMovies();

      setPopularMovieList(popularMovies);
      setTopRatedMovies(topRated.results);
      setUpComingMovies(upcoming.results);
    };

    fetchData();
  }, []);

  return (
    <>
      <MovieCarousel movieList={popularMovieList} />
      <FakeFilter />
      <RowMovieList
        title="Top Rated"
        allowNum
        movieList={topRatedMovies}
      />
      <RowMovieList
        title="Upcoming Movies"
        movieList={upComingMovies}
      />
    </>
  );
};

export default MovieList;
