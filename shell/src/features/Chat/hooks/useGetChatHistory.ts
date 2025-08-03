import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"
import axiosInstance from "../../../axiosInstance"
import type { Message } from "../types"
import { isSuccessResponse } from "../../../shared/types/response.types"

export const useGetChatHistory = (chatId?: string) => {
    return useQuery({
        enabled: !!chatId,
        queryKey: ['chat-history', chatId],
        queryFn: async () => {
            const response = await apiRequest<{ chatId: string, name: string, component: string, messages: Message[] }>(
                () => axiosInstance.get('/chat-history', { params: { chatId } }),
                'chat-history error'
            );
            
            if (isSuccessResponse(response)) {
                return response.data;
            } else {
                throw new Error(response.error.message || 'Failed to fetch chat history');
            }
        },
        refetchOnWindowFocus: false,
    })
}