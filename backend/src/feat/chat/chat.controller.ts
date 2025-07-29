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

    getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chatId = req.query.chatId as string;
            if (!chatId) {
                throw new AppError(ChatErrorDefinitions.CHAT_ID_REQUIRED, {});
            }
            const chatHistory = await this.chatService.getChatHistory(chatId);
            
            res.json(formatSuccess({
                chatId,
                component: chatHistory?.output.component,
                name: chatHistory?.output.name,
                messages: chatHistory?.messages.map((message) => ({
                    sender: message.getType(),
                    text: message.content
                })) ?? []
            }));
        } catch (error) {
            next(error);
        }
    }

    getAllChatIdsAssociateWithUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.cookies['sessionId'];
            const chatIdList = await this.chatService.getAllChatIdsAssociateWithUser(userId);
            res.json(formatSuccess(chatIdList));
        } catch (error) {
            next(error);
        }
    }
}
