import axiosInstance from "../../../axiosInstance";
import { getToken, saveToken, removeToken } from "./tokenStorage";
import { apiRequest } from "../../../shared/utils/apiReuest";
import type { AuthResponse } from "../types";
import { createBrowserHistory } from "history";
import { isErrorResponse, isSuccessResponse } from "../../../shared/types/response.types";
import axios from "axios";
// Only used for type declarations - no values imported

// Extend Axios request config types to include our custom properties
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
  
  export interface InternalAxiosRequestConfig {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

// Create a history object for navigation
const history = createBrowserHistory();

// Flag to prevent multiple refresh token requests
let isRefreshing = false;

// Store pending requests that should be retried after token refresh
let pendingRequests: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: any;
}> = [];

/**
 * Handle token refresh using the refresh token endpoint
 */
async function refreshAuthToken(): Promise<string> {
  try {
    const apiResponse = await apiRequest<AuthResponse>(
      () => axios.post("/api/auth/refresh", {}, { skipAuthRefresh: true, baseURL: import.meta.env.VITE_API_URL, withCredentials: true }),
      "Token refresh failed"
    );
    
    if (isErrorResponse(apiResponse)) {
      const {  success, error:{code}} = apiResponse
      throw new Error(apiResponse.error.message || "Token refresh failed");
    }
    
    const response = apiResponse.data;
    
    // Save the new token
    if (response.token) {
      saveToken(response.token);
      return response.token;
    }
    throw new Error("No token received during refresh");
  } catch (error) {
    // If token refresh fails, clear auth state
    removeToken();
    throw error;
  }
}

/**
 * Process all pending requests after token refresh
*/
function processQueue(error: Error | null, token: string | null = null): void {
  pendingRequests.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else if (token) {
      // Update the request header with new token
      config.headers.Authorization = `Bearer ${token}`;
      resolve(axiosInstance(config));
    }
  });
  
  // Clear the queue
  pendingRequests = [];
}

/**
 * Set up axios interceptors to automatically add authentication tokens to requests
 * and handle token refresh on 401 responses
 */
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Skip adding token for refresh token requests

      if (config.skipAuthRefresh) {
        return config;
      }
      
      // Get the token from storage
      const token = getToken();
      
      // If token exists, add it to the Authorization header
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor to handle token refresh on 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // Handle 401 responses except for login, signup, and refresh token endpoints
      if (error.response && 
          error.response.status === 401 && 
          !originalRequest._retry && 
          !originalRequest.url.includes('/login') && 
          !originalRequest.url.includes('/signup') && 
          !originalRequest.url.includes('/refresh')) {
        
        // Mark the request as retried to prevent infinite loop
        originalRequest._retry = true;
        
        // If a refresh is already in progress, queue this request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            pendingRequests.push({
              resolve,
              reject,
              config: originalRequest
            });
          });
        }
        
        // Set refreshing flag
        isRefreshing = true;
        
        try {
          // Try to refresh the token
          const newToken = await refreshAuthToken();
          
          // Process any queued requests with the new token
          processQueue(null, newToken);
          
          // Update the request header with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Token refresh failed
          processQueue(refreshError as Error);
          
          // Clear auth state and redirect to login
          removeToken();
          
          // Redirect to login page
          if (window.location.pathname !== '/auth/login') {
            history.push('/auth/login', { from: window.location.pathname });
            window.location.reload();
          }
          
          return Promise.reject(refreshError);
        } finally {
          // Reset refreshing flag
          isRefreshing = false;
        }
      }
      
      // For other errors or if this is already a retry, just reject
      return Promise.reject(error);
    }
  );

/**
 * Clear all interceptors
 */
export const clearAuthInterceptors = () => {
  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.response.clear();
};

/**
 * Force logout and redirect to login page
 * This can be called from other parts of the app when needed
 */
export const forceLogout = () => {
  // Clear token
  removeToken();
  
  // Redirect to login if not already there
  if (window.location.pathname !== '/login') {
    history.push('/login', { from: window.location.pathname });
    window.location.reload();
  }
};
