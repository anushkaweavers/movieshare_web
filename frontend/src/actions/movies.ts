/**
 * This file contains all server actions related to Movie
 */

"use server";

import axiosCustom from "@/Services/AxiosConfig/axiosCustom";
import {
  IMovieList,
  IMovieListOfPerson,
  IPersonDetails,
} from "@/Types/Movies/movies.type";

/**
 * @endpoint /movie/popular
 * @description This api will return the list of popular movies of current time
 * @availableQueryParams language, page, region
 * @returns List of movies
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-popular-list
 */
export async function getPopularMovies(query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/popular?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data as IMovieList;
}

/**
 * @endpoint /movie/top_rated
 * @description This api will return the list of top rated movies
 * @availableQueryParams language, page, region
 * @returns List of movies
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-top-rated-list
 */
export async function getTopRatedMovies(query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/top_rated?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data as IMovieList;
}

/**
 * @endpoint /movie/upcoming
 * @description This api will return the list of upcoming movies
 * @availableQueryParams language, page, region
 * @returns List of movies
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-top-rated-list
 */
export async function getUpcomingMovies(query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/upcoming?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data as IMovieList;
}

/**
 * @endpoint /search/movie
 * @description This api will return the list of Query searched movies
 * @availableQueryParams query, include_adult, language, primary_release_year, page, region, year
 * @returns List of movies
 * @tmdbDoc https://developer.themoviedb.org/reference/search-movie
 */
export async function getSearchedMovies(query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/search/movie?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data as IMovieList;
}

/**
 * @endpoint /discover/movie
 * @description This api will return the list of filtered and sorted movies
 * @availableQueryParams certification, certification.gte, certification.lte, certification_country, include_adult, include_video, language, page, primary_release_year, primary_release_date.gte, primary_release_date.lte, region, release_date.gte, release_date.lte, sort_by, vote_average.gte, vote_average.lte, vote_count.gte, vote_count.lte, watch_region, with_cast, with_companies, with_crew, with_genres, with_keywords, with_origin_country, with_original_language, with_people, with_release_type, with_runtime.gte, with_runtime.lte, with_watch_monetization_types, with_watch_providers, without_companies, without_genres, without_keywords, without_watch_providers, year
 * @returns List of movies
 * @tmdbDoc https://developer.themoviedb.org/reference/discover-movie
 */
export async function getSearchedMoviesWithFilters(query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/discover/movie?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data as IMovieList;
}

/**
 * @endpoint /movie/{movie_id}
 * @description This api will return the details of a movie
 * @availableQueryParams append_to_response, language
 * @returns Single Movie Details
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-details
 */
export async function getSingleMovieDetails(movieId: string, query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data;
}

/**
 * @endpoint /movie/{movie_id}/credits
 * @description This api will return the cast and crew list of a movie
 * @availableQueryParams language
 * @returns Cast and crew details of a movie
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-credits
 */
export async function getCastCrewList(movieId: string, query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/credits?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data;
}

/**
 * @endpoint /movie/{movie_id}/images
 * @description This api will return All types of images of a movie
 * @availableQueryParams include_image_language, language
 * @returns List of images linked to a movie
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-images
 */
export async function getListOfImagesOfMovie(movieId: string, query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/images?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}

/**
 * @endpoint /movie/{movie_id}/videos
 * @description This api will return All types of videos of a movie
 * @availableQueryParams language
 * @returns List of videos linked to a movie
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-videos
 */
export async function getAvailableVideosOfMovie(
  movieId: string,
  query?: string
) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/videos?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data;
}

/**
 * @endpoint /movie/{movie_id}/recommendations
 * @description This api will return list of movies those are recommended for current movie
 * @availableQueryParams language, page
 * @returns List of recommended movies under a movie
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-recommendations
 */
export async function getRecommendentMoviesOfAMovie(
  movieId: string,
  query?: string
) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/recommendations?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}

/**
 * @endpoint /movie/{movie_id}/similar
 * @description This api will return list of movies those are similar for current movie
 * @availableQueryParams language, page
 * @returns List of similar movies under a movie
 * @tmdbDoc https://developer.themoviedb.org/reference/movie-similar
 */
export async function getSimilarMoviesOfAMovie(
  movieId: string,
  query?: string
) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/similar?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}

/**
 * @endpoint /person/{person_id}
 * @description This api will return the details of a person
 * @availableQueryParams append_to_response, language
 * @returns Person details
 * @tmdbDoc https://developer.themoviedb.org/reference/person-details
 */
export async function getPersonDetails(personId: string, query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/person/${personId}?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data as IPersonDetails;
}

/**
 * @endpoint /person/{person_id}/movie_credits
 * @description This api will return the list of movies of a person
 * @availableQueryParams language
 * @returns Movies of a person
 * @tmdbDoc https://developer.themoviedb.org/reference/person-movie-credits
 */
export async function getMoviesPerson(personId: string, query?: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/person/${personId}/movie_credits?${query}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data.data as IMovieListOfPerson;
}

/**
 * @endpoint /person/{person_id}/images
 * @description This api will return the list of images of a person
 * @availableQueryParams null
 * @returns Images of a person
 * @tmdbDoc https://developer.themoviedb.org/reference/person-images
 */
export async function getImagesOfPerson(personId: string) {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/person/${personId}/images`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}

/**
 * @endpoint /genre/movie/list
 * @description This api will return the list of Genre
 * @availableQueryParams null
 * @returns List of Genre list
 * @tmdbDoc https://developer.themoviedb.org/reference/genre-movie-list
 */
export async function getGenreList() {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/genre/movie/list`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}

/**
 * @endpoint /configuration/languages
 * @description This api will return the list of Languages available
 * @availableQueryParams null
 * @returns List of language list
 * @tmdbDoc https://developer.themoviedb.org/reference/configuration-languages
 */
export async function getLanguageList() {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/configuration/languages`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}

/**
 * @endpoint /configuration/jobs
 * @description This api will return the list of Professional roles available
 * @availableQueryParams null
 * @returns List of professional roles list
 * @tmdbDoc https://developer.themoviedb.org/reference/configuration-jobs
 */
export async function getAvailableRoleList() {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/configuration/jobs`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}

/**
 * @endpoint /configuration/countries
 * @description This api will return the list of country available
 * @availableQueryParams null
 * @returns List of country list
 * @tmdbDoc https://developer.themoviedb.org/reference/configuration-countries
 */
export async function getCountryList() {
  const data = await axiosCustom.get(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/configuration/countries`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  );
  return data;
}
