/*import { refreshToken } from "@/Utils/CommonFunctions/commonFuncs";
import { ApiBaseUrl } from "@/Utils/config";
import axios from "axios";

axios.interceptors.request.use(async (config) => {
  config.baseURL = ApiBaseUrl;
  let token = "";
  if (!config.url?.includes(process.env.NEXT_PUBLIC_TMDB_URL!)) {
    token = await refreshToken();
  }
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `${token}`;
  } else if (axios.defaults.headers.common.Authorization) {
    config.headers.common.Authorization = axios.defaults.headers.common;
  }
  return config;
});

/** *
 * *axios response configs
 
axios.interceptors.response.use(
  async (reuslt) => {
    if (reuslt) {
      return reuslt as any; // eslint-disable-line
    }
    return null;
  },
  async (error) => {
    const expectedErrorRefreshToken =
      error.response && error.response.status === 401;

    if (expectedErrorRefreshToken) {
      // Handle refresh token
    }

    // const expectedError =
    //   error.response &&
    //   error.response.status >= 400 &&
    //   error.response.status <= 500;
    // if (expectedError) {
    // }
    return Promise.reject(error);
  }
);

const axiosCustom = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  interceptors: axios.interceptors,
};

export default axiosCustom;*/
