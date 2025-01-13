/**
 * This a custom hook file for Register Component
 */

import { registerUserApi } from "@/actions/auth.actions";
import { ISignUpResponse, RegisterApiData } from "@/Types/Auth/Auth.api.types";
import { registrationFormValidation } from "@/Validations/Auth/register.validation";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export const useRegister = () => {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  // Register a user on the submit of the form
  const handleRegister = async (values: RegisterApiData) => {
    const response: ISignUpResponse = await registerUserApi(values);
    if (response.status) {
      toast.success(response.message);
      router.push("/login");
    } else {
      toast.error(response.message);
    }
  };
  // Formik for registration
  const registerFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      password: "",
      date_of_birth: new Date(),
      gender: "",
      confirm_password: "",
    },
    validationSchema: registrationFormValidation,
    onSubmit: (values) => {
      setTransition(() => {
        const data: RegisterApiData = { ...values };
        delete data.confirm_password;
        handleRegister(data);
      });
    },
  });

  return {
    // Export point for all variable and functions
    registerFormik,
    isPending,
  };
};
