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
  const navigate = useNavigate(); // Ensure the navigate function is being used correctly
  const [isPending, setPending] = useState(false);

  // Handle login form submission
  const handleLogin = async (values) => {
    console.log("handleLogin triggered with values:", values); // Check if handleLogin is triggered
    try {
      setPending(true);
      const loginData = await logInApi(values);
      console.log("Login API Response:", loginData); // Log API response
  
      if (loginData && loginData.tokens && loginData.user) {  // Check if tokens and user data are available
        console.log("Login successful:", loginData);
  
        // Store tokens and user data in cookies and state
        cookies.set("access_token", loginData.tokens.accessToken);
        cookies.set("refresh_token", loginData.tokens.refreshToken);
        dispatch(updateUserData(loginData.user));
  
        // Proceed to navigate
        console.log("Navigating to /list");
        navigate("/list");
      } else {
        console.log("Login failed: Invalid response", loginData); // Log failure when response is invalid
        toast.error("Login failed: Invalid response");
      }
    } catch (error) {
      console.error("Login Error: ", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setPending(false);
    }
  };
  
  
  // Formik setup for the login form
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidation,
    onSubmit: handleLogin,  // Link form submission to handleLogin function
  });

  // Handling social login (e.g., Google login)
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
        
        // Successfully logged in, navigate to /list
        console.log("Navigating to /list");  // Debugging the navigation
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

  // Google login setup
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => responseMessage(tokenResponse?.code, "google"),
  });

  return { loginFormik, googleLogin, isPending };
};
