import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import { logInApi, socialLoginApi } from "../../../actions/auth.actions";
import { updateUserData } from "../../../redux/Auth/user.slice";
import loginValidation from "../../../Validations/Auth/login.validation";

export const useLogin = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const storeUserData = (tokens, user) => {
    if (!tokens || !user?._id) {
      console.error(" Invalid tokens or user data:", tokens, user);
      return;
    }

    console.log(" Storing user data:", { tokens, user });

    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);
    localStorage.setItem("userId", user._id);  // API returns `_id`, not `id`

    cookies.set("access_token", tokens.accessToken, { path: "/", sameSite: "Lax" });
    cookies.set("refresh_token", tokens.refreshToken, { path: "/", sameSite: "Lax" });
    cookies.set("userId", user._id, { path: "/", sameSite: "Lax" });
  };

  const handleLogin = async (values) => {
    setLoginMessage("");
    setIsError(false);

    try {
      setPending(true);
      const loginData = await logInApi(values);

      console.log(" Login Data Response:", loginData);  // Debug API response

      if (loginData?.tokens?.accessToken && loginData?.user?._id) {
        storeUserData(loginData.tokens, loginData.user);
        dispatch(updateUserData(loginData.user));

        setLoginMessage("Login successful!");
        setIsError(false);

        await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure storage before navigating
        navigate("/list");
      } else {
        setLoginMessage("Login failed: Invalid response.");
        setIsError(true);
      }
    } catch (error) {
      console.error(" Login Error:", error);
      setLoginMessage("An unexpected error occurred.");
      setIsError(true);
    } finally {
      setPending(false);
    }
  };

  const responseMessage = async (response, provider) => {
    setLoginMessage("");
    setIsError(false);

    try {
      setPending(true);
      const token = provider === "google" ? response : response?.accessToken;
      const res = await socialLoginApi({ token, type: provider });

      console.log("Social Login Response:", res);  

      if (res?.status && res?.result?.tokens?.access?.token && res?.result?.userData?._id) {
        storeUserData(res.result.tokens.access, res.result.userData);
        dispatch(updateUserData(res.result.userData));

        setLoginMessage("Social login successful!");
        setIsError(false);

        await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure storage before navigating
        navigate("/list");
      } else {
        setLoginMessage(res?.message || "Social login failed.");
        setIsError(true);
      }
    } catch (error) {
      console.error(" Social Login Error:", error);
      setLoginMessage("An unexpected error occurred during social login.");
      setIsError(true);
    } finally {
      setPending(false);
    }
  };


  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => responseMessage(tokenResponse?.code, "google"),
  });

  return { 
    loginFormik: useFormik({ 
      initialValues: { email: '', password: '' }, 
      validationSchema: loginValidation, 
      onSubmit: handleLogin 
    }), 
    googleLogin, 
    isPending, 
    loginMessage, 
    isError 
  };
};
