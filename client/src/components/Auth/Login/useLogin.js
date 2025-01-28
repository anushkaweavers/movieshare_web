import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import { logInApi, resendEmailVerifyApi, socialLoginApi } from "../../../actions/auth.actions";
import { updateUserData } from "../../../redux/Auth/user.slice";
import loginValidation from "../../../Validations/Auth/login.validation";

export const useLogin = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false);

  const handleLogin = async (values) => {
    try {
      setPending(true);
      const loginData = await logInApi(values);
      if (loginData.status) {
        if (!loginData.result.is_email_verified && !loginData.result.userData) {
          toast.success(loginData.message);
          await resendEmailVerifyApi(values.email);
        } else {
          toast.success(loginData.message);
          cookies.set("access_token", loginData.result.tokens.access.token);
          cookies.set("refresh_token", loginData.result.tokens.refresh.token);
          dispatch(updateUserData(loginData.result.userData));
          navigate("/list");
        }
      } else {
        toast.error(loginData.message);
      }
    } catch (error) {
      console.error("Login Error: ", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setPending(false);
    }
  };

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidation,
    onSubmit: handleLogin,
  });

  const responseMessage = async (response, name) => {
    try {
      setPending(true);
      const token = name === "google" ? response : response?.accessToken;
      const res = await socialLoginApi({ token, type: name });
      if (res.status) {
        toast.success(res.message);
        cookies.set("access_token", res.result.tokens.access.token);
        cookies.set("refresh_token", res.result.tokens.refresh.token);
        dispatch(updateUserData(res.result.userData));
        navigate("/list");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Social Login Error: ", error);
      toast.error("An unexpected error occurred during social login.");
    } finally {
      setPending(false);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => responseMessage(tokenResponse?.code, "google"),
  });

  return { loginFormik, googleLogin, isPending };
};
