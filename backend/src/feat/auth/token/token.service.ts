import jwt from 'jsonwebtoken';
import { env } from "../../../env";
import { RefreshTokenService } from "./refresh-token.service";
import { TokenResponse } from "./token.types";
import { AppError } from "../../../core/utils/responseFormatter";
import { AuthErrorDefinitions } from "../common/auth.error";

// Default expiry time for access tokens - 15 minutes
const ACCESS_TOKEN_EXPIRY = 15 * 60; // 15 minutes in seconds

export class TokenService {
  private refreshTokenService: RefreshTokenService;

  constructor() {
    this.refreshTokenService = new RefreshTokenService();
  }

  /**
   * Generate JWT access token
   * @param userId User ID to include in the token payload
   * @returns Access token and expiry time
   */
  generateAccessToken(userId: number): { token: string, expiresIn: number } {
    const payload = {
      userId
    };
    
    const token = jwt.sign(
      payload,
      env.JWT_SECRET || 'default-secret-for-development',
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    
    return {
      token,
      expiresIn: ACCESS_TOKEN_EXPIRY
    };
  }

  /**
   * Generate both access and refresh tokens
   * @param userId User ID
   * @returns Token response with access token and refresh token
   */
  async generateTokens(userId: number): Promise<TokenResponse> {
    // Generate access token
    const { token: accessToken, expiresIn } = this.generateAccessToken(userId);
    
    // Generate refresh token
    const refreshToken = await this.refreshTokenService.createRefreshToken(userId);
    
    return {
      accessToken,
      refreshToken,
      expiresIn
    };
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken Refresh token to validate and rotate
   * @returns New token response with access token and refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    // Validate refresh token
    const userId = await this.refreshTokenService.validateRefreshToken(refreshToken);
    
    if (!userId) {
      throw new AppError(AuthErrorDefinitions.INVALID_REFRESH_TOKEN, {});
    }
    
    // Generate new access token
    const { token: accessToken, expiresIn } = this.generateAccessToken(userId);
    
    // Rotate refresh token (invalidate old one and create new one)
    const newRefreshToken = await this.refreshTokenService.rotateRefreshToken(refreshToken);
    
    if (!newRefreshToken) {
      throw new AppError(AuthErrorDefinitions.INVALID_REFRESH_TOKEN, {});
    }
    
    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn
    };
  }

  /**
   * Revoke a refresh token (logout)
   * @param refreshToken Refresh token to revoke
   */
  async revokeToken(refreshToken: string): Promise<void> {
    await this.refreshTokenService.revokeRefreshToken(refreshToken);
  }

  /**
   * Revoke all refresh tokens for a user (logout from all devices)
   * @param userId User ID
   */
  async revokeAllUserTokens(userId: number): Promise<void> {
    await this.refreshTokenService.revokeAllUserRefreshTokens(userId);
  }
}
