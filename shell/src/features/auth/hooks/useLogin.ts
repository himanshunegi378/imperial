import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import type { AuthResponse, LoginRequest } from "../types";

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (credentials) =>
      apiRequest<AuthResponse>(
        () => axiosInstance.post("/api/auth/login", credentials),
        "Login failed"
      ),
  });
};
