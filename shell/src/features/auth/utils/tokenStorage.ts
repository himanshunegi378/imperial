/**
 * Utility functions for handling token storage in localStorage
 */

const TOKEN_KEY = 'auth_token';

/**
 * Save token to localStorage
 */
export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get token from localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if token exists
 */
export const hasToken = (): boolean => {
  return !!getToken();
};
