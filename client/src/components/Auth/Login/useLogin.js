import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // React Router's navigate hook
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import { logInApi, resendEmailVerifyApi, socialLoginApi } from "../../../actions/auth.actions";
import { updateUserData } from "../../../redux/Auth/user.slice"; // Add this import
import loginValidation from "../../../Validations/Auth/login.validation";

export const useLogin = () => {
  const cookies = new Cookies();
  const dispatchMS = useDispatch();
  const navigate = useNavigate(); // Use navigate from React Router
  const [isPending, setTransition] = useState(false);

  const handleLogin = async (values) => {
    const loginData = await logInApi(values);
    if (loginData.status) {
      if (!loginData.result.is_email_verified && !loginData.result.userData) {
        toast.success(loginData.message);
        await resendEmailVerifyApi(values.email);
      } else {
        toast.success(loginData.message);
        cookies.set("access_token", loginData.result.tokens.access.token);
        cookies.set("refresh_token", loginData.result.tokens.refresh.token);
        dispatchMS(updateUserData(loginData.result.userData));
        navigate("/movies/list"); // Use navigate to redirect
      }
    } else {
      toast.error(loginData.message);
    }
  };

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      setTransition(true);
      handleLogin(values);
    },
  });

  const responseMessage = async (response, name) => {
    let token = name === "google" ? response : response?.accessToken;
    const res = await socialLoginApi({ token, type: name });
    if (res.status) {
      toast.success(res.message);
      cookies.set("access_token", res.result.tokens.access.token);
      cookies.set("refresh_token", res.result.tokens.refresh.token);
      dispatchMS(updateUserData(res.result.userData));
      navigate("/movies/list");
    } else {
      toast.error(res.message);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => responseMessage(tokenResponse?.code, "google"),
  });

  return { loginFormik, googleLogin, isPending };
};
