import React, { createContext, useState, useEffect, useCallback } from "react";
import { getUser, loginUser, logOutUser } from "../services/authService";
import Loading from "../components/common/Loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [role, setRole] = useState(null);

  // Load user info when component mounts
  const loadUser = useCallback(async () => {
    // Skip if we've already loaded the user
    if (userLoaded) return user;
    
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setUserLoaded(true);
      setUser(null);
      setRole(null);
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getUser();
      const userData = response.user || response.data?.user || response;
      setUser(userData);
      setRole(userData.role || null);
      return userData;
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err.message || 'Failed to load user data');
      setUser(null);
      setRole(null);
      localStorage.removeItem('token');
      return null;
    } finally {
      setLoading(false);
      setUserLoaded(true);
    }
  }, [userLoaded, user]);

  // Initial user load - only if there's a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
      setUserLoaded(true);
    }
  }, [loadUser]);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      const userData = response.user || response.data?.user || response;
      setUser(userData);
      setRole(userData.role || null); // Explicitly set the role from user data
      localStorage.setItem('token', response.token);
      return userData;
    } catch (err) {
      setError(err.response.data.message || 'Login failed');
      setUser(null);
      setRole(null);
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
      setRole(null);
      localStorage.removeItem('token');
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
      role,
      isAuthenticated: !!user,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
