import axios from "axios";
import store  from "../../redux/store"; // Import the store to dispatch logout
import { userLogout } from "../../redux/Auth/user.slice"; // Import the logout action

export const SERVER_URL = "http://localhost:3000";

const axiosCustom = axios.create({
  baseURL: `${SERVER_URL}/v1/`,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;

// Function to logout user & redirect
const logoutUser = () => {
  console.warn("Logging out user due to expired refresh token.");

  // Dispatch Redux action to clear user state
  store.dispatch(userLogout());

  // Clear all authentication tokens
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  cookies.remove("access_token", { path: "/" });
  cookies.remove("refresh_token", { path: "/" });

  // Redirect user to login page
  window.location.href = "/login";
};

// Request Interceptor: Attach Access Token
axiosCustom.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry
axiosCustom.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If Unauthorized (401) and request has not been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        console.warn("Token refresh already in progress. Avoiding duplicate refresh attempts.");
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token available");

        // Request new access token
        const response = await axios.post(`${SERVER_URL}/v1/auth/refresh-tokens`, { refreshToken });
        const { accessToken } = response.data;

        // Store new access token
        localStorage.setItem("access_token", accessToken);

        // Update request header & retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        isRefreshing = false;
        return axiosCustom(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        isRefreshing = false;

        // Logout if refresh token is invalid/expired
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Make sure to use `export default`
export default axiosCustom;
