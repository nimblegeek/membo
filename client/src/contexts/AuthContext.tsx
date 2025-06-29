import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  token: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently
  } = useAuth0();

  // TEMPORARY: Mock admin user for development (bypass Auth0)
  const mockUser: User = {
    id: 'dev-admin-1',
    name: 'Coach Admin',
    email: 'coach@membo.com',
    role: 'admin'
  };

  // Use mock user for development
  const user = mockUser;
  const isAuthenticatedDev = true;
  const loading = false;

  const login = () => {
    // Mock login - just redirect to dashboard
    window.location.href = '/admin';
  };

  const logout = () => {
    // Mock logout - redirect to landing
    window.location.href = '/landing';
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    token: 'mock-token-for-development',
    isAuthenticated: isAuthenticatedDev
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 