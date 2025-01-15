import * as Yup from 'yup';

export const registrationFormValidation = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  user_name: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  date_of_birth: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
