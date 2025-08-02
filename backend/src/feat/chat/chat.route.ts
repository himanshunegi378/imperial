import { Router } from "express";
import { ChatController } from "./chat.controller";

export const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.post('/chat', chatController.processMessage);

chatRoutes.get('/chat-history', chatController.getChatHistory);

chatRoutes.get('/chat-history-id-list', chatController.getAllChatIdsAssociateWithUser);

chatRoutes.delete('/chat-history/:chatId', chatController.deleteChatHistory);