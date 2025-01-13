import { ICastList, ISingleMovieDetails } from "@/Types/Movies/movies.type";
import { TMDBConfig } from "@/Utils/config";
import { Box, Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface IMovieDetailsSec {
  movieCastCrew: ICastList;
  movieDetails: ISingleMovieDetails;
}

const Details = (props: IMovieDetailsSec) => {
  const { movieCastCrew, movieDetails } = props;
  const router = useRouter();
  const gotoPersonDetails = (id: number) => {
    router.push(`/person/${id}`);
  };
  return (
    <Box
      id='details_sec'
      className='movie-details-info-tab-content movie-details-tab1'
    >
      <h3>Details</h3>

      <Grid2 container spacing={2}>
        <Grid2
          size={{ xs: 12, md: 6, lg: 6 }}
          className='movie-details-tab1-lt'
        >
          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Director</p>
            <ul className='movie-tag-list'>
              {movieCastCrew.crew
                .filter((item) => item.job === "Director")
                .map((dir) => (
                  <li
                    onClick={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    className='movie-tag pointer'
                    onKeyUp={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    tabIndex={0}
                    role='button'
                  >
                    {dir.name}
                  </li>
                ))}
            </ul>
          </Box>

          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Language</p>
            <p>
              {
                TMDBConfig.lang.find(
                  (item) => item.iso_639_1 === movieDetails.original_language
                )?.english_name
              }
            </p>
          </Box>

          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Studio</p>
            {movieDetails.production_companies.map((comp) => {
              return <p>{comp.name}</p>;
            })}
          </Box>
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 6, lg: 6 }}
          className='movie-details-tab1-rt'
        >
          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Genres</p>
            <ul className='movie-tag-list'>
              {movieDetails.genres.map((genre) => {
                return <li className='movie-tag'>{genre.name}</li>;
              })}
            </ul>
          </Box>
          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Tags</p>
            <p>Coming Soon</p>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Details;
