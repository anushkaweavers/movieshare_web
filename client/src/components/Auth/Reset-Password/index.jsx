import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import TextFieldInput from "../Common/UiComps/TextField";
import ButtonField from "../Common/UiComps/ButtonField";
import FullScreenLoader from "../Common/UiComps/FullScreenLoader";
import LeftSection from "../Common/LeftSection";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { resetPasswordApi } from "../../../actions/auth.actions";
import { resetPassFormValidation } from "../../../Validations/Auth/reset.validations";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const token = new URLSearchParams(location.search).get("id"); // Extract token from URL

  const handleResetPass = async (values) => {
    const body = {
      token, // Include token from the URL
      new_password: values.password,
    };

    setIsPending(true);
    try {
      const response = await resetPasswordApi(body); // Call the API to reset the password
      if (response.status) {
        setDialogOpen(true); // Open success dialog
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const resetPassFormik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetPassFormValidation,
    onSubmit: (values) => {
      handleResetPass(values);
    },
  });

  return (
    <Container maxWidth={false} className="auth-wrapper">
      <Grid container spacing={0} className="auth-wrapper-inner">
        <Grid item md={7} sm={12} xs={12}>
          <Box className="auth-slider-wrap">
            <Swiper slidesPerView={1} loop navigation className="authSwiper">
              {[1, 2, 3].map((_, index) => (
                <SwiperSlide key={index}>
                  <Box className="auth-slider-img-holder">
                    <img
                      src="/images/signup-slider-img1.jpg"
                      alt="Slider"
                      className="slider-image"
                    />
                    <LeftSection />
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
                  placeholder="Enter confirm password"
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

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
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
          <Button onClick={() => navigate("/login")} className="p-btn">
            Log In
          </Button>
        </DialogContent>
      </Dialog>

      <FullScreenLoader open={isPending} />
    </Container>
  );
};

export default ResetPassword;
