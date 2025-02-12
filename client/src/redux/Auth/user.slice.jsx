import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

// Load user from localStorage if available
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: storedUser,  // Store full user object
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      console.log("Updating Redux state with user:", action.payload);  // Debug log
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      console.log("Logging out user");  // Debug log
      const cookies = new Cookies();

      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });
    },
  },
});

export const { updateUserData, userLogout } = userSlice.actions;
export default userSlice.reducer;
