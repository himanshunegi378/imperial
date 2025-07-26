import z from "zod";

export const ChatErrorDefinitions = {
    INVALID_PAYLOAD: {
        code: 'INVALID_PAYLOAD',
        message: 'Invalid payload',
        httpStatus: 400,
        detailsSchema: z.any()
    }
}