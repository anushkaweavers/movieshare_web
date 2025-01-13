/**
 * This a custom hook file for Login Component
 */

import {
  logInApi,
  resendEmailVerifyApi,
  socialLoginApi,
} from "@/actions/auth.actions";
import { updateUserData } from "@/Redux/Auth/user.slice";
import { RootState } from "@/Redux/store";
import { ILoginResponse, LoginData } from "@/Types/Auth/Auth.api.types";
import { loginValidation } from "@/Validations/Auth/login.validation";
import { useGoogleLogin } from "@react-oauth/google";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export const useLogin = () => {
  const cookies = new Cookies();
  const dispatchMS = useDispatch<ThunkDispatch<void, RootState, Action>>();
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  // Login function called on submit of form
  const handleLogin = async (values: LoginData) => {
    const loginData: ILoginResponse = await logInApi(values);
    if (loginData.status) {
      if (!loginData.result.is_email_verified && !loginData.result.userData) {
        toast.success(loginData.message);
        await resendEmailVerifyApi(values.email);
      } else {
        toast.success(loginData.message);
        cookies.set("access_token", loginData.result.tokens.access.token);
        cookies.set("refresh_token", loginData.result.tokens.refresh.token);
        dispatchMS(updateUserData(loginData.result.userData));
        router.push("/movies/list");
      }
    } else {
      toast.error(loginData.message);
    }
  };

  // Login Component Formik
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      setTransition(() => {
        handleLogin(values);
      });
    },
  });

  const responseMessage = async (response: any, name: string) => {
    let token;
    if (name === "google") {
      token = response;
    } else {
      token = response?.accessToken;
    }
    const res: ILoginResponse = await socialLoginApi({ token, type: name });
    if (res.status) {
      toast.success(res.message);
      cookies.set("access_token", res.result.tokens.access.token);
      cookies.set("refresh_token", res.result.tokens.refresh.token);
      dispatchMS(updateUserData(res.result.userData));
      router.push("/movies/list");
    } else {
      toast.error(res.message);
    }
  };
  // Google Login
  const googleLogin: any = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      responseMessage(tokenResponse?.code, "google");
    },
  });
  return {
    loginFormik,
    googleLogin,
    isPending,
  };
};
