/**
 * This file contains all server actions related to Authentication
 */

"use server";

import axiosCustom from "@/Services/AxiosConfig/axiosCustom";
import {
  IRefreshToken,
  LoginData,
  RegisterApiData,
  ResetPasswordApiData,
  SocialLoginType,
} from "@/Types/Auth/Auth.api.types";
import catchAsync from "@/Utils/CommonFunctions/catchAsync";

/**
 * @endpoint 'auth/login'
 * @description Api to login with credentials
 * @body {
 *          "email":string,
 *          "password":string
 *      }
 */

export const logInApi = catchAsync(async (values: LoginData) => {
  const data = await axiosCustom.post(`auth/login`, values);
  return data;
});

/**
 * @endpoint 'auth/social-login'
 * @description Social login with generated token with Google or Facebook
 * @body {
            type: string,
            token: string
};
 */
export const socialLoginApi = catchAsync(async (value: SocialLoginType) => {
  const data = await axiosCustom.post(`auth/social-login`, value);
  return data;
});

/**
 * @endpoint 'auth/register'
 * @description Api to register in movie share
 * @body {
 *          first_name: string,
            last_name: string,
            user_name: string,
            email: string,
            password: string,
            date_of_birth: string,
            gender: string
 *      }
 */
export const registerUserApi = catchAsync(async (values: RegisterApiData) => {
  const data = await axiosCustom.post(`auth/register`, values);
  return data;
});

/**
 * @endpoint 'auth/resend-link'
 * @description Verification email can be resend with this email address
 * @body {
 *          email: string
 *      }
 */
export const resendEmailVerifyApi = catchAsync(async (email: string) => {
  const data = await axiosCustom.post(`auth/resend-link`, { email });
  return data;
});

/**
 * @endpoint 'auth/forgot-password'
 * @description Iniciate forgot password process with email address
 * @body {
 *          email: string
 *      }
 */
export const forgotPasswordApi = catchAsync(async (email: string) => {
  const data = await axiosCustom.post(`auth/forgot-password`, { email });
  return data;
});

/**
 * @endpoint 'auth/email-verification'
 * @description After successful registration with this api user will verify their email
 * @body {
 *          token: string
 *      }
 */
export const emailVerifyApi = catchAsync(async (id: string) => {
  const data = await axiosCustom.post(`auth/email-verification`, {
    token: id,
  });
  return data;
});

/**
 * @endpoint 'auth/reset-password'
 * @description Reset password process with newpassword
 * @body {
            token: string;
            id: string;
            newPassword: string;
            confirmPassword: string;
};
 */
export const resetPasswordApi = catchAsync(
  async (value: ResetPasswordApiData) => {
    const data = await axiosCustom.post(`auth/reset-password`, value);
    return data;
  }
);

/**
 * @endpoint 'auth/refresh-tokens'
 * @description Reset password process with newpassword
 * @body {
            token: string;
};
 */
export const generateTokenApi = catchAsync(async (value: IRefreshToken) => {
  const data = await axiosCustom.post(`auth/refresh-tokens`, value);
  return data;
});
