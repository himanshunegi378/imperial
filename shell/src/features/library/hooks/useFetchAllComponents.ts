import axiosInstance from "../../../axiosInstance"
import { useQuery } from "@tanstack/react-query"

export const useFetchAllComponents = () => {
    return useQuery({
        queryKey: ['components'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<{ data: { chatId: string, name: string, html: string, id: number }[] }>('/all-components')
            return data.data
        },
    })
}
