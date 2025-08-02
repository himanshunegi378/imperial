/**
 * Interface for token response
 */
export interface TokenResponse {
  accessToken: string;
  refreshToken?: string; // Optional because we'll set it as HttpOnly cookie
  expiresIn: number;
}
