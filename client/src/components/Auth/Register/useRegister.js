import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { registerUserApi } from "../../../actions/auth.actions"; // Correct relative path
import { registrationFormValidation } from "../../../Validations/Auth/register.validation"; // Correct relative path
import "react-toastify/dist/ReactToastify.css";

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
      setIsPending(true); // Indicate loading state
      try {
        const response = await registerUserApi(values); // Call your API function
        toast.success("Registration successful! Please log in.", {
          position: "top-center",
        }); // Show success notification
        setIsPending(false); // Turn off loading
        return response; // Ensure response is returned
      } catch (error) {
        console.error("Error occurred during registration:", error); // Log error
        toast.error(
          error.response?.data?.message || "Registration failed. Please try again.",
          {
            position: "top-center",
          }
        ); // Show detailed error notification if possible
        setIsPending(false); // Turn off loading
        return Promise.reject(error); // Ensure error is propagated
      }
    }
,    
  });

  return { registerFormik, isPending };
};