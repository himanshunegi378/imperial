import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"
import { apiRequest } from "../shared/utils/apiReuest"
import { isSuccessResponse } from "../shared/types/response.types"

export const useChat = () => {
    return useMutation({
        mutationFn: async ({ message, chatId }: { message: string, chatId?: string }) => {
            const response = await apiRequest<{ component: string, name: string, message: string, chatId: string }>(
                () => axiosInstance.post('/chat', { userMessage: message, chatId }),
                'An error occurred while sending the message'
            )
            
            if (isSuccessResponse(response)) {
                return response.data
            } else {
                throw new Error(response.error.message || 'An error occurred while sending the message')
            }
        }
    })
}