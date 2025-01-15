import { useState } from "react";
import { useFormik } from "formik";
import { registerUserApi } from "../../../actions/auth.actions";  // Correct relative path
import { registrationFormValidation } from "../../../Validations/Auth/register.validation";  // Correct relative path

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);

  const registerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      birthday: "",
      gender: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
    validationSchema: registrationFormValidation,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);  // Log form values
      setIsPending(true);  // Indicate loading state

      try {
        const response = await registerUserApi(values);  // Call your API function
        console.log("API response:", response);  // Log the response
        setIsPending(false);  // Turn off loading
        return response;
      } catch (error) {
        console.error("Error occurred during registration:", error);  // Log any errors
        setIsPending(false);  // Turn off loading in case of error
      }
    },
  });

  return { registerFormik, isPending };
};
