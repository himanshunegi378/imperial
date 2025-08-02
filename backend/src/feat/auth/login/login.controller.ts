import { NextFunction, Request, Response } from "express";
import { LoginService } from "./login.service";
import { loginSchema } from "../common/auth.validation";
import { AppError } from "../../../core/utils/responseFormatter";
import { AuthErrorDefinitions } from "../common/auth.error";
import { formatSuccess } from "../../../core/utils/responseFormatter";
import { CookieOptions } from "express";

export class LoginController {
  private loginService: LoginService;
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
    this.loginService = new LoginService();
  }
  
  /**
   * Set refresh token as HttpOnly cookie
   */
  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie(this.REFRESH_TOKEN_COOKIE_NAME, refreshToken, this.cookieOptions);
  }

  /**
   * Handle user login
   */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const validatedBody = loginSchema.safeParse(req.body);
      if (!validatedBody.success) {
        throw new AppError(AuthErrorDefinitions.INVALID_PAYLOAD, {
          fieldErrors: validatedBody.error.flatten().fieldErrors
        });
      }

      const { email, password } = validatedBody.data;
      
      // Authenticate user and get tokens
      const { accessToken, refreshToken, expiresIn } = await this.loginService.login(email, password);
      
      // Set refresh token as HttpOnly cookie
      if (refreshToken) {
        this.setRefreshTokenCookie(res, refreshToken);
      }
      
      // Return success response with access token
      res.json(formatSuccess({ 
        token: accessToken, 
        expiresIn 
      }, "Login successful"));
    } catch (error) {
      next(error);
    }
  };
}
