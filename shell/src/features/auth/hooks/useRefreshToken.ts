import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import type { AuthResponse } from "../types";

export const useRefreshToken = () => {
  return useMutation<AuthResponse, Error, void>({
    mutationFn: () =>
      apiRequest<AuthResponse>(
        () => axiosInstance.post("/api/auth/refresh"),
        "Token refresh failed"
      ),
  });
};
