import { AxiosResponse } from "axios";

interface ErrorResponse {
  response: {
    data: any;
  };
}

export type ResponseOrError<T> = AxiosResponse<T> | ErrorResponse;

const catchAsync = <T>(
  fn: (..._args: any[]) => Promise<AxiosResponse<T>> // eslint-disable-line
  // eslint-disable-next-line
): ((..._args: any[]) => Promise<any>) => {
  return async (...rest: any[]) => {
    try {
      const result = await fn(...rest);
      return result.data as any;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return error;
    }
  };
};

export default catchAsync;
