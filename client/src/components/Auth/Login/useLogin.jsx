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

  useEffect(() => {
    setLoginMessage(""); 
    setIsError(false);
  }, []);

  // ✅ Only navigate if login is successful (no sudden flickers)
  useEffect(() => {
    if (user && user._id) {
      console.log("✅ Login successful! Navigating to /list...");
      setTimeout(() => navigate("/list"), 1000);
    }
  }, [user, navigate]);

  const handleLogin = async (values) => {
    setLoginMessage(""); 
    setIsError(false);
  
    try {
      setPending(true);
      const loginData = await logInApi(values);
      console.log("✅ Login response:", loginData); // Debugging
  
      if (loginData?.tokens?.accessToken && loginData?.user?._id) {
        storeUserData(loginData.tokens, loginData.user);
        dispatch(updateUserData(loginData.user));
  
        setLoginMessage("✅ Login successful! Redirecting...");
        setIsError(false);
        setTimeout(() => navigate("/list"), 1000);
      } else {
        throw new Error("Incorrect email or password");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
  
      const errorMessage =
        error.response?.data?.message || "❌ Incorrect email or password.";
  
      setLoginMessage(errorMessage);
      setIsError(true);
  
      console.log("🔴 Error message state updated:", errorMessage); // Debugging
    } finally {
      setPending(false);
    }
  };
  
  const storeUserData = (tokens, user) => {
    if (!tokens || !user?._id) return;

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
