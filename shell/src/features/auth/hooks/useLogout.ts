import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import { isSuccessResponse } from "../../../shared/types/response.types";

type LogoutResponse = {
  success: boolean;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: async () => {
      const response = await apiRequest<LogoutResponse>(
        () => axiosInstance.post("/api/auth/logout"),
        "Logout failed"
      );
      
      if (isSuccessResponse(response)) {
        return response.data;
      } else {
        throw new Error(response.error.message || "Logout failed");
      }
    },
    onSuccess: () => {
      // Clear any auth-related cache
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Remove token from localStorage
      localStorage.removeItem('token');
    },
  });
};
