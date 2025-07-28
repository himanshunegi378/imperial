import axiosInstance from "../../../axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"

export type UserGeneratedComponent = {
    id: number;
    chatId: string | null;
    userId: string;
    name: string;
    html: string;
    hideFromLibrary: boolean;
}

export const useFetchAllComponents = () => {
    return useQuery({
        queryKey: useFetchAllComponents.queryKey,
        queryFn: async () => {
            const data = await apiRequest<UserGeneratedComponent[]>(() => axiosInstance.get('/library/get-user-generated-components'),
                'all-components error')
            return data
        }
    })
}

useFetchAllComponents.queryKey = ['components']
