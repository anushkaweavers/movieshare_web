"use client";

import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import { useSearchParams } from "next/navigation";
import Filter from "./Filter";
import { useFitler } from "./useFilter";
import MovieList from "../Search/MovieList";

const MovieFilter = () => {
  const searchParams = useSearchParams();
  const { handleQuery, getFilteredMovieList, movieData, callNextPage } =
    useFitler();

  useEffect(() => {
    if (window.location.search) {
      getFilteredMovieList();
    }
  }, [searchParams]);
  return (
    <div>
      <Filter handleQuery={handleQuery} />
      <MovieList movieList={movieData.results} callNextPage={callNextPage} />
    </div>
  );
};

export default MovieFilter;
