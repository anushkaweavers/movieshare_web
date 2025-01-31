import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../../actions/auth.actions";
import { registrationFormValidation } from "../../../Validations/Auth/register.validation";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // State to store error messages
  const navigate = useNavigate();

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
      console.log("Form submitted with values:", values);
      setIsPending(true);
      setErrorMessage(""); // Clear previous errors
    
      try {
        const fullResponse = await registerUserApi(values);
        console.log("Full API Response:", fullResponse); // ✅ Check the actual structure
    
        // Since response does not contain status, check if 'user' exists
        if (fullResponse && fullResponse.user) {
          console.log("✅ Registration successful!");
          setIsPending(false);
          navigate("/login");  // Navigate only on success
          return;
        }
    
        throw new Error("Registration failed. Please try again.");
      } catch (error) {
        console.error("Error occurred during registration:", error);
        setIsPending(false);
    
        if (error.response) {
          setErrorMessage(error.response.data?.message || "Registration failed. Please check your details.");
        } else if (error.request) {
          setErrorMessage("No response from the server. Please try again later.");
        } else {
          setErrorMessage(error.message || "An unexpected error occurred.");
        }
      }
    }
    
    
  });

  return { registerFormik, isPending, errorMessage };
};
