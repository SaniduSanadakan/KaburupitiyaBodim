import React, { createContext, useState, useEffect, useCallback } from "react";
import { getUser, loginUser, logOutUser } from "../services/authService";
import Loading from "../components/common/Loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user info when component mounts
  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUser();
      const userData = response.user || response.data?.user || response;
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err.message || 'Failed to load user data');
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial user load
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      const userData = response.user || response.data?.user || response;
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await logOutUser();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return <Loading fullScreen={true} text="Authenticating..." />;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      loadUser,
      error,
      isAuthenticated: !!user,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
