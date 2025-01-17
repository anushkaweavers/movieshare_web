import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordApi } from "../../../actions/auth.actions";
import { resetPassFormValidation } from "../../../Validations/Auth/reset.validations";

export const useResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleResetPass = async (values) => {
    const token = new URLSearchParams(location.search).get("token"); // Extract 'token' from URL
    if (!token) {
      toast.error("Token is missing or invalid");
      return;
    }

    const payload = {
      newPassword: values.password,
      confirmPassword: values.confirm_password,
    };

    try {
      setIsPending(true); // Show loader
      const response = await resetPasswordApi({ token, ...payload }); // Send token and payload
      setIsPending(false); // Hide loader

      if (response.status) {
        toast.success("Password reset successful");
        setOpenConfirmModal(true); // Show confirmation modal
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      setIsPending(false); // Hide loader
      toast.error("An error occurred during the reset process");
      console.error(error);
    }
  };

  const resetPassFormik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetPassFormValidation,
    onSubmit: (values) => {
      handleResetPass(values);
    },
  });

  const gotoLogin = () => {
    navigate("/login");
  };

  return {
    resetPassFormik,
    openConfirmModal,
    gotoLogin,
    isPending,
  };
};
