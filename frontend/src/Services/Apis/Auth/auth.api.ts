/**
 * This file contains all the apis related to Auth module
 *
 */

import axiosCustom from "@/Services/AxiosConfig/axiosCustom";
import { LoginData } from "@/Types/Auth/Auth.api.types";
import catchAsync from "@/Utils/CommonFunctions/catchAsync";

/**
 * @endpoint 'auth/profile?id=${id}'
 * @description get indivisual user profile with {userId}
 * @queryparam {id:string}
 */
export const getIndividualProfileApi = catchAsync(async (id: string) => {
  const data = await axiosCustom.get(`auth/profile?id=${id}`);
  return data;
});

//----------------------------------------------------------------
// UnUsed Apis

/**
 * @endpoint 'agora/agora-register'
 * @description Api to login with credentials
 * @body {
 *          "email":string,
 *          "password":string
 *      }
 */
export const agoraRegisterApi = catchAsync(async (values: LoginData) => {
  const data = await axiosCustom.post(`agora/agora-register`, values);
  return data;
});
