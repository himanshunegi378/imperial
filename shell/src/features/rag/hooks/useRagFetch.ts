import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosInstance";
import type { RagRecord, RagRecordOutput, RagResponse } from "../types";
import { apiRequest } from "../../../shared/utils/apiReuest";

/**
 * Hook to fetch RAG records with infinite pagination
 * @param limit - Number of records to fetch per page (default: 10)
 */
export const useRagFetch = (limit: number = 10) => {
    return useInfiniteQuery({
        queryKey: ['rag-records'],
        queryFn: async ({ pageParam }: { pageParam?: number | null }): Promise<RagRecordOutput> => {
            const params = new URLSearchParams();
            if (pageParam !== undefined && pageParam !== null) {
                params.append('lastId', String(pageParam));
            }
            params.append('limit', String(limit));
            const response = await apiRequest<RagResponse>(() => axiosInstance.get(`/library/get-html-rag-records?${params.toString()}`),
                'library/get-html-rag-records error')

            const { records, pagination } = response;
            const result = records.map((record: RagRecord) => ({
                id: record.id,
                content: JSON.parse(record.content) as RagRecordOutput['records'][number]['content'],
                metadata: JSON.parse(record.metadata) as RagRecordOutput['records'][number]['metadata'],
            }));
            return {
                records: result,
                pagination: pagination
            };
        },
        getNextPageParam: (lastPage: RagRecordOutput) => {
            return lastPage.pagination.hasNextPage ? lastPage.pagination.nextCursor : undefined;
        },
        initialPageParam: null as number | null
    });
}