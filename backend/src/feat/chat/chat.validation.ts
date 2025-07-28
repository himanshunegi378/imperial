import { z } from "zod";

export const chatValidation = z.object({
    userMessage: z.string(),
    chatId: z.string().optional(),
});

