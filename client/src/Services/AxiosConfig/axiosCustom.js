import axios from "axios";

const axiosCustom = axios.create({
  baseURL: "http://localhost:3000/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosCustom;
