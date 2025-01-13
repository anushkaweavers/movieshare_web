"use client";

import { IMovieListOfPerson, IPersonDetails } from "@/Types/Movies/movies.type";
import React from "react";
import { Container } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { useRouter } from "next/navigation";
import BasicInfo from "./BasicInfo";
import Biography from "./Biography";
import MovieRow from "./MovieRow";

interface IPersondetailsComp {
  personDetails: IPersonDetails;
  moviesOfPerson: IMovieListOfPerson;
}

const PersonDetails = (props: IPersondetailsComp) => {
  const { personDetails, moviesOfPerson } = props;
  const router = useRouter();
  const goback = () => {
    router.back();
  };
  return (
    <Container className='movie-details-container'>
      <p
        onClick={goback}
        onKeyUp={goback}
        role='button'
        tabIndex={0}
        className='pointer previous-page'
      >
        <WestIcon /> Back to Movie title
      </p>
      {/* Person Details Info */}

      <BasicInfo personDetails={personDetails} />
      {/* Person Biography Content */}
      <Biography personDetails={personDetails} />

      {/* Person Known for Content */}
      {/* <Box className='movie-details-info-tab-content person-details-info-tab-content'>
        <h3>Known For</h3>

        <Box className='movie-list-inner'>
          <Swiper
            spaceBetween={34}
            slidesPerView={7}
            loop
            grabCursor
            breakpoints={{
              360: {
                slidesPerView: 1.8,
              },
              640: {
                slidesPerView: 3.5,
              },
              1025: {
                slidesPerView: 4.5,
              },
            }}
            className='movie-list-swiper'
          >
            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box className='movie-each'>
                <Box className='movie-each-img'>
                  <Image fill src='/images/movie-img.jpg' alt='' />
                </Box>
                <p>Jackie Brown</p>
                <p>1997</p>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Box> */}

      {/* Movie Per Details Similar Content */}

      {moviesOfPerson.cast?.length ? (
        <MovieRow
          title='Known for as a Cast'
          moviesOfPerson={moviesOfPerson.cast}
        />
      ) : null}
      {moviesOfPerson.crew?.length ? (
        <MovieRow
          title='Known for as a Crew'
          moviesOfPerson={moviesOfPerson.crew}
        />
      ) : null}
    </Container>
  );
};

export default PersonDetails;
