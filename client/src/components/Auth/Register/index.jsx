import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import SwiperNavButton from "../../Layout/SwiperNavButton";
import "swiper/css";
import "swiper/css/navigation";
import TextFieldInput from "../Common/UiComps/TextField";
import DropDownField from "../Common/UiComps/DropDownField";
import Datepicker from "../Common/UiComps/DatePicker";
import dayjs from "dayjs";
import ButtonField from "../Common/UiComps/ButtonField";
import FullScreenLoader from "../Common/UiComps/FullScreenLoader";
import LeftSection from "../Common/LeftSection";
import "../../custom.css";
import "../../responsive.css";
import "../../dark.css";
import "../../developer.css";
import "../../global.css";
import { useRegister } from "./useRegister";

const Register = () => {
  const navigate = useNavigate();
  const { registerFormik, isPending, apiError } = useRegister();

  const genderOptions = [
    { value: "Male", title: "Male" },
    { value: "Female", title: "Female" },
    { value: "Others", title: "Others" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Format the birthday before submitting
    const formattedBirthday = dayjs(registerFormik.values.birthday).format(
      "YYYY-MM-DD"
    );
    registerFormik.setFieldValue("birthday", formattedBirthday, false);
  
    try {
      // Await the result of form submission
      const response = await registerFormik.handleSubmit();
  
      // Check the response using the status code
      if (response?.status === 201) {
        console.log("Registration successful:", response);
        navigate("/login");
      } else {
        console.error(
          "Registration failed:",
          response?.data?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during registration:", error.message || error);
    }
  };
  
  
  
  return (
    <Container maxWidth={false} className="auth-wraper">
      <Grid container spacing={0} className="auth-wraper-inn">
        {/* Left Section */}
        <Grid item xs={12} sm={12} md={7}>
          <LeftSection />
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} sm={12} md={5} className="auth-form-outer signup-form-wrap">
          <Box className="auth-form-wrap">
            <Box className="auth-form-top">
              <h2>
                Create Free Account{" "}
                <img
                  width={32}
                  height={32}
                  src="/images/signup-hand-icon.svg"
                  alt="Signup Icon"
                />
              </h2>
              <p>Let’s get started</p>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box className="auth-input-wrap">
                {/* First Name and Last Name */}
                <Box className="input-each-wrap">
                  <TextFieldInput
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    placeholder="Enter first name"
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={
                      registerFormik.touched.firstName &&
                      !!registerFormik.errors.firstName
                    }
                    helperText={
                      registerFormik.touched.firstName
                        ? registerFormik.errors.firstName
                        : ""
                    }
                  />
                  <TextFieldInput
                    name="lastName"
                    id="lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={
                      registerFormik.touched.lastName &&
                      !!registerFormik.errors.lastName
                    }
                    helperText={
                      registerFormik.touched.lastName
                        ? registerFormik.errors.lastName
                        : ""
                    }
                  />
                </Box>

                {/* Username */}
                <TextFieldInput
                  name="username"
                  id="username"
                  label="User Name"
                  placeholder="Enter user name"
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                  error={
                    registerFormik.touched.username &&
                    !!registerFormik.errors.username
                  }
                  helperText={
                    registerFormik.touched.username
                      ? registerFormik.errors.username
                      : ""
                  }
                />

                {/* Email */}
                <TextFieldInput
                  name="email"
                  id="email"
                  label="Email"
                  placeholder="Enter email"
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                  error={
                    registerFormik.touched.email &&
                    !!registerFormik.errors.email
                  }
                  helperText={
                    registerFormik.touched.email
                      ? registerFormik.errors.email
                      : ""
                  }
                />

                {/* Birthday and Gender */}
                <Box className="input-each-wrap">
                  <Datepicker
                    id="birthday"
                    name="birthday"
                    onChange={(newValue) => {
                      registerFormik.setFieldValue("birthday", newValue);
                    }}
                    value={dayjs(registerFormik.values.birthday)}
                    label="Birthday"
                  />
                  <DropDownField
                    id="gender"
                    name="gender"
                    options={genderOptions}
                    title="Gender"
                    onChange={registerFormik.handleChange}
                    error={
                      registerFormik.touched.gender &&
                      !!registerFormik.errors.gender
                    }
                    value={registerFormik.values.gender}
                    clsDrop="input-field"
                    placeholder="Select gender"
                  />
                </Box>

                {/* Password and Confirm Password */}
                <Box className="input-each-wrap">
                  <TextFieldInput
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                    placeholder="Enter Password"
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={
                      registerFormik.touched.password &&
                      !!registerFormik.errors.password
                    }
                    helperText={
                      registerFormik.touched.password
                        ? registerFormik.errors.password
                        : ""
                    }
                  />

                  <TextFieldInput
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    label="Confirm password"
                    placeholder="Enter Confirm password"
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={
                      registerFormik.touched.confirmPassword &&
                      !!registerFormik.errors.confirmPassword
                    }
                    helperText={
                      registerFormik.touched.confirmPassword
                        ? registerFormik.errors.confirmPassword
                        : ""
                    }
                  />
                </Box>
              </Box>

              {/* Terms and Conditions */}
              <FormGroup className="auth-agree">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="termsAccepted"
                      checked={registerFormik.values.termsAccepted}
                      onChange={registerFormik.handleChange}
                    />
                  }
                  label={
                    <div>
                      <span>I accept </span>
                      <Link to="/terms">Terms and Conditions</Link>.
                    </div>
                  }
                />
              </FormGroup>

              {apiError && <p className="error-text">{apiError}</p>}

              {/* Submit Button */}
              <ButtonField
                type="submit"
                fullWidth
                label="Sign Up"
                mainCls="p-btn"
                disabled={isPending}
              />
            </form>

            <p className="text-center auth-btm-info">
              <span>Already have an account?</span> <Link to="/login">Sign In</Link>
            </p>
          </Box>
        </Grid>
      </Grid>
      <FullScreenLoader open={isPending} />
    </Container>
  );
};

export default Register;