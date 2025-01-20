import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const MovieCarousel = ({ movieList }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoDetails = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <Box className="movie-banner">
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="movieBannerSwiper"
      >
        {movieList?.results.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Box className="movie-banner-inner">
                <Box className="movie-banner-img-holder">
                  <img
                    src={`${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.backdrop_sizes[2]}${item?.backdrop_path}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box className="movie-banner-info">
                  <Container maxWidth="xl">
                    <Box className="movie-banner-info-inner">
                      <Box className="movie-tag-list">
                        {item.genre_ids?.map((genre) => {
                          return (
                            <Box key={genre} className="movie-tag">
                              <span>
                                {
                                  TMDBConfig.genres.find((sGenre) => {
                                    return sGenre.id === genre;
                                  })?.name
                                }
                              </span>
                            </Box>
                          );
                        })}
                      </Box>
                      <h2>{item?.title}</h2>
                      <p>{item?.overview}</p>
                      <Box className="d-flex movie-bnr-btn">
                        <Button
                          className="p-btn"
                          onClick={() => gotoDetails(item.id)}
                        >
                          Movie Details
                        </Button>

                        <Box className="add-to-playlist-btn">
                          <ButtonGroup className="custom-btn-group">
                            <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                              Add to Playlist
                            </Button>
                            <Button>
                              <KeyboardArrowDownOutlinedIcon />
                            </Button>
                          </ButtonGroup>

                          <Menu
                            className="playlist-dropdown"
                            id="basic-menu1"
                            anchorEl={anchorEl}
                            open={openDropdown}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button1",
                            }}
                          >
                            <MenuItem onClick={handleClose}>Watchlist</MenuItem>
                            <MenuItem onClick={handleClose}>
                              Fav Horror movies
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              Cusser movies
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              Create new list
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default MovieCarousel;
