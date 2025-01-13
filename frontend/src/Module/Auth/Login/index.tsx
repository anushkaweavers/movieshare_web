"use client";

import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid2,
} from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import TextFieldInput from "@/Components/Common/UiComps/TextField";
import ButtonField from "@/Components/Common/UiComps/ButtonField";
import FullScreenLoader from "@/Components/Common/UiComps/FullScreenLoader";
import LeftSection from "../Common/LeftSection";
import { useLogin } from "./useLogin";

const LoginIndex = () => {
  const { loginFormik, googleLogin, isPending } = useLogin();
  return (
    <Container maxWidth={false} className='auth-wraper'>
      <Grid2 container spacing={0} className='auth-wraper-inn'>
        <Grid2
          size={{ lg: 7, md: 7, sm: 12, xs: 12 }}
          className='auth-wraper-inn'
        >
          <LeftSection />
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
                <ButtonField
                  onClick={googleLogin}
                  img='/images/gmail-icon.svg'
                  alt='Gmail Icon'
                  imgHeight={24}
                  imgWidth={24}
                  label='Log In with Gmail'
                />
              </li>
              <li>
                <ButtonField
                  img='/images/facebook-icon.svg'
                  alt='Facebook Icon'
                  imgHeight={24}
                  imgWidth={24}
                  label='Log In with Facebook'
                />
              </li>
            </ul>
            <p className='other-auth-option'>
              <span>or do it via E-mail</span>
            </p>

            <form onSubmit={loginFormik.handleSubmit}>
              <Box className='auth-input-wrap'>
                <TextFieldInput
                  name='email'
                  id='email'
                  lable='Enter Email'
                  placeholder='Enter your email address'
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  error={
                    loginFormik.touched.email && !!loginFormik.errors.email
                  }
                  helperText={
                    loginFormik.touched.email ? loginFormik.errors.email : ""
                  }
                />

                <TextFieldInput
                  name='password'
                  type='password'
                  id='password'
                  lable='Enter Password'
                  placeholder='Enter your password'
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  error={
                    loginFormik.touched.password &&
                    !!loginFormik.errors.password
                  }
                  helperText={
                    loginFormik.touched.password
                      ? loginFormik.errors.password
                      : ""
                  }
                />
              </Box>

              <FormGroup className='auth-agree'>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Remember me'
                />

                <Link href='/forgot_password'>Forgot password?</Link>
              </FormGroup>

              <FormGroup>
                <ButtonField type='submit' mainCls='p-btn' label='Log In' />
              </FormGroup>
            </form>

            <p className='text-center auth-btm-info'>
              Don&apos;t have an account?{" "}
              <Link href='/signup'>Sign Up for Free</Link>
            </p>
          </Box>
        </Grid2>
      </Grid2>
      <FullScreenLoader open={isPending} />
    </Container>
  );
};

export default LoginIndex;
