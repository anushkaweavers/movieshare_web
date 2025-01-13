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
import Image from "next/image";
import TextFieldInput from "@/Components/Common/UiComps/TextField";
import DropDownField from "@/Components/Common/UiComps/DropDownField";
import Datepicker from "@/Components/Common/UiComps/DatePicker";
import dayjs from "dayjs";
import ButtonField from "@/Components/Common/UiComps/ButtonField";
import FullScreenLoader from "@/Components/Common/UiComps/FullScreenLoader";
import { useRegister } from "./useRegister";
import LeftSection from "../Common/LeftSection";

const Register = () => {
  const { registerFormik, isPending } = useRegister();
  const genderOptions = [
    { value: "Male", title: "Male" },
    { value: "Female", title: "Female" },
    { value: "Others", title: "Others" },
  ];
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
              <h2>
                Create Free Account{" "}
                <Image
                  width={32}
                  height={32}
                  src='/images/signup-hand-icon.svg'
                  alt=''
                />
              </h2>
              <p>Let’s get started</p>
            </Box>

            <form onSubmit={registerFormik.handleSubmit}>
              <Box className='auth-input-wrap'>
                <Box className='input-each-wrap'>
                  <TextFieldInput
                    name='first_name'
                    id='first_name'
                    lable='First Name'
                    placeholder='Enter first name'
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={
                      registerFormik.touched.first_name &&
                      !!registerFormik.errors.first_name
                    }
                    helperText={
                      registerFormik.touched.first_name
                        ? registerFormik.errors.first_name
                        : ""
                    }
                  />

                  <TextFieldInput
                    name='last_name'
                    id='last_name'
                    lable='Last Name'
                    placeholder='Enter last name'
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={
                      registerFormik.touched.last_name &&
                      !!registerFormik.errors.last_name
                    }
                    helperText={
                      registerFormik.touched.last_name
                        ? registerFormik.errors.last_name
                        : ""
                    }
                  />
                </Box>

                <TextFieldInput
                  name='user_name'
                  id='user_name'
                  lable='User Name'
                  placeholder='Enter user name'
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                  error={
                    registerFormik.touched.user_name &&
                    !!registerFormik.errors.user_name
                  }
                  helperText={
                    registerFormik.touched.user_name
                      ? registerFormik.errors.user_name
                      : ""
                  }
                />

                <TextFieldInput
                  name='email'
                  id='email'
                  lable='Email'
                  placeholder='Enter email'
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

                <Box className='input-each-wrap'>
                  <Datepicker
                    id='date_of_birth'
                    name='date_of_birth'
                    onChange={(newValue) => {
                      registerFormik.setFieldValue("date_of_birth", newValue);
                    }}
                    value={dayjs(registerFormik.values.date_of_birth)}
                    label='Birthday'
                  />
                  <DropDownField
                    id='gender'
                    name='gender'
                    options={genderOptions}
                    title='Gender'
                    onChange={registerFormik.handleChange}
                    error={
                      registerFormik.touched.gender &&
                      !!registerFormik.errors.gender
                    }
                    value={registerFormik.values.gender}
                    clsDrop='input-field'
                    placeholder='Select gender'
                  />
                </Box>

                <Box className='input-each-wrap'>
                  <TextFieldInput
                    name='password'
                    type='password'
                    id='password'
                    lable='Password'
                    placeholder='Enter Password'
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
                    name='confirm_password'
                    type='password'
                    id='confirm_password'
                    lable='Confirm password'
                    placeholder='Enter Confirm password'
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={
                      registerFormik.touched.confirm_password &&
                      !!registerFormik.errors.confirm_password
                    }
                    helperText={
                      registerFormik.touched.confirm_password
                        ? registerFormik.errors.confirm_password
                        : ""
                    }
                  />
                </Box>
              </Box>

              <FormGroup className='auth-agree'>
                <FormControlLabel
                  control={<Checkbox />}
                  // label='I Accept Terms and Conditions.'
                  label={
                    <div>
                      <span>I accept </span>
                      <Link href='/design/auth/login'>
                        Terms and Conditions.
                      </Link>
                    </div>
                  }
                  required
                />
              </FormGroup>

              <ButtonField
                type='submit'
                fullWidth
                label='Sign Up'
                mainCls='p-btn'
              />
            </form>

            <p className='text-center auth-btm-info'>
              <span>Already have an account?</span>{" "}
              <Link href='/login'>Sign In</Link>
            </p>
          </Box>
        </Grid2>
      </Grid2>
      <FullScreenLoader open={isPending} />
    </Container>
  );
};

export default Register;
