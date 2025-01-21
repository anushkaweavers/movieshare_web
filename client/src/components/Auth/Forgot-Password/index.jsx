import React, { useState } from "react";
import { Box, Container, FormGroup, Grid, Dialog, DialogContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TextFieldInput from "../../Common/UiComps/TextField";
import ButtonField from "../../Common/UiComps/ButtonField";
import FullScreenLoader from "../../Common/UiComps/FullScreenLoader";
import LeftSection from "../../Common/LeftSection";
import { useForgotPassword } from "./useForgotpass";

import "../../custom.css";
import "../../responsive.css";
import "../../dark.css";
import "../../developer.css";
import "../../global.css";

const ForgotPassword = () => {
  const { forgotPassFormik, isPending } = useForgotPassword();
  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth={false} className="auth-wrapper">
      <Grid container spacing={0} className="auth-wrapper-inn">
        <Grid item md={7} sm={12} xs={12}>
          <Box className="auth-slider-wrap">
            <Swiper
              slidesPerView={1}
              loop
              modules={[Navigation]}
              className="authSwiper"
              navigation
            >
              <SwiperSlide>
                <Box className="auth-slider-img-holder">
                  <img
                    src="/images/signup-slider-img1.jpg"
                    alt="Slider 1"
                    className="slider-img"
                  />
                  <Box className="auth-slider-info">
                    <Box className="auth-slider-info-inner">
                      <h1>
                        Start Your <br /> Journey With Us.
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed enim aliquet volutpat adipiscing ante amet.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="auth-slider-img-holder">
                  <img
                    src="/images/signup-slider-img1.jpg"
                    alt="Slider 2"
                    className="slider-img"
                  />
                  <Box className="auth-slider-info">
                    <Box className="auth-slider-info-inner">
                      <h1>
                        Start Your <br /> Journey With Us.
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed enim aliquet volutpat adipiscing ante amet.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="auth-slider-img-holder">
                  <img
                    src="/images/signup-slider-img1.jpg"
                    alt="Slider 3"
                    className="slider-img"
                  />
                  <Box className="auth-slider-info">
                    <Box className="auth-slider-info-inner">
                      <h1>
                        Start Your <br /> Journey With Us.
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed enim aliquet volutpat adipiscing ante amet.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Grid>

        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          className="auth-form-outer signup-form-wrap"
        >
          <Box className="auth-form-wrap">
            <Box className="auth-form-top">
              <Link to="/login">Back to Login</Link>
              <h2>Reset Password</h2>
              <p>
                Enter the email associated with your account and we’ll send an email with instructions to reset your password.
              </p>
            </Box>

            <form onSubmit={forgotPassFormik.handleSubmit}>
              <Box className="auth-input-wrap">
                <TextFieldInput
                  name="email"
                  id="email"
                  label="Enter Email"
                  placeholder="Enter your email address"
                  required
                  onChange={forgotPassFormik.handleChange}
                  onBlur={forgotPassFormik.handleBlur}
                  error={
                    forgotPassFormik.touched.email &&
                    !!forgotPassFormik.errors.email
                  }
                  helperText={
                    forgotPassFormik.touched.email
                      ? forgotPassFormik.errors.email
                      : ""
                  }
                />

                <FormGroup>
                  <ButtonField
                    type="submit"
                    mainCls="p-btn"
                    label="Send Reset Link"
                  />
                </FormGroup>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
      <FullScreenLoader open={isPending} />

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="custom-popup"
      >
        <DialogContent>
          <Box className="popup-icon">
            <img
              width={34}
              height={34}
              src="/images/successufuly-icon.svg"
              alt="Success Icon"
            />
          </Box>
          <h3>Password Reset Successfully</h3>
          <p>Your password has been successfully reset.</p>
          <p>You can now log in by clicking below.</p>
          <Button className="p-btn">Log in</Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ForgotPassword;

