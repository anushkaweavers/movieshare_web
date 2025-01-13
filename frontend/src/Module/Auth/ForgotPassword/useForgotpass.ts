import { forgotPasswordApi } from "@/actions/auth.actions";
import { forgotPassValidation } from "@/Validations/Auth/forgotPass.validation";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();

  const handleSubmitForgotPass = async (email: string) => {
    const response = await forgotPasswordApi(email);
    if (response.status) {
      toast.success(response.message);
      router.push("/login");
    } else {
      toast.error(response.message);
    }
  };
  // Forgot pass Component Formik
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
