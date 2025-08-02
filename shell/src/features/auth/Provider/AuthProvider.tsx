import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';
import { useSignup } from '../hooks/useSignup';
import { useRefreshToken } from '../hooks/useRefreshToken';
import { getToken, saveToken, removeToken } from '../utils/tokenStorage';
import { decodeToken, getTokenExpiration } from '../utils/tokenDecoder';
import { setupAuthInterceptors } from '../utils/authInterceptor';

// Auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create auth context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

// Hook to use the auth context
export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [refreshTimerId, setRefreshTimerId] = useState<NodeJS.Timeout | null>(null);

  // Hooks
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const { mutateAsync: loginMutation, error: loginError } = useLogin();
  const { mutateAsync: signupMutation, error: signupError } = useSignup();
  const { mutateAsync: logoutMutation } = useLogout();
  const { mutateAsync: refreshTokenMutation } = useRefreshToken();

  // Set up auth interceptors on mount
  useEffect(() => {
    setupAuthInterceptors();
    
    // Initialize auth state from token if exists
    const token = getToken();
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
        setIsAuthenticated(true);
        setupTokenRefresh(token);
      } else {
        // Invalid token
        removeToken();
      }
    }
  }, []);

  // Update user when currentUser data changes
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  // Set up token refresh timer
  const setupTokenRefresh = (token: string) => {
    // Clear any existing timer
    if (refreshTimerId) {
      clearTimeout(refreshTimerId);
    }
    
    const expTime = getTokenExpiration(token);
    if (!expTime) return;
    
    // Calculate time to refresh (1 minute before expiration)
    const currentTime = Date.now();
    const timeToRefresh = Math.max(0, expTime - currentTime - 60000);
    
    const timerId = setTimeout(async () => {
      try {
        const response = await refreshTokenMutation();
        if (response.token) {
          saveToken(response.token);
          setupTokenRefresh(response.token);
        }
      } catch (error) {
        // If refresh fails, log out
        handleLogout();
      }
    }, timeToRefresh);
    
    setRefreshTimerId(timerId);
  };

  // Login function
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginMutation({ email, password });
      saveToken(response.token);
      
      const decodedUser = decodeToken(response.token);
      if (decodedUser) {
        setUser(decodedUser);
        setIsAuthenticated(true);
        setupTokenRefresh(response.token);
      }
    } catch (error) {
      throw error;
    }
  };

  // Signup function
  const handleSignup = async (email: string, password: string) => {
    try {
      const response = await signupMutation({ email, password });
      saveToken(response.token);
      
      const decodedUser = decodeToken(response.token);
      if (decodedUser) {
        setUser(decodedUser);
        setIsAuthenticated(true);
        setupTokenRefresh(response.token);
      }
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clean up even if the API call fails
      if (refreshTimerId) {
        clearTimeout(refreshTimerId);
        setRefreshTimerId(null);
      }
      
      removeToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Determine the current error
  const error = loginError || signupError || null;

  // Value for the context provider
  const value: AuthContextType = {
    user,
    isLoading: isLoadingUser,
    isAuthenticated,
    error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
