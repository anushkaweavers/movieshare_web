import axios from 'axios';

export const SERVER_URL = 'http://localhost:3000';

const axiosCustom = axios.create({
  baseURL: `${SERVER_URL}/v1/`,
  headers: { 'Content-Type': 'application/json' },
});

// Flag to track refresh failures
let isRefreshing = false;

// Request Interceptor: Attach Access Token
axiosCustom.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        console.warn("Token refresh already in progress. Avoiding duplicate refresh attempts.");
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Request a new token
        const response = await axios.post(`${SERVER_URL}/v1/auth/refresh-tokens`, { refreshToken });
        const { accessToken } = response.data;

        // Store new access token
        localStorage.setItem('access_token', accessToken);

        // Update request header & retry
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        isRefreshing = false;
        return axiosCustom(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        isRefreshing = false;

        // Clear tokens and redirect ONCE
        if (!localStorage.getItem("logout_triggered")) {
          localStorage.setItem("logout_triggered", "true");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosCustom;
