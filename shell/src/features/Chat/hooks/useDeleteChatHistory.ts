import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/utils/apiReuest";
import axiosInstance from "../../../axiosInstance";
import { useGetChatIds } from "./useGetChatIds";

type DeleteChatHistoryResponse = {
  success: boolean;
};

export const useDeleteChatHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteChatHistoryResponse, Error, { chatId: string }>({
    mutationFn: ({ chatId }) =>
      apiRequest<DeleteChatHistoryResponse>(
        () => axiosInstance.delete(`/chat-history/${chatId}`),
        "delete-chat-history error"
      ),
    onSuccess: () => {
      // Invalidate chat ids list to refresh after deletion
      queryClient.invalidateQueries({ queryKey: useGetChatIds.queryKey });
    },
  });
};
