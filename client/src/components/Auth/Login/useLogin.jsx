import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const user = useSelector((state) => state.user.user);

  const [isPending, setPending] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("Updated User State in Redux:", user); // Debug Redux state

    if (user && user._id) {
      console.log("Navigating to /list...");
      setTimeout(() => navigate("/list"), 200); // Small delay to allow Redux to update
    }
  }, [user, navigate]);

  const handleLogin = async (values) => {
    setLoginMessage("");
    setIsError(false);

    try {
      setPending(true);
      const loginData = await logInApi(values);

      console.log("Login Data Response:", loginData); // Debug API response

      if (loginData?.tokens?.accessToken && loginData?.user?._id) {
        storeUserData(loginData.tokens, loginData.user);
        dispatch(updateUserData(loginData.user));

        setLoginMessage("Login successful!");
        setIsError(false);
      } else {
        setLoginMessage("Login failed: Invalid response.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginMessage("An unexpected error occurred.");
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

    // Save tokens and full user object
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
