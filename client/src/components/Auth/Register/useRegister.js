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
      console.log("Submitting form with values:", values);
      setIsPending(true);

      try {
        await registerUserApi(values);
        console.log("User successfully registered");
        setIsPending(false);
      } catch (error) {
        console.error("Error registering user:", error);
        setIsPending(false);
      }
    },
  });

  return { registerFormik, isPending };
};
