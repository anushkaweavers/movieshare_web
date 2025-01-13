/**
 * All form validations for resetPass page
 */
import * as yup from "yup";

export const resetPassFormValidation = yup.object({
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), ""], "Password must match")
    .required("Confirm password field is required")
    .min(8, "Password must be 8 characters long"),
});
