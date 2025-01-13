import { IUserDetails } from "@/Types/Auth/Auth.api.types";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

interface IUserSlice {
  user: IUserDetails;
}
const initialState: IUserSlice = {
  user: {} as IUserDetails,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserData: (state: IUserSlice, action) => {
      state.user = action.payload;
    },
    userLogout: (state: IUserSlice) => {
      const cookies = new Cookies();
      state.user = {} as IUserDetails;
      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });
    },
  },
  extraReducers: () => {},
});

export const { updateUserData, userLogout } = userSlice.actions;
export { userSlice };
export default userSlice.reducer;
