import { z } from "zod";

export const chatValidation = z.object({
    userMessage: z.string().min(1, "User message cannot be empty"),
    chatId: z.string().optional(),
});

