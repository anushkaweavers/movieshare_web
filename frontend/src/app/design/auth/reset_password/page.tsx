"use client";

import { SwiperNavButtons } from "@/Components/SwiperNavButton";
import {
  Box,
  Button,
  Container,
  FormGroup,
  Grid2,
  InputLabel,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const page = () => {
  return (
    <Container maxWidth={false} className='auth-wraper'>
      <Grid2 container spacing={0} className='auth-wraper-inn'>
        <Grid2 size={{ md: 7, sm: 12, xs: 12 }}>
          <Box className='auth-slider-wrap'>
            <Swiper
              slidesPerView={1}
              loop
              modules={[Navigation]}
              className='authSwiper'
            >
              <SwiperSlide>
                <Box className='auth-slider-img-holder'>
                  <Image fill src='/images/signup-slider-img1.jpg' alt='' />
                  <Box className='auth-slider-info'>
                    <Box className='auth-slider-info-inner'>
                      <h1>
                        Start Your <br />
                        Journey With Us.
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed
                        enim aliquet volutpat adipiscing ante amet. Aliquet
                        volutpat ut magna lectus mi eu consectetur placerat
                        facilisi. Enim et cursus at semper massa justo gravida.
                        Eu parturient et neque morbi felis vitae nunc fermentum.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperSlide>
                <Box className='auth-slider-img-holder'>
                  <Image fill src='/images/signup-slider-img1.jpg' alt='' />
                  <Box className='auth-slider-info'>
                    <Box className='auth-slider-info-inner'>
                      <h1>
                        Start Your <br />
                        Journey With Us.
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed
                        enim aliquet volutpat adipiscing ante amet. Aliquet
                        volutpat ut magna lectus mi eu consectetur placerat
                        facilisi. Enim et cursus at semper massa justo gravida.
                        Eu parturient et neque morbi felis vitae nunc fermentum.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperSlide>
                <Box className='auth-slider-img-holder'>
                  <Image fill src='/images/signup-slider-img1.jpg' alt='' />
                  <Box className='auth-slider-info'>
                    <Box className='auth-slider-info-inner'>
                      <h1>
                        Start Your <br />
                        Journey With Us.
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed
                        enim aliquet volutpat adipiscing ante amet. Aliquet
                        volutpat ut magna lectus mi eu consectetur placerat
                        facilisi. Enim et cursus at semper massa justo gravida.
                        Eu parturient et neque morbi felis vitae nunc fermentum.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperNavButtons />
            </Swiper>
          </Box>
        </Grid2>

        <Grid2
          size={{ md: 5, sm: 12, xs: 12 }}
          className='auth-form-outer signup-form-wrap'
        >
          <Box className='auth-form-wrap'>
            <Box className='auth-form-top'>
              <Link href='/design/auth/login'>Back to Login</Link>
              <h2>Reset Password </h2>
              <p>
                Enter the email associated with your account and we’ll send an
                email with instructions to reset your password.
              </p>
            </Box>

            <form>
              <Box className='auth-input-wrap'>
                <FormGroup className='input-each'>
                  <InputLabel required className='input-label'>
                    Email
                  </InputLabel>
                  <TextField
                    placeholder='Enter Email'
                    variant='outlined'
                    className='input-field'
                  />
                </FormGroup>

                <FormGroup>
                  <Button className='p-btn'>Send Reset Link</Button>
                </FormGroup>
              </Box>
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default page;
