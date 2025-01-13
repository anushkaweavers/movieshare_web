"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  TextField,
} from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { SwiperNavButtons } from "@/Components/SwiperNavButton";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <Container maxWidth={false} className='auth-wraper'>
      <Grid2 container spacing={0} className='auth-wraper-inn'>
        <Grid2
          size={{ lg: 7, md: 7, sm: 12, xs: 12 }}
          className='auth-wraper-inn'
        >
          <Box className='auth-slider-wrap'>
            <Swiper
              slidesPerView={1}
              loop
              modules={[Navigation]}
              className='authSwiper'
            >
              <SwiperSlide>
                <Box className='auth-slider-img-holder'>
                  <Image fill src='/images/auth-slider-img1.jpg' alt='' />
                  <Box className='auth-slider-info'>
                    <Box className='auth-slider-info-inner'>
                      <Box className='auth-slider-info-inner-top'>
                        <h1>
                          Start Your <br />
                          Journey With Us.
                        </h1>
                        <SwiperNavButtons />
                      </Box>
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
                  <Image fill src='/images/auth-slider-img1.jpg' alt='' />
                  <Box className='auth-slider-info'>
                    <Box className='auth-slider-info-inner'>
                      <Box className='auth-slider-info-inner-top'>
                        <h1>
                          Start Your <br />
                          Journey With Us.
                        </h1>
                        <SwiperNavButtons />
                      </Box>
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
                  <Image fill src='/images/auth-slider-img1.jpg' alt='' />
                  <Box className='auth-slider-info'>
                    <Box className='auth-slider-info-inner'>
                      <Box className='auth-slider-info-inner-top'>
                        <h1>
                          Start Your <br />
                          Journey With Us.
                        </h1>
                        <SwiperNavButtons />
                      </Box>
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
            </Swiper>
          </Box>
        </Grid2>

        <Grid2
          size={{ lg: 5, md: 5, sm: 12, xs: 12 }}
          className='auth-form-outer'
        >
          <Box className='auth-form-wrap'>
            <Box className='auth-form-top'>
              <h2>Welcome back</h2>
              <p>Nice to see you again, Please enter your details.</p>
            </Box>

            <ul className='auth-social-login'>
              <li>
                <Button>
                  <Image
                    width={24}
                    height={24}
                    src='/images/gmail-icon.svg'
                    alt='Gmail Icon'
                  />{" "}
                  <span>Log In with Gmail</span>{" "}
                </Button>
              </li>
              <li>
                <Button>
                  <Image
                    width={24}
                    height={24}
                    src='/images/facebook-icon.svg'
                    alt='Facebook Icon'
                  />{" "}
                  <span>Log In with Facebook</span>{" "}
                </Button>
              </li>
            </ul>
            <p className='other-auth-option'>
              <span>or do it via E-mail</span>
            </p>

            <form>
              <Box className='auth-input-wrap'>
                <FormGroup className='input-each'>
                  <InputLabel required className='input-label'>
                    Enter Email
                  </InputLabel>
                  <TextField
                    id='email'
                    placeholder='Enter Email'
                    variant='outlined'
                    className='input-field'
                  />
                </FormGroup>

                <FormGroup className='input-each'>
                  <InputLabel required className='input-label'>
                    Enter Password
                  </InputLabel>
                  <TextField
                    id='password'
                    placeholder='Enter Password'
                    variant='outlined'
                    className='input-field'
                  />
                </FormGroup>
              </Box>

              <FormGroup className='auth-agree'>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Remember me'
                />

                <Link href='/forgot-pass'>Forgot password?</Link>
              </FormGroup>

              <FormGroup>
                <Button className='p-btn'>Log In</Button>
              </FormGroup>
            </form>

            <p className='text-center auth-btm-info'>
              Don&apos;t have an account?{" "}
              <Link href='/design/auth/signup'>Sign Up for Free</Link>
            </p>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default page;
