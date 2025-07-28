import { NextFunction, Request, Response } from "express";
import { chatValidation } from "./chat.validation";
import { AppError, formatSuccess } from "../../core/utils/responseFormatter";
import { ChatErrorDefinitions } from "./chat.error";
import z from "zod";
import { ChatService } from "./chat.service";

export class ChatController {
    chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }


    processMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = chatValidation.safeParse(req.body);
            if (!validatedBody.success) {
                throw new AppError(ChatErrorDefinitions.INVALID_PAYLOAD, {});
            }
            const { userMessage, chatId } = validatedBody.data;
            const { component, name, message, chatId: _chatId } = await this.chatService.chat({
                userId: req.cookies['sessionId'],
                chatId,
                userMessage
            })
            res.json(formatSuccess({
                chatId: _chatId,
                component,
                name,
                message
            }));
        } catch (error) {
            next(error);
        }
    }
}
