import { IVideoDetailsResult } from "@/Types/Movies/movies.type";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Iframe from "react-iframe";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface IMovieVideos {
  movieVidoes: IVideoDetailsResult;
}

const Trailers = (props: IMovieVideos) => {
  const { movieVidoes } = props;
  const [selectedVideoId, setSelectedVideoId] = useState(
    movieVidoes.results[0].key
  );
  return (
    <div id='trailer_sec'>
      {selectedVideoId ? (
        <Box className='movie-details-info-tab-content movie-details-tab3'>
          <h3>Trailers</h3>

          <Box className='single-trailer movie-trailer'>
            <Iframe
              url={`https://www.youtube.com/embed/${selectedVideoId}?rel=0`}
              width='100%'
              // height='449px'
              frameBorder={0}
              position='relative'
            />
          </Box>

          <Swiper
            slidesPerView={3}
            modules={[FreeMode, Navigation, Thumbs]}
            breakpoints={{
              360: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 15,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className='multiple-trailer movie-trailer'
          >
            {movieVidoes.results?.length > 1 && (
              <Box className='multiple-trailer movie-trailer'>
                {movieVidoes.results.map((vid) => {
                  return (
                    <SwiperSlide onClick={() => setSelectedVideoId(vid.key)}>
                      <Box className='thumb-img-holder pointer'>
                        <Image
                          fill
                          id='thumbnail'
                          src={`https://img.youtube.com/vi/${vid.key}/hqdefault.jpg`}
                          objectFit='cover'
                          alt='YouTube Video Thumbnail'
                        />
                        <Box className='trailer-info'>
                          <PlayCircleOutlineOutlinedIcon />
                          <p>{vid.name}</p>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  );
                })}
              </Box>
            )}
          </Swiper>
        </Box>
      ) : null}
    </div>
  );
};

export default Trailers;
