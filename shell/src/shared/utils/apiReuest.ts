import axios from "axios";
import { type ApiResponse, isSuccessResponse, isErrorResponse } from "../types/response.types";

// Generic API request handler to avoid code duplication
export async function apiRequest<T>(
  requestFn: () => Promise<{ data: ApiResponse<T> }>,
  errorMessage: string
): Promise<ApiResponse<T>> {
  let result: ApiResponse<T>;
  try {
    const response = await requestFn();
    if (!isSuccessResponse(response.data)) {
      throw new Error(response.data.error.message);
    }
    result = response.data;
    return result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (isErrorResponse(error.response.data)) {
        result = error.response.data;
        return result;
      }
    }
    console.log(error);
    throw new Error(errorMessage);
  }
}