import crypto from 'crypto';
import { db } from "../../../db";
import { refreshTokens } from "./refresh-token.schema";
import { eq, and } from "drizzle-orm";

// Default expiry time for refresh tokens - 7 days
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export class RefreshTokenService {
  /**
   * Generate a new cryptographically secure refresh token
   * @returns A secure random string for use as a refresh token
   */
  private generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  /**
   * Create a new refresh token for a user
   * @param userId The ID of the user
   * @returns The generated refresh token
   */
  async createRefreshToken(userId: number): Promise<string> {
    // Generate a secure token
    const token = this.generateRefreshToken();
    
    // Calculate expiry date
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);
    
    // Store the token in the database
    await db.insert(refreshTokens).values({
      userId,
      token,
      expiresAt,
      createdAt: new Date(),
      revoked: false
    });
    
    return token;
  }

  /**
   * Validate a refresh token and return the associated user ID
   * @param token The refresh token to validate
   * @returns The user ID associated with the token, or null if invalid
   */
  async validateRefreshToken(token: string): Promise<number | null> {
    // Find the token in the database
    const [result] = await db.select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.token, token),
          eq(refreshTokens.revoked, false)
        )
      );
    
    if (!result) {
      return null;
    }
    
    // Check if the token has expired
    const now = new Date();
    if (result.expiresAt < now) {
      // Token has expired, mark it as revoked
      await this.revokeRefreshToken(token);
      return null;
    }
    
    return result.userId;
  }

  /**
   * Rotate a refresh token - revoke the old one and create a new one
   * @param oldToken The old refresh token to rotate
   * @returns The new refresh token, or null if the old token was invalid
   */
  async rotateRefreshToken(oldToken: string): Promise<string | null> {
    // Validate the old token and get the user ID
    const userId = await this.validateRefreshToken(oldToken);
    
    if (!userId) {
      return null;
    }
    
    // Revoke the old token
    await this.revokeRefreshToken(oldToken);
    
    // Create a new token
    return this.createRefreshToken(userId);
  }

  /**
   * Revoke a specific refresh token
   * @param token The token to revoke
   */
  async revokeRefreshToken(token: string): Promise<void> {
    await db.update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.token, token));
  }

  /**
   * Revoke all refresh tokens for a specific user
   * @param userId The ID of the user
   */
  async revokeAllUserRefreshTokens(userId: number): Promise<void> {
    await db.update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.userId, userId));
  }
}
