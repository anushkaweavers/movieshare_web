import axios from "axios";

const axiosCustom = axios.create({
  baseURL: "http://localhost:3000/v1/",
  headers: { "Content-Type": "application/json" },
});


axiosCustom.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));


axiosCustom.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("🔴 Token expired! Logging out...");
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosCustom;
