import axiosInstance from "../../../axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"

export const useFetchAllComponents = () => {
    return useQuery({
        queryKey: ['components'],
        queryFn: async () => {
            const data = await apiRequest<{
                id: number;
                chatId: string | null;
                userId: string;
                name: string;
                html: string;
                hideFromLibrary: boolean;
            }[]>(() => axiosInstance.get('/library/get-user-generated-components'),
                'all-components error')
            return data
        },
    })
}
