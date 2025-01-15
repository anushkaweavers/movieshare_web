import { AxiosResponse } from "axios";

const catchAsync = (fn) => {
  return async (...rest) => {
    try {
      const result = await fn(...rest);
      return result.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      return error;
    }
  };
};

export default catchAsync;
