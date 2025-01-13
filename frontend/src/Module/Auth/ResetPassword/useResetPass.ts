import { resetPasswordApi } from "@/actions/auth.actions";
import { resetPassFormValidation } from "@/Validations/Auth/resetPass.validation";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [openConfrimModal, setOpenConfirmModal] = useState<boolean>(false);
  const [isPending, setTransition] = useTransition();

  const handleResetPass = async (values: { password: string }) => {
    const body = {
      token: params.get("id"),
      new_password: values.password,
    };
    const response = await resetPasswordApi(body);
    if (response.status) {
      setOpenConfirmModal(true);
    } else {
      toast.error(response.message);
    }
  };

  // ResetPass Component Formik
  const resetPassFormik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetPassFormValidation,
    onSubmit: (values) => {
      setTransition(() => {
        handleResetPass(values);
      });
    },
  });

  const gotoLogin = () => {
    router.replace("/login");
  };
  return {
    resetPassFormik,
    openConfrimModal,
    gotoLogin,
    isPending,
  };
};
