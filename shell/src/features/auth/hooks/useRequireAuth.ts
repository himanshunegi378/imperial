import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Provider/AuthProvider';

/**
 * Hook for protecting routes that require authentication
 * @param redirectTo The path to redirect to if not authenticated, defaults to '/login'
 */
export const useRequireAuth = (redirectTo: string = '/login') => {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If authentication check is complete (not loading) and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page with the current location as a return URL
      navigate(redirectTo, { 
        replace: true,
        state: { from: window.location.pathname }
      });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return { user, isLoading };
};
