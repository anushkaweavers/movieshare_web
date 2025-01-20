import React from "react";
import { Box } from "@mui/material";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"; // Updated import
import SingleCast from "./SingleCast"; // Ensure this file exists

const Cast = ({ movieCastCrew }) => {
  const navigate = useNavigate(); // Updated hook

  // Navigate to person's detail page
  const gotoPersonDetails = (id) => {
    navigate(`/person/${id}`);
  };

  return (
    <Box id="cast_sec" className="movie-details-info-tab-content movie-details-tab4">
      <h3>Cast</h3>

      <Swiper
        slidesPerView={7}
        spaceBetween={6}
        navigation
        modules={[Navigation]}
        breakpoints={{
          360: {
            slidesPerView: 2.5,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1025: {
            slidesPerView: 7,
          },
        }}
        className="castSwiper"
      >
        {movieCastCrew.cast.map((cast) => (
          <SwiperSlide
            key={cast.cast_id}
            onClick={() => {
              gotoPersonDetails(cast.id);
            }}
          >
            <SingleCast cast={cast} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Cast;
