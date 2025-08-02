import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { formatSuccess } from "../../../core/utils/responseFormatter";
import { AppError } from "../../../core/utils/responseFormatter";
import { AuthErrorDefinitions } from "../common/auth.error";
import { AuthService } from "../auth.service";
import { passwordChangeSchema } from "../common/auth.validation";

export class UserController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  /**
   * Get the profile of the currently authenticated user
   */
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // User ID is available from the JWT middleware
      const userId = req.user?.userId;
      
      if (!userId) {
        return next(new AppError(AuthErrorDefinitions.UNAUTHORIZED, {}));
      }
      
      // Get user profile
      const userProfile = await this.userService.getUserProfile(userId);
      
      // Return success response with user profile
      res.json(formatSuccess(userProfile, "User profile retrieved successfully"));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Change user password and revoke all refresh tokens
   * This is a critical event that requires invalidation of all sessions
   */
  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // User ID is available from the JWT middleware
      const userId = req.user?.userId;
      
      if (!userId) {
        return next(new AppError(AuthErrorDefinitions.UNAUTHORIZED, {}));
      }
      
      // Validate request body
      const validatedBody = passwordChangeSchema.safeParse(req.body);
      if (!validatedBody.success) {
        throw new AppError(AuthErrorDefinitions.INVALID_PAYLOAD, {
          fieldErrors: validatedBody.error.flatten().fieldErrors
        });
      }

      const { currentPassword, newPassword } = validatedBody.data;
      
      // Change password
      await this.userService.changePassword(userId, currentPassword, newPassword);
      
      // Critical event: Revoke all refresh tokens for this user
      // This will log the user out of all devices
      await this.authService.revokeAllUserTokens(userId);
      
      // Return success response
      res.json(formatSuccess({}, "Password changed successfully. You've been logged out of all devices."));
    } catch (error) {
      next(error);
    }
  };
}
