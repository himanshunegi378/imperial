import { jwtDecode } from 'jwt-decode';
import type { User } from '../types';

/**
 * Decode JWT token and extract user information
 */
export const decodeToken = (token: string): User | null => {
  try {
    const decoded: any = jwtDecode(token);
    
    return {
      id: decoded.sub,
      email: decoded.email,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Get token expiration time in milliseconds
 */
export const getTokenExpiration = (token: string): number | null => {
  try {
    const decoded: any = jwtDecode(token);
    // Convert seconds to milliseconds
    return decoded.exp * 1000;
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};
