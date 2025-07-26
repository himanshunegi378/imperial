import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiRequest } from "../../../shared/utils/apiReuest"
import axiosInstance from "../../../axiosInstance"
import { useFetchAllComponents, type UserGeneratedComponent } from "./useFetchAllComponents"

export const useDeleteComponents = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: (componentIds: number[]) => {
            const data = apiRequest<{ success: boolean }>(() => axiosInstance.delete('/library/delete-user-generated-components', { data: { componentIds } }), 'delete-components error')
            return data
        },
        onSuccess: (_, componentIds) => {
            queryClient.setQueryData(useFetchAllComponents.queryKey, (prevData: UserGeneratedComponent[]) => {
                if (!prevData) return []
                return prevData.filter((item) => !componentIds.includes(item.id))
            })
        }
    })
}
