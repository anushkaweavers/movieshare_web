import axios from "axios";  

export const SERVER_URL = "http://localhost:3000";

const axiosCustom = axios.create({
  baseURL: `${SERVER_URL}/v1/`,
  headers: { "Content-Type": "application/json" },
});
axiosCustom.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); 
    console.log("Token being sent in headers:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosCustom.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token expired! Logging out...");
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosCustom;
