import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom"; 
import Axios from 'axios';
import "swiper/css";
import "swiper/css/navigation";
import "../../custom.css"; 
import "../../responsive.css";
import "../../dark.css";
import "../../developer.css";
import "../../global.css";
import "swiper/css/pagination";
import SwiperNavButton from "../../Layout/SwiperNavButton"; 

const Register = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birthday: "",
    gender: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await Axios.post('/v1/auth/register', formData);
      alert("Registration successful!");
      // Handle success, redirect to login or dashboard
    } catch (error) {
      alert("Error during registration");
      console.error(error);
    }
  };

  return (
    <Container maxWidth={false} className="auth-wraper">
      <Grid container spacing={0} className="auth-wraper-inn">
        {/* Slider Section */}
        <Grid item md={7} sm={12} xs={12}>
          <Box className="auth-slider-wrap">
            <Swiper slidesPerView={1} loop modules={[Navigation]} className="authSwiper">
              {[...Array(3)].map((_, index) => (
                <SwiperSlide key={index}>
                  <Box className="auth-slider-img-holder">
                    <img
                      src="/images/signup-slider-img1.jpg"
                      alt="Slider"
                      className="auth-slider-img"
                      style={{ width: "100%", height: "auto" }}
                    />
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
                          Lorem ipsum dolor sit amet consectetur. Integer vel
                          sed enim aliquet volutpat adipiscing ante amet.
                        </p>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>

        {/* Form Section */}
        <Grid item md={5} sm={12} xs={12} className="auth-form-outer signup-form-wrap">
          <Box className="auth-form-wrap">
            <Box className="auth-form-top">
              <h2>
                Create Free Account{" "}
                <img
                  width={32}
                  height={32}
                  src="/images/signup-hand-icon.svg"
                  alt="Sign Up Icon"
                />
              </h2>
              <p>Let’s get started</p>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box className="auth-input-wrap">
                {/* Name Fields */}
                <Box className="input-each-wrap">
                  <FormGroup className="input-each">
                    <InputLabel required className="input-label">
                      First Name
                    </InputLabel>
                    <TextField
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      variant="outlined"
                      className="input-field"
                    />
                  </FormGroup>

                  <FormGroup className="input-each">
                    <InputLabel required className="input-label">
                      Last Name
                    </InputLabel>
                    <TextField
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                      variant="outlined"
                      className="input-field"
                    />
                  </FormGroup>
                </Box>

                {/* Username Field */}
                <FormGroup className="input-each">
                  <InputLabel required className="input-label">
                    User Name
                  </InputLabel>
                  <TextField
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter User Name"
                    variant="outlined"
                    className="input-field"
                  />
                </FormGroup>

                {/* Email Field */}
                <FormGroup className="input-each">
                  <InputLabel required className="input-label">
                    Email
                  </InputLabel>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    variant="outlined"
                    className="input-field"
                  />
                </FormGroup>

                {/* Birthday and Gender Fields */}
                <Box className="input-each-wrap">
                  <FormGroup className="input-each">
                    <InputLabel required className="input-label">
                      Birthday
                    </InputLabel>
                    <TextField
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      placeholder="DD/MM/YYYY"
                      variant="outlined"
                      className="input-field"
                    />
                  </FormGroup>

                  <FormGroup className="input-each">
                    <InputLabel id="gender-select-label" className="input-label">
                      Gender
                    </InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormGroup>
                </Box>

                {/* Password Fields */}
                <Box className="input-each-wrap">
                  <FormGroup className="input-each">
                    <InputLabel required className="input-label">
                      Password
                    </InputLabel>
                    <TextField
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      variant="outlined"
                      type="password"
                      className="input-field"
                    />
                  </FormGroup>

                  <FormGroup className="input-each">
                    <InputLabel required className="input-label">
                      Confirm Password
                    </InputLabel>
                    <TextField
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      variant="outlined"
                      type="password"
                      className="input-field"
                    />
                  </FormGroup>
                </Box>
              </Box>

              {/* Agreement Checkbox */}
              <FormGroup className="auth-agree">
                <FormControlLabel
                  control={<Checkbox checked={formData.agreeTerms} onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })} />}
                  label={
                    <div>
                      <span>I accept </span>
                      <Link to="/terms">Terms and Conditions</Link>
                    </div>
                  }
                />
              </FormGroup>

              {/* Submit Button */}
              <FormGroup>
                <Button type="submit" className="p-btn">Sign Up</Button>
              </FormGroup>
            </form>

            {/* Sign In Link */}
            <p className="text-center auth-btm-info">
              <span>Already have an account?</span>{" "}
              <Link to="/login">Sign In</Link>
            </p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
