import { Box, Button, ButtonGroup, Grid2, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ISingleMovieDetails } from "@/Types/Movies/movies.type";
import { TMDBConfig } from "@/Utils/config";

const BannerSection = ({
  movieDetails,
}: {
  movieDetails: ISingleMovieDetails;
}) => {
  const [img, setImg] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${movieDetails?.poster_path}`
  );
  const [imgBanner, setImgBanner] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${movieDetails?.backdrop_path}`
  );
  return (
    <>
      <Box className='movie-details-banner'>
        <Image
          objectFit='cover'
          fill
          src={`${imgBanner}`}
          alt='movie-banner'
          placeholder='blur'
          blurDataURL='/images/movie-default.png'
          onError={() => setImgBanner(`/images/movie-default.png`)}
        />
      </Box>

      <Box className='movie-details-info'>
        <Grid2 container>
          <Grid2
            size={{ xs: 4, md: 3, lg: 3 }}
            className='movie-details-info-lt'
          >
            <Box className='movie-details-info-img'>
              <Image
                fill
                src={`${img}`}
                alt='movie-poster'
                placeholder='blur'
                blurDataURL='/images/movie-default.png'
                onError={() => setImg(`/images/movie-default.png`)}
                objectFit='cover'
              />
            </Box>
          </Grid2>

          <Grid2
            size={{ xs: 8, md: 9, lg: 9 }}
            className='movie-details-info-rt'
          >
            <h2>{movieDetails.title}</h2>
            <ul>
              <li>{new Date(movieDetails.release_date).getFullYear()}</li>
              <li>{movieDetails.runtime} min</li>
            </ul>
            <p>{movieDetails.overview}</p>

            <Box className='movie-details-btn-list movie-details-btn-desktop'>
              <Button
                className='p-btn'
                disabled
                startIcon={<MovieCreationOutlinedIcon />}
              >
                Rent Movie ($0.99)
              </Button>

              <ButtonGroup className='custom-btn-group'>
                <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                  Add to Playlist
                </Button>
                <Button>
                  <KeyboardArrowDownOutlinedIcon />
                </Button>
              </ButtonGroup>

              <IconButton aria-label='favorite' size='large'>
                <FavoriteBorderOutlinedIcon fontSize='inherit' />
              </IconButton>
            </Box>
          </Grid2>

          <Box className='movie-details-btn-list movie-details-btn-mobile'>
            <Button
              className='p-btn'
              disabled
              startIcon={<MovieCreationOutlinedIcon />}
            >
              Rent Movie ($0.99)
            </Button>

            <ButtonGroup className='custom-btn-group'>
              <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                Add to Playlist
              </Button>
              <Button>
                <KeyboardArrowDownOutlinedIcon />
              </Button>
            </ButtonGroup>

            <IconButton aria-label='favorite' size='large'>
              <FavoriteBorderOutlinedIcon fontSize='inherit' />
            </IconButton>
          </Box>
        </Grid2>
      </Box>
    </>
  );
};

export default BannerSection;
