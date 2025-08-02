import bcrypt from 'bcrypt';
import { db } from "../../../db";
import { users } from "../common/auth.schema";
import { eq } from "drizzle-orm";
import { AppError } from "../../../core/utils/responseFormatter";
import { AuthErrorDefinitions } from "../common/auth.error";
import { AuthService } from "../auth.service";
// Define the token response interface locally to avoid circular dependencies
interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export class LoginService {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Authenticate a user
   * @param email User's email
   * @param password User's password
   * @returns Token response with access token and refresh token
   */
  async login(email: string, password: string): Promise<TokenResponse> {
    // Find user by email
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      throw new AppError(AuthErrorDefinitions.INVALID_CREDENTIALS, {});
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(AuthErrorDefinitions.INVALID_CREDENTIALS, {});
    }
    
    // Generate tokens
    const tokenResponse = await this.authService.generateTokens(user.id);
    return tokenResponse;
  }
}
