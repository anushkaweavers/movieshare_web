"use client";

import { Box, Container, Grid2, List, ListItem } from "@mui/material";
import Image from "next/image";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Navigation } from "swiper/modules";
// import Iframe from "react-iframe";
// import { Swiper as SwiperType } from "swiper/types";
import Link from "next/link";
import WestIcon from "@mui/icons-material/West";
// import ShowMoreText from "react-show-more-text";

const Page = () => {
  //   executeOnClick(isExpanded) {
  //     console.log(isExpanded);
  // }

  return (
    <Container className='movie-details-container'>
      <Link href='design/movies/details/movie' className='previous-page'>
        <WestIcon /> Back to Movie title
      </Link>
      {/* Person Details Info */}
      <Box className='movie-details-info person-details-info'>
        <Grid2 container spacing={8}>
          <Grid2
            size={{ xs: 4, md: 4, lg: 4 }}
            className='movie-details-info-lt person-details-info-lt'
          >
            <Box className='person-details-info-img'>
              <Image fill src='/images/person-details-img.jpg' alt='' />
            </Box>
          </Grid2>

          <Grid2
            size={{ xs: 8, md: 8, lg: 8 }}
            className='movie-details-info-rt person-details-info-rt'
          >
            <h2>Jean-Claude Van Damme</h2>

            <Box className='person-details-list-wrap'>
              <List>
                <p>Known for</p>
                <ListItem className='person-details-list-each'>Actor</ListItem>
              </List>

              <List>
                <p>Known Credits</p>
                <ListItem className='person-details-list-each'>103</ListItem>
              </List>
              <List>
                <p>Birthday</p>
                <ListItem className='person-details-list-each'>
                  October 18th 1960 (63 years old)
                </ListItem>
              </List>
              <List>
                <p>Genre</p>
                <ListItem className='person-details-list-each'>Male</ListItem>
              </List>
              <List>
                <p>Birthplace</p>
                <ListItem className='person-details-list-each'>
                  Berchem-Sainte-Agathe, Brussels, Belgium
                </ListItem>
              </List>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Person Biography Content */}
      <Box className='movie-details-info-tab-content person-details-info-tab-content'>
        <h3>Biography</h3>

        <p>
          {" "}
          Van Damme was born Jean-Claude Camille François van Varenberg in
          Berchem-Sainte-Agathe, Brussels, Belgium, to Eliana and Eugène van
          Varenberg, an accountant. “The Muscles from Brussels” started martial
          arts at the age of eleven. His father introduced him to martial arts
          when he saw his son was physically weak. At the age of 12, van Damme
          began his martial arts training at Centre National De Karate (National
          Center of Karate) under the guidance of Master Claude Goetz in
          Ixelles, Belgium.{" "}
        </p>
        <p>
          Van Damme trained for 4 years and earned a spot on the Belgium Karate
          Team. He won the European professional karate association&apos;s
          middleweight championship as a teenager, and also beat the 2nd best
          karate fighter in the world. His goal was to be number one but got
          sidetracked when he left his...
        </p>
      </Box>

      {/* Person Known for Content */}
      <Box className='movie-details-info-tab-content person-details-info-tab-content'>
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
      </Box>

      {/* Movie Per Details Similar Content */}
      <Box className='movie-details-info-tab-content person-details-info-tab-content'>
        <h3>Similar</h3>

        <Swiper
          slidesPerView={7}
          loop
          navigation
          modules={[Navigation]}
          spaceBetween={6}
          breakpoints={{
            360: {
              slidesPerView: 2.8,
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
          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Container>
  );
};

export default Page;
