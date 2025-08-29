import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import type { AuthResponse } from "../types";
import { isSuccessResponse } from "../../../shared/types/response.types";
import axios from "axios";

export const useRefreshToken = () => {
  return useMutation<AuthResponse, Error, void>({
    mutationFn: async () => {
      const response = await apiRequest<AuthResponse>(
        () => axios.post("/api/auth/refresh", {}, { skipAuthRefresh: true, baseURL: import.meta.env.VITE_API_URL, withCredentials: true }),
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
