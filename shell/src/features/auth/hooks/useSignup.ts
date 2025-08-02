import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import type { AuthResponse, SignupRequest } from "../types";

export const useSignup = () => {
  return useMutation<AuthResponse, Error, SignupRequest>({
    mutationFn: (userData) =>
      apiRequest<AuthResponse>(
        () => axiosInstance.post("/api/auth/signup", userData),
        "Signup failed"
      ),
  });
};
