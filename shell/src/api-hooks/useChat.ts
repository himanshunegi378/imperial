import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

export const useChat = ()=>{
    return useMutation({
        mutationFn: async ({message, chatId}: {message: string, chatId?: string})=>{
            const response = await axiosInstance.post('/chat', {message, chatId})
            return response.data
        }
    })
}