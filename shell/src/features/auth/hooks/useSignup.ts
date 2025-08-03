import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import type { AuthResponse, SignupRequest } from "../types";
import { isSuccessResponse } from "../../../shared/types/response.types";

export const useSignup = () => {
  return useMutation<AuthResponse, Error, SignupRequest>({
    mutationFn: async (userData) => {
      const response = await apiRequest<AuthResponse>(
        () => axiosInstance.post("/api/auth/signup", userData),
        "Signup failed"
      );
      
      if (isSuccessResponse(response)) {
        return response.data;
      } else {
        throw new Error(response.error.message || "Signup failed");
      }
    },
  });
};
