import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
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
  const [loginMessage, setLoginMessage] = useState("");  // State for managing login messages
  const [isError, setIsError] = useState(false);  // State for managing error or success
  
  // Handle login form submission
  const handleLogin = async (values) => {
    setLoginMessage(""); // Reset message before starting login
    setIsError(false); // Reset error flag before login attempt
    try {
      setPending(true);
      const loginData = await logInApi(values);
  
      if (loginData && loginData.tokens && loginData.user) {
        // Store tokens and user data in cookies and state
        cookies.set("access_token", loginData.tokens.accessToken);
        cookies.set("refresh_token", loginData.tokens.refreshToken);
        dispatch(updateUserData(loginData.user));

        // Show success message on UI
        setLoginMessage("Login successful!");
        setIsError(false);
        
        // Navigate to list page
        navigate("/list");
      } else {
        // Show failure message on UI
        setLoginMessage("Login failed: Invalid response.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Login Error: ", error);
      // Show error message on UI
      setLoginMessage("An unexpected error occurred.");
      setIsError(true);
    } finally {
      setPending(false);
    }
  };
  
  // Formik setup for the login form
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidation,
    onSubmit: handleLogin,
  });

  // Handling social login (e.g., Google login)
  const responseMessage = async (response, name) => {
    setLoginMessage("");  // Reset message before starting login
    setIsError(false); // Reset error flag before social login attempt
    try {
      setPending(true);
      const token = name === "google" ? response : response?.accessToken;
      const res = await socialLoginApi({ token, type: name });
      
      if (res.status) {
        // Show success message on UI
        setLoginMessage("Login successful!");
        setIsError(false);
        
        // Store tokens and user data in cookies and state
        cookies.set("access_token", res.result.tokens.access.token);
        cookies.set("refresh_token", res.result.tokens.refresh.token);
        dispatch(updateUserData(res.result.userData));
        
        // Navigate to list page
        navigate("/list");
      } else {
        // Show failure message on UI
        setLoginMessage(res.message);
        setIsError(true);
      }
    } catch (error) {
      console.error("Social Login Error: ", error);
      // Show error message on UI
      setLoginMessage("An unexpected error occurred during social login.");
      setIsError(true);
    } finally {
      setPending(false);
    }
  };

  // Google login setup
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => responseMessage(tokenResponse?.code, "google"),
  });

  return { loginFormik, googleLogin, isPending, loginMessage, isError };
};
