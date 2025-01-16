import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordApi } from "../../../actions/auth.actions";
import { resetPassFormValidation } from "../../../Validations/Auth/reset.validations";

const useResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Correct hook for navigation
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleResetPass = async (values) => {
    const params = new URLSearchParams(location.search);
    const body = {
      token: params.get("id"),
      new_password: values.password,
    };

    setIsPending(true);
    try {
      const response = await resetPasswordApi(body);
      if (response.status) {
        setOpenConfirmModal(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsPending(false);
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
    navigate("/login"); // Correctly navigate to login
  };

  return {
    resetPassFormik,
    openConfirmModal,
    gotoLogin,
    isPending,
  };
};

export default useResetPassword;
