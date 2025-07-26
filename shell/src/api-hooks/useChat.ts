import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"
import { apiRequest } from "../shared/utils/apiReuest"

export const useChat = () => {
    return useMutation({
        mutationFn: async ({ message, chatId }: { message: string, chatId?: string }) => {
            const data = apiRequest<{ component: string, name: string, message: string, chatId: string }>(() => axiosInstance.post('/chat', { userMessage: message, chatId }),
                'An error occurred while sending the message')
            return data
        }
    })
}