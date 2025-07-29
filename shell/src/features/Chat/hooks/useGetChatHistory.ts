import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"
import axiosInstance from "../../../axiosInstance"
import type { Message } from "../types"

export const useGetChatHistory = (chatId?: string) => {
    return useQuery({
        enabled: !!chatId,
        queryKey: ['chat-history', chatId],
        queryFn: () => apiRequest<{ chatId: string, name: string, component: string, messages: Message[] }>(() => axiosInstance.get('/chat-history', { params: { chatId } }),
            'chat-history error'),
        refetchOnWindowFocus: false,

    })
}