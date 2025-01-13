/**
 * This file contains all the apis related to Profile module
 */

import axiosCustom from "@/Services/AxiosConfig/axiosCustom";
import {
  ChangePasswordType,
  UpdateProfileApiTypes,
} from "@/Types/Profile/profile.api.types";
import catchAsync from "@/Utils/CommonFunctions/catchAsync";

/**
 * @endpoint 'profile/change_password'
 * @description change password for profile user with new password
 * @body {
            old_password: string,
            password: string,
            confirm_password: string
};
 */
export const changePasswordApi = catchAsync(
  async (value: ChangePasswordType) => {
    const data = await axiosCustom.post(`profile/change_password`, value);
    return data;
  }
);

/**
 * @endpoint 'profile/update_profile'
 * @description Update user profile details
 * @body {
            old_password: string,
            password: string,
            confirm_password: string
};
 */
export const updateProfileDataApi = catchAsync(
  async (value: UpdateProfileApiTypes) => {
    const data = await axiosCustom.put(`profile/update_profile`, value);
    return data;
  }
);
