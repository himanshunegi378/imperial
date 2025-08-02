import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";

type LogoutResponse = {
  success: boolean;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: () =>
      apiRequest<LogoutResponse>(
        () => axiosInstance.post("/api/auth/logout"),
        "Logout failed"
      ),
    onSuccess: () => {
      // Clear any auth-related cache
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Remove token from localStorage
      localStorage.removeItem('token');
    },
  });
};
