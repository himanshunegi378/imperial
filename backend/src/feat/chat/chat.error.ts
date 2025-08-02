import z from "zod";

export const ChatErrorDefinitions = {
    INVALID_PAYLOAD: {
        code: 'INVALID_PAYLOAD',
        message: 'Invalid payload',
        httpStatus: 400,
        detailsSchema: z.any()
    },
    CHAT_ID_REQUIRED: {
        code: 'CHAT_ID_REQUIRED',
        message: 'Chat ID is required',
        httpStatus: 400,
        detailsSchema: z.any()
    },
    CHAT_HISTORY_DELETE_FAILED: {
        code: 'CHAT_HISTORY_DELETE_FAILED',
        message: 'Failed to delete chat history',
        httpStatus: 500,
        detailsSchema: z.any()
    }
}