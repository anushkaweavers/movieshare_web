import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { TMDBConfig } from "../../../Utils/config";

const BannerSection = ({ movieDetails }) => {
  const [img, setImg] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${movieDetails?.poster_path}`
  );
  const [imgBanner, setImgBanner] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${movieDetails?.backdrop_path}`
  );

  return (
    <>
      {/* Banner Section */}
      <Box
        className="movie-details-banner"
        sx={{ position: "relative", width: "100%", height: "50vh", overflow: "hidden" }}
      >
        <img
          src={imgBanner}
          alt="movie-banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setImgBanner(`/images/movie-default.png`)}
        />
      </Box>

      {/* Movie Details Section */}
      <Box className="movie-details-info" sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* Left Section: Movie Poster */}
          <Grid item xs={12} md={3} className="movie-details-info-lt">
            <Box
              className="movie-details-info-img"
              sx={{ position: "relative", width: "100%", paddingTop: "150%", overflow: "hidden" }}
            >
              <img
                src={img}
                alt="movie-poster"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={() => setImg(`/images/movie-default.png`)}
              />
            </Box>
          </Grid>

          {/* Right Section: Movie Details */}
          <Grid item xs={12} md={9} className="movie-details-info-rt">
            <h2>{movieDetails.title}</h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}>
              <li>{new Date(movieDetails.release_date).getFullYear()}</li>
              <li>{movieDetails.runtime} min</li>
            </ul>
            <p>{movieDetails.overview}</p>

            {/* Desktop Buttons */}
            <Box
              className="movie-details-btn-list movie-details-btn-desktop"
              sx={{ display: { xs: "none", md: "flex" }, gap: 2, marginTop: 2 }}
            >
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

            {/* Mobile Buttons */}
            <Box
              className="movie-details-btn-list movie-details-btn-mobile"
              sx={{ display: { xs: "flex", md: "none" }, gap: 2, marginTop: 2 }}
            >
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
        </Grid>
      </Box>
    </>
  );
};

export default BannerSection;
