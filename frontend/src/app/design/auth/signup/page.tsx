"use client";

import { SwiperNavButtons } from "@/Components/SwiperNavButton";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

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
                  <Image fill src='/images/signup-slider-img1.jpg' alt='' />
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
                  <Image fill src='/images/signup-slider-img1.jpg' alt='' />
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
              <h2>
                Create Free Account{" "}
                <Image
                  width={32}
                  height={32}
                  src='/images/signup-hand-icon.svg'
                  alt=''
                />
              </h2>
              <p>Let’s get started</p>
            </Box>

            <form>
              <Box className='auth-input-wrap'>
                <Box className='input-each-wrap'>
                  <FormGroup className='input-each'>
                    <InputLabel required className='input-label'>
                      First Name
                    </InputLabel>
                    <TextField
                      placeholder='Enter First Name'
                      variant='outlined'
                      className='input-field'
                    />
                  </FormGroup>

                  <FormGroup className='input-each'>
                    <InputLabel required className='input-label'>
                      Last Name
                    </InputLabel>
                    <TextField
                      placeholder='Enter Last Name'
                      variant='outlined'
                      className='input-field'
                    />
                  </FormGroup>
                </Box>

                <FormGroup className='input-each'>
                  <InputLabel required className='input-label'>
                    User Name
                  </InputLabel>
                  <TextField
                    placeholder='Enter User Name'
                    variant='outlined'
                    className='input-field'
                  />
                </FormGroup>

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

                <Box className='input-each-wrap'>
                  <FormGroup className='input-each'>
                    <InputLabel required className='input-label'>
                      Birthday
                    </InputLabel>
                    <TextField
                      placeholder='DD/MM/YYYY'
                      variant='outlined'
                      className='input-field'
                    />
                  </FormGroup>

                  <FormGroup className='input-each'>
                    <InputLabel
                      id='demo-simple-select-label'
                      className='input-label'
                    >
                      Gender
                    </InputLabel>
                    <Select>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormGroup>
                </Box>

                <Box className='input-each-wrap'>
                  <FormGroup className='input-each'>
                    <InputLabel required className='input-label'>
                      Password
                    </InputLabel>
                    <TextField
                      placeholder='Password'
                      variant='outlined'
                      className='input-field'
                    />
                  </FormGroup>

                  <FormGroup className='input-each'>
                    <InputLabel required className='input-label'>
                      Confirm Password
                    </InputLabel>
                    <TextField
                      placeholder='Password'
                      variant='outlined'
                      className='input-field'
                    />
                  </FormGroup>
                </Box>
              </Box>

              <FormGroup className='auth-agree'>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  // label='I Accept Terms and Conditions.'
                  label={
                    <div>
                      <span>I accept </span>
                      <Link href='/design/auth/login'>
                        Terms and Conditions.
                      </Link>
                    </div>
                  }
                />
              </FormGroup>

              <FormGroup>
                <Button className='p-btn'>Sign Up</Button>
              </FormGroup>
            </form>

            <p className='text-center auth-btm-info'>
              <span>Already have an account?</span>{" "}
              <Link href='/design/auth/login'>Sign In</Link>
            </p>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default page;
