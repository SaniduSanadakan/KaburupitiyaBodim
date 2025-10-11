import React, { createContext, useState, useEffect } from "react";
import { getUser, loginUser, logOutUser } from "../services/authService";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user info when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        // Handle different response structures
        const userData = response.user || response.data?.user || response;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []); // Empty dependency array means this runs once on mount

  // Login function
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const userData = response.user || response.data?.user || response;
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    await logOutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      loading 
    }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
