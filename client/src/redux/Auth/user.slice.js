import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

// Initial state with empty user object
const initialState = {
  user: {},  // Will hold the user data
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.user = action.payload;  // Update user data with the payload from the action
    },
    userLogout: (state) => {
      const cookies = new Cookies();
      state.user = {};  // Clear user data
      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });  // Remove tokens from cookies
    },
  },
  extraReducers: () => {},
});

// Export the actions and reducer
export const { updateUserData, userLogout } = userSlice.actions;
export { userSlice };
export default userSlice.reducer;
