import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import { useGetChatIds } from "./useGetChatIds";
import { isSuccessResponse } from "../../../shared/types/response.types";

type DeleteChatHistoryResponse = {
  success: boolean;
};

export const useDeleteChatHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteChatHistoryResponse, Error, { chatId: string }>({
    mutationFn: async ({ chatId }) => {
      const response = await apiRequest<DeleteChatHistoryResponse>(
        () => axiosInstance.delete(`/chat-history/${chatId}`),
        "delete-chat-history error"
      );
      
      if (isSuccessResponse(response)) {
        return response.data;
      } else {
        throw new Error(response.error.message || "Failed to delete chat history");
      }
    },
    onSuccess: () => {
      // Invalidate chat ids list to refresh after deletion
      queryClient.invalidateQueries({ queryKey: useGetChatIds.queryKey });
    },
  });
};
