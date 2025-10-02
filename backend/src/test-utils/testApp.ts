import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { chatRoutes } from '../feat/chat/chat.route';
import { libraryRoutes } from '../feat/library/library.route';
import { authRoutes } from "../feat/auth/auth.route";
import { userRoutes } from "../feat/auth/user/user.route";
import { AppError } from "../core/utils/responseFormatter";
import { ErrorDefinition } from "../@types/error.types";
import z from "zod";

/**
 * Creates an Express app instance configured for testing.
 * Does not start the server - to be used with supertest.
 */
export function createTestApp() {
  const app = express();

  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
  }));
  
  app.use(express.json({
    limit: '1mb'
  }));
  
  app.use(cookieParser());

  // Register routes
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(chatRoutes);
  app.use(libraryRoutes);

  // Error handling middleware
  app.use((err: Error | AppError<ErrorDefinition>, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      res.status(err.errorDef.httpStatus).json(err.format());
    } else {
      const error = new AppError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong!',
        httpStatus: 500,
        detailsSchema: z.object({})
      });
      console.error(err);
      res.status(error.errorDef.httpStatus).json(error.format());
    }
  });

  return app;
}

