import { NextFunction, Request, Response } from "express";
import { TokenService } from "./token.service";
import { AppError } from "../../../core/utils/responseFormatter";
import { AuthErrorDefinitions } from "../common/auth.error";
import { formatSuccess } from "../../../core/utils/responseFormatter";
import { CookieOptions } from "express";
import { refreshTokenSchema } from "../common/auth.validation";

export class TokenController {
  private tokenService: TokenService;
  private readonly REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
  // Cookie options for refresh token
  private readonly cookieOptions: CookieOptions = {
    httpOnly: true, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // Protects against CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/' // Cookie available across the entire site
  };

  constructor() {
    this.tokenService = new TokenService();
  }
  
  /**
   * Set refresh token as HttpOnly cookie
   */
  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie(this.REFRESH_TOKEN_COOKIE_NAME, refreshToken, this.cookieOptions);
  }

  /**
   * Clear refresh token cookie
   */
  private clearRefreshTokenCookie(res: Response): void {
    res.clearCookie(this.REFRESH_TOKEN_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
  }

  /**
   * Refresh access token using refresh token from cookie
   */
  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body (empty schema as token comes from cookie)
      refreshTokenSchema.parse(req.body);
      
      // Get refresh token from cookie
      const refreshToken = req.cookies[this.REFRESH_TOKEN_COOKIE_NAME];
      
      if (!refreshToken) {
        throw new AppError(AuthErrorDefinitions.REFRESH_TOKEN_REQUIRED, {});
      }
      
      // Refresh access token and rotate refresh token
      const { accessToken, refreshToken: newRefreshToken, expiresIn } = 
        await this.tokenService.refreshAccessToken(refreshToken);
      
      // Set new refresh token as HttpOnly cookie
      if (newRefreshToken) {
        this.setRefreshTokenCookie(res, newRefreshToken);
      }
      
      // Return success response with new access token
      res.json(formatSuccess({ 
        token: accessToken, 
        expiresIn 
      }, "Token refreshed successfully"));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Logout user by revoking refresh token
   */
  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get refresh token from cookie
      const refreshToken = req.cookies[this.REFRESH_TOKEN_COOKIE_NAME];
      
      // Revoke refresh token if it exists
      if (refreshToken) {
        await this.tokenService.revokeToken(refreshToken);
      }
      
      // Clear refresh token cookie
      this.clearRefreshTokenCookie(res);
      
      // Return success response
      res.json(formatSuccess({}, "Logged out successfully"));
    } catch (error) {
      next(error);
    }
  };
}
