import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { forgotPasswordApi } from "../../../actions/auth.actions";
import forgotPassValidation from "../../../Validations/Auth/forgot.validation";

export const useForgotPassword = () => {
    const navigate = useNavigate();
    const [isPending, setTransition] = useTransition();
  
    const handleSubmitForgotPass = async (email) => {
      try {
        const response = await forgotPasswordApi({ email }); // Pass email as an object
        if (response.status) {
          toast.success(response.message);
          navigate("/login");
        } else {
          toast.error(response.message || "Failed to send reset link.");
        }
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred.");
      }
    };
  
    const forgotPassFormik = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPassValidation,
      onSubmit: (values) => {
        setTransition(() => {
          handleSubmitForgotPass(values.email);
        });
      },
    });
  
    return {
      forgotPassFormik,
      isPending,
    };
  };
  