import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TextFieldInput from "../Common/TextField";
import ButtonField from "../Common/ButtonField";
import Datepicker from "../Common/DatePicker";

import { registerUserApi } from "../../services/authService";


const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    date_of_birth: null,
    gender: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values) => {
    const response = await registerUserApi(values);
    if (response.status) {
      navigate("/login");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            name="first_name"
            placeholder="First Name"
            label="First Name"
            component={TextFieldInput}
          />
          <Field
            name="last_name"
            placeholder="Last Name"
            label="Last Name"
            component={TextFieldInput}
          />
          <Field
            name="email"
            placeholder="Email"
            label="Email"
            type="email"
            component={TextFieldInput}
          />
          <Field
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
            component={TextFieldInput}
          />
          <Field
            name="confirm_password"
            placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            component={TextFieldInput}
          />
          <Field
            name="date_of_birth"
            label="Date of Birth"
            component={Datepicker}
          />
          <Field
            name="gender"
            label="Gender"
            component={TextFieldInput}
            placeholder="Gender"
          />
          <ButtonField label="Register" type="submit" fullWidth />
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
