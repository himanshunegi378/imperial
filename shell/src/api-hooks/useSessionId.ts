import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const useSessionId = () => {
    return useQuery({
        queryKey: ['session-id'],
        queryFn: async() => {
             return axiosInstance.get('/create-session')
        }
    });
};

export default useSessionId;