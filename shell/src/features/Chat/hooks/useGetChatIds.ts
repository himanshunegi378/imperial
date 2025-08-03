import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"
import axiosInstance from "../../../axiosInstance"
import { isSuccessResponse } from "../../../shared/types/response.types"

export const useGetChatIds = () => {
    return useQuery({
        queryKey: useGetChatIds.queryKey,
        queryFn: async () => {
            const response = await apiRequest<{ chatId: string, name: string }[]>(
                () => axiosInstance.get('/chat-history-id-list'),
                'chat-ids error'
            );
            
            if (isSuccessResponse(response)) {
                return response.data;
            } else {
                throw new Error(response.error.message || 'Failed to fetch chat IDs');
            }
        }
    })
}

useGetChatIds.queryKey = ['chat-ids'];
