import React, { useState } from "react";
import {
  Box,
  Container,
  FormGroup,
  Grid,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import TextFieldInput from "../Common/UiComps/TextField";
import ButtonField from "../Common/UiComps/ButtonField";
import FullScreenLoader from "../Common/UiComps/FullScreenLoader";
import LeftSection from "../Common/LeftSection";
import { useForgotPassword } from "./useForgotpass";
import toas from "react-hot-toast";

import "../../custom.css";
import "../../responsive.css";
import "../../dark.css";
import "../../developer.css";
import "../../global.css";

const ForgotPassword = () => {
  const { forgotPassFormik, isPending } = useForgotPassword();
  const [open, setOpen] = useState(false);

  return (
    <Container
      maxWidth={false}
      className="auth-wrapper"
      style={{ minHeight: "100vh", display: "flex", alignItems: "stretch" }}
    >
      <Grid container spacing={0} className="auth-wrapper-inn">
        {/* Left Section */}
        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LeftSection />
        </Grid>

        {/* Right Section */}
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          className="auth-form-outer signup-form-wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box className="auth-form-wrap">
            <Box className="auth-form-top">
              <Link to="/login">Back to Login</Link>
              <h2>Reset Password</h2>
              <p>
                Enter the email associated with your account and we’ll send an
                email with instructions to reset your password.
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
                    type='submit'
                    mainCls='p-btn'
                    label='Send Reset Link'
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
