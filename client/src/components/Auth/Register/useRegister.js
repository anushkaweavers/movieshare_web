import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";  // Keep it if used in validation schema
// Replace with relative paths
import { registerUserApi } from "../../../actions/auth.actions";  // Correct relative path
import { registrationFormValidation } from "../../../Validations/Auth/register.validation";  // Correct relative path


export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);

  const registerFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      date_of_birth: "",
      gender: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registrationFormValidation,  // Make sure validation schema is correctly imported
    onSubmit: async (values) => {
      setIsPending(true);
      try {
        await registerUserApi(values);  // Ensure this function is imported and available
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        console.error("Error registering user:", error);
      }
    },
  });

  return { registerFormik, isPending };
};
