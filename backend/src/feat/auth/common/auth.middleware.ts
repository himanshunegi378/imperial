import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../../core/utils/responseFormatter";
import { AuthErrorDefinitions } from "./auth.error";
import { env } from "../../../env";

// Extend the Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
      };
    }
  }
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError(AuthErrorDefinitions.UNAUTHORIZED, {}));
  }

  // Extract the token
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, env.JWT_SECRET || 'default-secret-for-development') as { userId: number };
    
    // Add user info to request
    req.user = {
      userId: decoded.userId
    };
    
    next();
  } catch (error) {
    return next(new AppError(AuthErrorDefinitions.INVALID_TOKEN, {}));
  }
};
