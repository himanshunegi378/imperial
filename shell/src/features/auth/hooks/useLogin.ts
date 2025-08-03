import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import type { AuthResponse, LoginRequest } from "../types";
import { isSuccessResponse } from "../../../shared/types/response.types";

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async (credentials) => {
      const response = await apiRequest<AuthResponse>(
        () => axiosInstance.post("/api/auth/login", credentials),
        "Login failed"
      );
      
      if (isSuccessResponse(response)) {
        return response.data;
      } else {
        throw new Error(response.error.message || "Login failed");
      }
    },
  });
};
