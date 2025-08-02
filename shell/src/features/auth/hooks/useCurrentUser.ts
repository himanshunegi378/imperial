import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import type { User } from "../types";
import { getToken } from "../utils/tokenStorage";

export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = getToken();
      
      if (!token) {
        return null;
      }
      
      return apiRequest<User>(
        () => axiosInstance.get("/api/auth/user"),
        "Failed to fetch user information"
      );
    },
    // Don't refetch on window focus if no token exists
    enabled: !!getToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
