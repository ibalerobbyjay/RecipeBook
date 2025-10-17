import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Start authenticated for demo
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate checking auth status on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      // In a real app, you would check for a token in storage
      // For demo purposes, we'll start with user authenticated
      try {
        setIsLoading(true);
        // Simulate API call to check auth status
        setTimeout(() => {
          // For demo, we'll set a mock user
          setUser({
            id: 'user1',
            name: 'Robby Jay Ibale',
            email: 'ibalerobbyjay@gmail.com'
          });
          setIsAuthenticated(true);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log('No existing auth session found');
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = (userData) => {
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
    } else {
      // Set default user for demo
      setUser({
        id: 'user1',
        name: 'Robby Jay Ibale', 
        email: 'ibalerobbyjay@gmail.com'
      });
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // In a real app, you would also clear tokens from storage
  };

  // Update user profile
  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  // Context value
  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;