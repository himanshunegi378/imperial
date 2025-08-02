import { TokenService } from './token/token.service';
import { TokenResponse } from './token/token.types';

export class AuthService {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }





  /**
   * Generate both access and refresh tokens
   * @param userId User ID
   * @returns Token response with access token and refresh token
   */
  async generateTokens(userId: number): Promise<TokenResponse> {
    return this.tokenService.generateTokens(userId);
  }

  /**
   * Refresh an access token using a refresh token
   * @param refreshToken The refresh token
   * @returns New token response or null if refresh token is invalid
   */
  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    return this.tokenService.refreshAccessToken(refreshToken);
  }

  /**
   * Logout a user by revoking their refresh token
   * @param refreshToken The refresh token to revoke
   */
  async logout(refreshToken: string): Promise<void> {
    if (refreshToken) {
      await this.tokenService.revokeToken(refreshToken);
    }
  }

  /**
   * Revoke all refresh tokens for a user (e.g., after password change)
   * @param userId The user ID
   */
  async revokeAllUserTokens(userId: number): Promise<void> {
    await this.tokenService.revokeAllUserTokens(userId);
  }
}
