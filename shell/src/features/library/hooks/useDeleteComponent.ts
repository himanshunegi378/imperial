import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"
import axiosInstance from "../../../axiosInstance"
import { useFetchAllComponents, type UserGeneratedComponent } from "./useFetchAllComponents"
import { isSuccessResponse } from "../../../shared/types/response.types"

export const useDeleteComponents = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: async (componentIds: number[]) => {
            const response = await apiRequest<{ success: boolean }>(
                () => axiosInstance.delete('/library/delete-user-generated-components', { data: { componentIds } }),
                'delete-components error'
            );
            
            if (isSuccessResponse(response)) {
                return response.data;
            } else {
                throw new Error(response.error.message || 'Failed to delete components');
            }
        },
        onSuccess: (_, componentIds) => {
            queryClient.setQueryData(useFetchAllComponents.queryKey, (prevData: UserGeneratedComponent[]) => {
                if (!prevData) return []
                return prevData.filter((item) => !componentIds.includes(item.id))
            })
        }
    })
}
