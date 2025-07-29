import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"
import axiosInstance from "../../../axiosInstance"

export const useGetChatIds = () => {
    return useQuery({
        queryKey: useGetChatIds.queryKey,
        queryFn: () => apiRequest<{ chatId: string, name: string }[]>(() => axiosInstance.get('/chat-history-id-list'),
            'chat-ids error')
    })
}

useGetChatIds.queryKey = ['chat-ids'];
