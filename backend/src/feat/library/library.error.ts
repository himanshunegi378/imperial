import { z } from 'zod';

export const LibraryErrorDefinitions = {
    INVALID_PAYLOAD: {
        code: 'INVALID_PAYLOAD',
        message: 'Invalid payload',
        httpStatus: 400,
        detailsSchema: z.any()
    },
    COMPONENTS_REQUIRED: {
        code: 'COMPONENTS_REQUIRED',
        message: 'Components array is required and must not be empty',
        httpStatus: 400,
        detailsSchema: z.any()
    },
    FAILED_TO_ADD_COMPONENTS: {
        code: 'FAILED_TO_ADD_COMPONENTS',
        message: 'Failed to add components to vector store',
        httpStatus: 500,
        detailsSchema: z.any()
    },
    FAILED_TO_GET_RECORDS: {
        code: 'FAILED_TO_GET_RECORDS',
        message: 'Failed to get RAG records',
        httpStatus: 500,
        detailsSchema: z.any()
    },
    INVALID_COMPONENTS: {
        code: 'INVALID_COMPONENTS',
        message: 'Invalid components',
        httpStatus: 400,
        detailsSchema: z.any()
    }
};
