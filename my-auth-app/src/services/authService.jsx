import axios from "axios";

const API_URL = "http://localhost:3000/v1";  // Update to the correct base URL

// Register user API
export const registerUserApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return { status: false, message: "Registration failed" };
  }
};

// Example of login API if you need it
export const loginUserApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { status: false, message: "Login failed" };
  }
};
