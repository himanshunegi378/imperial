import { Router } from "express";
import { ChatController } from "./chat.controller";

export const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.post('/chat', chatController.processMessage);