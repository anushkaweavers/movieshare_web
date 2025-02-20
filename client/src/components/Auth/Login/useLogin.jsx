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

  const handleLogin = async (values) => {
    setLoginMessage("");
    setIsError(false);
    try {
      setPending(true);
      const loginData = await logInApi(values);
      console.log("✅ API Response:", loginData);

      if (loginData?.tokens?.accessToken && loginData?.user?._id) {
        storeUserData(loginData.tokens, loginData.user);
        dispatch(updateUserData(loginData.user));

        setLoginMessage("✅ Login successful! Redirecting...");
        setIsError(false);

        // Redirect to /community after a brief delay
        setTimeout(() => navigate("/community"), 1000);
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

      setLoginMessage(errorMessage);
      setIsError(true);
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