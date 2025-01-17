import axiosCustom from "@/Services/AxiosConfig/axiosCustom";
import React, { useState, useEffect } from "react";
import {
  IMovieList,
  IMovieListOfPerson,
  IPersonDetails,
} from "@/Types/Movies/movies.type";

const MovieService = () => {
  const [movies, setMovies] = useState<IMovieList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getPopularMovies = async (query?: string) => {
    setLoading(true);
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/popular?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTopRatedMovies = async (query?: string) => {
    setLoading(true);
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/top_rated?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingMovies = async (query?: string) => {
    setLoading(true);
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/upcoming?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchedMovies = async (query?: string) => {
    setLoading(true);
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/search/movie?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSingleMovieDetails = async (movieId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching single movie details:", error);
    }
  };

  const getCastCrewList = async (movieId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/credits?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching cast and crew:", error);
    }
  };

  const getListOfImagesOfMovie = async (movieId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/images?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const getAvailableVideosOfMovie = async (movieId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/videos?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const getRecommendentMoviesOfAMovie = async (movieId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/recommendations?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    }
  };

  const getSimilarMoviesOfAMovie = async (movieId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/similar?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  const getPersonDetails = async (personId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/person/${personId}?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching person details:", error);
    }
  };

  const getMoviesPerson = async (personId: string, query?: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/person/${personId}/movie_credits?${query}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching person movies:", error);
    }
  };

  const getImagesOfPerson = async (personId: string) => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/person/${personId}/images`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching person images:", error);
    }
  };

  const getGenreList = async () => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/genre/movie/list`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching genre list:", error);
    }
  };

  const getLanguageList = async () => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/configuration/languages`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching language list:", error);
    }
  };

  const getAvailableRoleList = async () => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/configuration/jobs`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching role list:", error);
    }
  };

  const getCountryList = async () => {
    try {
      const data = await axiosCustom.get(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/configuration/countries`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Movie List</h1>
          {/* Render movie data here */}
          {movies?.results?.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieService;
