import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Auth/user.slice";

// Load persisted state
const persistedState = {
  user: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState,  // Ensure user is loaded correctly
});

export default store;
