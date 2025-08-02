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

export class SignupService {
  private readonly SALT_ROUNDS = 10;
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Create a new user account
   * @param email User's email
   * @param password User's password
   * @returns Token response with access token and refresh token
   */
  async signUp(email: string, password: string): Promise<TokenResponse> {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      throw new AppError(AuthErrorDefinitions.USER_ALREADY_EXISTS, {});
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    
    // Create user
    const [newUser] = await db.insert(users)
      .values({
        email,
        password: hashedPassword,
        createdAt: new Date()
      })
      .returning({ id: users.id });
    
    // Generate tokens
    const tokenResponse = await this.authService.generateTokens(newUser.id);
    return tokenResponse;
  }
}
