import { Router } from "express";
import { ChatController } from "./chat.controller";
import { authenticateJWT } from "../auth/common/auth.middleware";

export const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.post('/chat', authenticateJWT, chatController.processMessage);

chatRoutes.get('/chat-history', authenticateJWT, chatController.getChatHistory);

chatRoutes.get('/chat-history-id-list', authenticateJWT, chatController.getAllChatIdsAssociateWithUser);

chatRoutes.delete('/chat-history/:chatId', authenticateJWT, chatController.deleteChatHistory);