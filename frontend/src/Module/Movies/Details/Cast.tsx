import { ICastList } from "@/Types/Movies/movies.type";
import { Box } from "@mui/material";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import SingleCast from "./SingleCast";

const Cast = ({ movieCastCrew }: { movieCastCrew: ICastList }) => {
  const router = useRouter();
  const gotoPersonDetails = (id: number) => {
    router.push(`/person/${id}`);
  };
  return (
    <Box
      id='cast_sec'
      className='movie-details-info-tab-content movie-details-tab4'
    >
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
        className='castSwiper'
      >
        {movieCastCrew.cast.map((cast) => {
          return (
            <SwiperSlide
              key={cast.cast_id}
              onClick={() => {
                gotoPersonDetails(cast.id);
              }}
            >
              <SingleCast cast={cast} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Cast;
