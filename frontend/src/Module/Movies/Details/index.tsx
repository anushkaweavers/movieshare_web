"use client";

import {
  ICastList,
  ISingleMovieDetails,
  IVideoDetailsResult,
} from "@/Types/Movies/movies.type";
import React from "react";
import { Container } from "@mui/material";
import BannerSection from "./BannerSection";
import Details from "./Details";
import Cast from "./Cast";
import Crew from "./Crew";
import TabSection from "./TabSection";
import Trailers from "./Trailers";
import Playlist from "./Playlist";
import Review from "./Review";

interface IMovieDetails {
  movieDetails: ISingleMovieDetails;
  movieVidoes: IVideoDetailsResult;
  movieCastCrew: ICastList;
}

const MovieDetails = (props: IMovieDetails) => {
  const { movieDetails, movieVidoes, movieCastCrew } = props;
  return (
    <Container className='movie-details-container'>
      <BannerSection movieDetails={movieDetails} />
      <TabSection />
      <Details movieDetails={movieDetails} movieCastCrew={movieCastCrew} />
      <Review />
      {movieVidoes.results.length ? (
        <Trailers movieVidoes={movieVidoes} />
      ) : null}
      <Cast movieCastCrew={movieCastCrew} />
      <Crew movieCastCrew={movieCastCrew} />
      <Playlist />
    </Container>
  );
};

export default MovieDetails;
