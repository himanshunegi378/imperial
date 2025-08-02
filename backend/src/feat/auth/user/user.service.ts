import { db } from "../../../db";
import { users } from "../common/auth.schema";
import { eq } from "drizzle-orm";
import { AppError } from "../../../core/utils/responseFormatter";
import { AuthErrorDefinitions } from "../common/auth.error";
import bcrypt from "bcrypt";

export class UserService {
  private readonly SALT_ROUNDS = 10;

  /**
   * Get user profile by ID
   * @param userId User ID
   * @returns User profile data (excluding password)
   */
  async getUserProfile(userId: number) {
    const [user] = await db.select({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt
    })
    .from(users)
    .where(eq(users.id, userId));
    
    if (!user) {
      throw new AppError(AuthErrorDefinitions.UNAUTHORIZED, {});
    }
    
    return user;
  }

  /**
   * Change user password
   * @param userId User ID
   * @param currentPassword Current password for verification
   * @param newPassword New password to set
   */
  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    // Get user with password
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, userId));
    
    if (!user) {
      throw new AppError(AuthErrorDefinitions.UNAUTHORIZED, {});
    }
    
    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError(AuthErrorDefinitions.INVALID_CREDENTIALS, {});
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
    
    // Update password in database
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));
  }
}
