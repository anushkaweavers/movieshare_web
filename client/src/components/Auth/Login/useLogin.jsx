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
  // Get user from Redux (may be already set from a previous session)
  const user = useSelector((state) => state.user.user);

  const [isPending, setPending] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Reset error state on mount
  useEffect(() => {
    setLoginMessage("");
    setIsError(false);
  }, []);

  const handleLogin = async (values) => {
    // Reset error state at the beginning of a login attempt
    setLoginMessage("");
    setIsError(false);

    try {
      setPending(true);
      const loginData = await logInApi(values);
      console.log("✅ API Response:", loginData);

      if (loginData?.tokens?.accessToken && loginData?.user?._id) {
        // Save tokens and user info
        storeUserData(loginData.tokens, loginData.user);
        dispatch(updateUserData(loginData.user));

        // Inform user of success and redirect after a brief pause
        setLoginMessage("✅ Login successful! Redirecting...");
        setIsError(false);
        setTimeout(() => navigate("/list"), 1000);
      } else {
        throw new Error("Incorrect email or password");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);

      let errorMessage = "❌ Incorrect email or password.";
      if (error.response) {
        console.error("🔴 Error Response:", error.response);
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.message) {
        console.error("🔴 Error Message:", error.message);
        errorMessage = error.message;
      }

      // Update the error state immediately
      setLoginMessage(errorMessage);
      setIsError(true);

      console.log("🔴 Updated error state:", { isError, loginMessage });
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
  
    console.log("🔹 Tokens stored successfully:", tokens);
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
