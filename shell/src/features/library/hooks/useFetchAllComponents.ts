import axiosInstance from "../../../axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"
import { isSuccessResponse } from "../../../shared/types/response.types"

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
            const response = await apiRequest<UserGeneratedComponent[]>(
                () => axiosInstance.get('/library/get-user-generated-components'),
                'all-components error'
            );
            
            if (isSuccessResponse(response)) {
                return response.data;
            } else {
                throw new Error(response.error.message || 'Failed to fetch components');
            }
        }
    })
}

useFetchAllComponents.queryKey = ['components']
