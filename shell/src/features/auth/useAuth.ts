import { useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';

/**
 * Hook for accessing authentication state and functions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const { user,isAuthenticated,isLoading,error, login, signup, logout} = context;
  
  return {
    // Auth state
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Auth methods
    login,
    signup,
    logout,
  };
};
