import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { logInApi } from "../../../actions/auth.actions";
import { updateUserData } from "../../../redux/Auth/user.slice";
import loginValidation from "../../../Validations/Auth/login.validation";

export const useLogin = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [isPending, setPending] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // 🛠 Fix: Reset error state ONLY when page loads
  useEffect(() => {
    console.log("Resetting login state on component mount.");
    setLoginMessage(""); // Clear old error messages
    setIsError(false);
  }, []);

  // Navigate if login is successful
  useEffect(() => {
    if (user && user._id) {
      setLoginMessage("Login successful!");
      console.log("Navigating to /list...");
      setTimeout(() => navigate("/list"), 200);
    }
  }, [user, navigate]);

  const handleLogin = async (values) => {
    setLoginMessage(""); // Reset previous message before new login attempt
    setIsError(false);
  
    try {
      setPending(true);
      const loginData = await logInApi(values);
  
      console.log("Login Data Response:", loginData);
  
      if (loginData?.tokens?.accessToken && loginData?.user?._id) {
        storeUserData(loginData.tokens, loginData.user);
        dispatch(updateUserData(loginData.user));
  
        setLoginMessage("✅ Login successful! Redirecting...");
        setIsError(false);
  
        // Redirect after a short delay to allow message display
        setTimeout(() => navigate("/list"), 1000);
      } else {
        setLoginMessage("❌ Login failed. Please check your email or password.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
  
      // Extract backend error message if available
      const errorMessage =
        error.response?.data?.message || "❌ An unexpected error occurred. Please try again.";
  
      setLoginMessage(errorMessage);
      setIsError(true);
    } finally {
      setPending(false);
    }
  };
  

  const storeUserData = (tokens, user) => {
    if (!tokens || !user?._id) {
      console.error("Invalid tokens or user data:", tokens, user);
      return;
    }

    console.log("Storing user data:", { tokens, user });

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);

    cookies.set("access_token", tokens.accessToken, { path: "/", sameSite: "Lax" });
    cookies.set("refresh_token", tokens.refreshToken, { path: "/", sameSite: "Lax" });
  };

  return {
    loginFormik: useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginValidation,
      onSubmit: handleLogin,
    }),
    isPending,
    loginMessage,
    isError,
  };
};
