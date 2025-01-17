import React from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import TextFieldInput from "../Common/UiComps/TextField";
import ButtonField from "../Common/UiComps/ButtonField";
import FullScreenLoader from "../Common/UiComps/FullScreenLoader";
import { useResetPassword } from "./useResetpass";

const ResetPassword = () => {
  const { resetPassFormik, openConfirmModal, gotoLogin, isPending } =
    useResetPassword();

  return (
    <Container maxWidth={false} className="auth-wrapper">
      <Grid container spacing={0} className="auth-wrapper-inner">
        <Grid item md={7} sm={12} xs={12}>
          <Box className="auth-slider-wrap">
            <Swiper slidesPerView={1} loop navigation>
              {[1, 2, 3].map((_, index) => (
                <SwiperSlide key={index}>
                  <Box className="auth-slider-img-holder">
                    <img
                      src="/images/signup-slider-img1.jpg"
                      alt="Slider"
                      className="slider-image"
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>

        <Grid item md={5} sm={12} xs={12} className="auth-form-outer">
          <Box className="auth-form-wrap">
            <Box className="auth-form-top">
              <a href="/login">Back to Login</a>
              <h2>Create New Password</h2>
              <p>Your new password must be different from previous passwords.</p>
            </Box>

            <form onSubmit={resetPassFormik.handleSubmit}>
              <Box className="auth-input-wrap">
                <TextFieldInput
                  name="password"
                  type="password"
                  label="New Password"
                  placeholder="Enter new password"
                  onChange={resetPassFormik.handleChange}
                  onBlur={resetPassFormik.handleBlur}
                  error={
                    resetPassFormik.touched.password &&
                    !!resetPassFormik.errors.password
                  }
                  helperText={
                    resetPassFormik.touched.password
                      ? resetPassFormik.errors.password
                      : ""
                  }
                />

                <TextFieldInput
                  name="confirm_password"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  onChange={resetPassFormik.handleChange}
                  onBlur={resetPassFormik.handleBlur}
                  error={
                    resetPassFormik.touched.confirm_password &&
                    !!resetPassFormik.errors.confirm_password
                  }
                  helperText={
                    resetPassFormik.touched.confirm_password
                      ? resetPassFormik.errors.confirm_password
                      : ""
                  }
                />

                <ButtonField
                  type="submit"
                  fullWidth
                  label="Reset Password"
                  mainCls="p-btn"
                />
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openConfirmModal} onClose={gotoLogin}>
        <DialogContent>
          <Box>
            <img
              width={34}
              height={34}
              src="/images/successfully-icon.svg"
              alt="Success"
            />
          </Box>
          <h3>Password Reset Successfully</h3>
          <p>Your password has been successfully reset.</p>
          <p>You can now log in.</p>
          <Button onClick={gotoLogin} className="p-btn">
            Log In
          </Button>
        </DialogContent>
      </Dialog>

      <FullScreenLoader open={isPending} />
    </Container>
  );
};

export default ResetPassword;
