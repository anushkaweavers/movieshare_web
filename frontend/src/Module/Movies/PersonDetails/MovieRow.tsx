import { ICastMovie, ICrewMovie } from "@/Types/Movies/movies.type";
import { Box } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleMovieDetails from "../Search/SingleMovieDetails";

const MovieRow = ({
  moviesOfPerson,
  title,
}: {
  moviesOfPerson: ICastMovie[] | ICrewMovie[];
  title: string;
}) => {
  return (
    <Box className='movie-details-info-tab-content person-details-info-tab-content'>
      <h3>{title}</h3>

      <Box className='movie-list-inner'>
        <Swiper
          spaceBetween={34}
          slidesPerView={
            moviesOfPerson?.length > 7 ? 7 : moviesOfPerson?.length
          }
          grabCursor
          breakpoints={{
            360: {
              slidesPerView:
                moviesOfPerson?.length > 1.8 ? 1.8 : moviesOfPerson?.length,
            },
            640: {
              slidesPerView:
                moviesOfPerson?.length > 3.5 ? 3.5 : moviesOfPerson?.length,
            },
            1025: {
              slidesPerView:
                moviesOfPerson?.length > 4.5 ? 4.5 : moviesOfPerson?.length,
            },
          }}
          className='movie-list-swiper'
        >
          {moviesOfPerson.map((movie) => {
            return (
              <SwiperSlide>
                <SingleMovieDetails item={movie} index={movie.id} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MovieRow;
