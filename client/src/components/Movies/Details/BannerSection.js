import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { TMDBConfig } from "../../../Utils/config";

// JSX version without TypeScript typings
const BannerSection = ({ movieDetails }) => {
  const [img, setImg] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${movieDetails?.poster_path}`
  );
  const [imgBanner, setImgBanner] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${movieDetails?.backdrop_path}`
  );

  return (
    <>
      <Box className="movie-details-banner">
        <img
          src={imgBanner}
          alt="movie-banner"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          onError={() => setImgBanner("/images/movie-default.png")}
        />
      </Box>

      <Box className="movie-details-info">
        <Grid container>
          <Grid item xs={4} md={3} lg={3} className="movie-details-info-lt">
            <Box className="movie-details-info-img">
              <img
                src={img}
                alt="movie-poster"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                onError={() => setImg("/images/movie-default.png")}
              />
            </Box>
          </Grid>

          <Grid item xs={8} md={9} lg={9} className="movie-details-info-rt">
            <h2>{movieDetails.title}</h2>
            <ul>
              <li>{new Date(movieDetails.release_date).getFullYear()}</li>
              <li>{movieDetails.runtime} min</li>
            </ul>
            <p>{movieDetails.overview}</p>

            <Box className="movie-details-btn-list movie-details-btn-desktop">
              <Button
                className="p-btn"
                disabled
                startIcon={<MovieCreationOutlinedIcon />}
              >
                Rent Movie ($0.99)
              </Button>

              <ButtonGroup className="custom-btn-group">
                <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                  Add to Playlist
                </Button>
                <Button>
                  <KeyboardArrowDownOutlinedIcon />
                </Button>
              </ButtonGroup>

              <IconButton aria-label="favorite" size="large">
                <FavoriteBorderOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Grid>

          <Box className="movie-details-btn-list movie-details-btn-mobile">
            <Button
              className="p-btn"
              disabled
              startIcon={<MovieCreationOutlinedIcon />}
            >
              Rent Movie ($0.99)
            </Button>

            <ButtonGroup className="custom-btn-group">
              <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                Add to Playlist
              </Button>
              <Button>
                <KeyboardArrowDownOutlinedIcon />
              </Button>
            </ButtonGroup>

            <IconButton aria-label="favorite" size="large">
              <FavoriteBorderOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default BannerSection;
