/**
 * All form validations for register page
 */
import * as yup from "yup";

export const registrationFormValidation = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  user_name: yup.string().required("User name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), ""], "Password must match")
    .required("Confirm password field is required")
    .min(8, "Password must be 8 characters long"),
  date_of_birth: yup.string(),
  gender: yup.string(),
});
