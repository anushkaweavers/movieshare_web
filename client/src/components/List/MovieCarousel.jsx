// src/components/MovieList/MovieCarousel.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const MovieCarousel = ({ title, movies }) => {
  return (
    <Box className="movie-carousel">
      <Typography variant="h4">{title}</Typography>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        loop
        className="movieCarouselSwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Box className="movie-card">
              <img
                src={`${process.env.REACT_APP_TMDB_IMAGE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                objectFit="cover"
              />
              <Box className="movie-info">
                <Typography variant="h6">{movie.title}</Typography>
                <Button variant="contained" color="primary">
                  Movie Details
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MovieCarousel;
