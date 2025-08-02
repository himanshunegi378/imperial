import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticateJWT } from "../common/auth.middleware";

export const userRoutes = Router();

const userController = new UserController();

// Protected routes - require authentication
userRoutes.get('/api/user/profile', authenticateJWT, userController.getProfile);
userRoutes.post('/api/user/change-password', authenticateJWT, userController.changePassword);
