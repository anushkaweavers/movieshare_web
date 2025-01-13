"use client";

import { Box, Container, FormGroup, Grid2 } from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import TextFieldInput from "@/Components/Common/UiComps/TextField";
import ButtonField from "@/Components/Common/UiComps/ButtonField";
import FullScreenLoader from "@/Components/Common/UiComps/FullScreenLoader";
import LeftSection from "../Common/LeftSection";
import { useForgotPassword } from "./useForgotpass";

const ForgotPassword = () => {
  const { forgotPassFormik, isPending } = useForgotPassword();
  return (
    <Container maxWidth={false} className='auth-wraper'>
      <Grid2 container spacing={0} className='auth-wraper-inn'>
        <Grid2 size={{ md: 7, sm: 12, xs: 12 }}>
          <LeftSection />
        </Grid2>

        <Grid2
          size={{ md: 5, sm: 12, xs: 12 }}
          className='auth-form-outer signup-form-wrap'
        >
          <Box className='auth-form-wrap'>
            <Box className='auth-form-top'>
              <Link href='/login'>Back to Login</Link>
              <h2>Reset Password </h2>
              <p>
                Enter the email associated with your account and we’ll send an
                email with instructions to reset your password.
              </p>
            </Box>

            <form onSubmit={forgotPassFormik.handleSubmit}>
              <Box className='auth-input-wrap'>
                <TextFieldInput
                  name='email'
                  id='email'
                  lable='Enter Email'
                  placeholder='Enter your email address'
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
                    type='submit'
                    mainCls='p-btn'
                    label='Send Reset Link'
                  />
                </FormGroup>
              </Box>
            </form>
          </Box>
        </Grid2>
      </Grid2>
      <FullScreenLoader open={isPending} />
    </Container>
  );
};

export default ForgotPassword;
