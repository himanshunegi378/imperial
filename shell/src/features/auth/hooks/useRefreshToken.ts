import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import type { AuthResponse } from "../types";
import { isSuccessResponse } from "../../../shared/types/response.types";

export const useRefreshToken = () => {
  return useMutation<AuthResponse, Error, void>({
    mutationFn: async () => {
      const response = await apiRequest<AuthResponse>(
        () => axiosInstance.post("/api/auth/refresh"),
        "Token refresh failed"
      );
      
      if (isSuccessResponse(response)) {
        return response.data;
      } else {
        throw new Error(response.error.message || "Token refresh failed");
      }
    },
  });
};
