"use client";

import { SwiperNavButtons } from "@/Components/SwiperNavButton";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormGroup,
  Grid2,
  InputLabel,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const Page = () => {
  const [open, setOpen] = useState(false);

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
              <h2>Create New Password </h2>
              <p>
                Your new password must be different from previous used
                passwords.
              </p>
            </Box>

            <form>
              <Box className='auth-input-wrap'>
                <FormGroup className='input-each'>
                  <InputLabel required className='input-label'>
                    New Password
                  </InputLabel>
                  <TextField
                    placeholder='Enter Password'
                    variant='outlined'
                    className='input-field'
                  />
                </FormGroup>

                <FormGroup className='input-each'>
                  <InputLabel required className='input-label'>
                    Confirm Password
                  </InputLabel>
                  <TextField
                    placeholder='Enter Password'
                    variant='outlined'
                    className='input-field'
                  />
                </FormGroup>

                <FormGroup>
                  <Button
                    className='p-btn'
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Reset Password
                  </Button>
                </FormGroup>
              </Box>
            </form>
          </Box>
        </Grid2>
      </Grid2>

      {/* Confirm Password Popup */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className='custom-popup'
      >
        <DialogContent>
          <Box className='popup-icon'>
            <Image
              width={34}
              height={34}
              src='/images/successufuly-icon.svg'
              alt=''
            />
          </Box>
          <h3>Password reset successufuly</h3>
          <p>Your password has been successsfuly reset.</p>
          <p>You can now log in by clicking below.</p>
          <Button className='p-btn'>Log in</Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Page;
