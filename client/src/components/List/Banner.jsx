// src/components/MovieList/Banner.js
import React from 'react';
import { Box, Button, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const Banner = ({ movies }) => {
  return (
    <Box className="movie-banner">
      <Swiper
        slidesPerView={1}
        loop
        pagination={{
          clickable: true,
        }}
        className="movieBannerSwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Box className="movie-banner-inner">
              <Box className="movie-banner-img-holder">
                <img
                  fill
                  src={`${process.env.REACT_APP_TMDB_IMAGE_URL}/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  objectFit="cover"
                />
              </Box>
              <Box className="movie-banner-info">
                <Container maxWidth="xl">
                  <Box className="movie-banner-info-inner">
                    <Box className="movie-tag">Sci-Fi</Box>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <Box className="d-flex movie-bnr-btn">
                      <Button className="p-btn">
                        Movie Details
                        <img
                          width={17}
                          height={15}
                          src="/images/right-arrow.svg"
                          alt=""
                        />
                      </Button>
                      <Box className="add-to-playlist-btn">
                        <Button className="add-to-playlist p-btn border-btn">
                          Add to Playlist
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
