import { Router } from "express";
import { ChatController } from "./chat.controller";
import { authenticateJWT } from "../auth/common/auth.middleware";

export const chatRoutes = Router();

const chatController = new ChatController();

// Regular POST endpoint (existing)
chatRoutes.post('/chat', authenticateJWT, chatController.processMessage);

// SSE streaming endpoint (new)
chatRoutes.post('/chat/stream', authenticateJWT, chatController.processMessageStream);
// GET endpoint for EventSource (since EventSource doesn't support POST well)
chatRoutes.get('/chat/stream', authenticateJWT, chatController.processMessageStream);

chatRoutes.get('/chat-history', authenticateJWT, chatController.getChatHistory);

chatRoutes.get('/chat-history-id-list', authenticateJWT, chatController.getAllChatIdsAssociateWithUser);

chatRoutes.delete('/chat-history/:chatId', authenticateJWT, chatController.deleteChatHistory);