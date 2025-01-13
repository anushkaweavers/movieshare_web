/**
 * Validation file for all Login
 */
import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Must be 8 or more than 8 characters")
    .required("Password field is Required")
    .matches(/\w/, "Please enter valid password"),
});
