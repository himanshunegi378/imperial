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
 * Supports both Authorization header (Bearer token) and query parameter (for EventSource)
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Try to get token from Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  
  // For GET requests (EventSource), also check query parameters
  if (!token && req.method === 'GET' && req.query.token) {
    token = req.query.token as string;
  }
  
  if (!token) {
    return next(new AppError(AuthErrorDefinitions.UNAUTHORIZED, {}));
  }
  
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
