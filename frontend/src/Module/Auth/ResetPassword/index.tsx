"use client";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid2,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import TextFieldInput from "@/Components/Common/UiComps/TextField";
import ButtonField from "@/Components/Common/UiComps/ButtonField";
import MSPopUp from "@/Components/Common/UiComps/MSPopUp";
import FullScreenLoader from "@/Components/Common/UiComps/FullScreenLoader";
import { useResetPassword } from "./useResetPass";
import LeftSection from "../Common/LeftSection";

const ResetPassword = () => {
  const { resetPassFormik, openConfrimModal, gotoLogin, isPending } =
    useResetPassword();
  const [open, setOpen] = useState(false);

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
              <h2>Create New Password </h2>
              <p>
                Your new password must be different from previous used
                passwords.
              </p>
            </Box>

            <form onSubmit={resetPassFormik.handleSubmit}>
              <Box className='auth-input-wrap'>
                <TextFieldInput
                  name='password'
                  type='password'
                  id='password'
                  lable='New password'
                  placeholder='Enter new password'
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
                  name='confirm_password'
                  type='password'
                  id='confirm_password'
                  lable='Confirm password'
                  placeholder='Enter Confirm password'
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
                  type='submit'
                  fullWidth
                  label='Reset Password'
                  mainCls='p-btn'
                />
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
      <MSPopUp
        title='Password reset successufuly'
        description='Your password has been successsfuly reset. You can now log in by clicking below.'
        btnTitle='Log in'
        open={openConfrimModal}
        handleClose={() => {
          return null;
        }}
        btnClick={gotoLogin}
        imgSrc='/images/successufuly-icon.svg'
      />
      <FullScreenLoader open={isPending} />
    </Container>
  );
};

export default ResetPassword;
