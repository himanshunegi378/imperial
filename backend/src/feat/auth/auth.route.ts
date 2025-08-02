import { Router } from "express";
import { SignupController } from "./signup/signup.controller";
import { LoginController } from "./login/login.controller";
import { TokenController } from "./token/token.controller";

export const authRoutes = Router();

const signupController = new SignupController();
const loginController = new LoginController();
const tokenController = new TokenController();

// User registration endpoint
authRoutes.post('/api/auth/signup', signupController.signUp);

// User login endpoint
authRoutes.post('/api/auth/login', loginController.login);

// User logout endpoint
authRoutes.post('/api/auth/logout', tokenController.logout);

// Token refresh endpoint
authRoutes.post('/api/auth/refresh', tokenController.refreshToken);
