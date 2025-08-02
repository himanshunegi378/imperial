import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Hook for protecting routes that require authentication
 * @param redirectTo The path to redirect to if not authenticated, defaults to '/login'
 * @returns The current authenticated user or null if not authenticated
 */
const useRequireAuth = (redirectTo: string = '/login') => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If authentication check is complete (not loading) and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page
      navigate(redirectTo, { 
        replace: true,
        state: { from: window.location.pathname }
      });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return { user, isLoading };
};

export default useRequireAuth;
