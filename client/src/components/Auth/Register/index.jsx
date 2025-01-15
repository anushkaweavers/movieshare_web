import React from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid // Import Grid from MUI
} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import TextFieldInput from "./Common/UiComps/TextField";
import DropDownField from "./Common/UiComps/DropDownField";
import Datepicker from "./Common/UiComps/DatePicker";
import dayjs from "dayjs";
import ButtonField from "./Common/UiComps/ButtonField";
import FullScreenLoader from "./Common/UiComps/FullScreenLoader";
import { useRegister } from "./useRegister";
import SwiperNavButton from "../../Layout/SwiperNavButton"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../custom.css";
import "../../responsive.css";
import "../../dark.css";
import "../../developer.css";
import "../../global.css";

const Register = () => {
  const { registerFormik, isPending } = useRegister();
  const navigate = useNavigate(); // to handle redirection
  const genderOptions = [
    { value: "Male", title: "Male" },
    { value: "Female", title: "Female" },
    { value: "Others", title: "Others" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registerFormik.handleSubmit();
      if (response) {
        // Redirect to the login page upon successful registration
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Container maxWidth={false} className="auth-wraper">
      <Grid container spacing={0} className="auth-wraper-inn">
        <Grid item xs={12} sm={12} md={7}>
          <Box className="auth-slider-wrap">
            <Swiper slidesPerView={1} loop modules={[Navigation]} className="authSwiper">
              <SwiperSlide>
                <Box className="auth-slider-img-holder">
                  <img src="/images/signup-slider-img1.jpg" alt="" />
                  <Box className="auth-slider-info">
                    <Box className="auth-slider-info-inner">
                      <Box className="auth-slider-info-inner-top">
                        <h1>
                          Start Your <br />
                          Journey With Us.
                        </h1>
                        <SwiperNavButton />
                      </Box>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed
                        enim aliquet volutpat adipiscing ante amet. Aliquet
                        volutpat ut magna lectus mi eu consectetur placerat
                        facilisi. Enim et cursus at semper massa justo gravida.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="auth-slider-img-holder">
                  <img src="/images/signup-slider-img1.jpg" alt="" />
                  <Box className="auth-slider-info">
                    <Box className="auth-slider-info-inner">
                      <Box className="auth-slider-info-inner-top">
                        <h1>
                          Start Your <br />
                          Journey With Us.
                        </h1>
                        <SwiperNavButton />
                      </Box>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Integer vel sed
                        enim aliquet volutpat adipiscing ante amet. Aliquet
                        volutpat ut magna lectus mi eu consectetur placerat
                        facilisi. Enim et cursus at semper massa justo gravida.
                      </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={5} className="auth-form-outer signup-form-wrap">
          <Box className="auth-form-wrap">
            <Box className="auth-form-top">
              <h2>
                Create Free Account{" "}
                <img
                  width={32}
                  height={32}
                  src="/images/signup-hand-icon.svg"
                  alt=""
                />
              </h2>
              <p>Let’s get started</p>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box className="auth-input-wrap">
                <Box className="input-each-wrap">
                  <TextFieldInput
                    name="firstName"
                    id="firstName"
                    lable="First Name"
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
                    lable="Last Name"
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

                <TextFieldInput
                  name="username"
                  id="username"
                  lable="User Name"
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

                <TextFieldInput
                  name="email"
                  id="email"
                  lable="Email"
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

                <Box className="input-each-wrap">
                  <TextFieldInput
                    name="password"
                    type="password"
                    id="password"
                    lable="Password"
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
                    lable="Confirm password"
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

              <FormGroup className="auth-agree">
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <div>
                      <span>I accept </span>
                      <Link to="/design/auth/login">Terms and Conditions.</Link>
                    </div>
                  }
                  required
                />
              </FormGroup>

              <ButtonField
                type="submit"
                fullWidth
                label="Sign Up"
                mainCls="p-btn"
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
