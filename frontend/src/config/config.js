export const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const AUTH_TOKEN_KEY = 'kaburupitiya_auth_token';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
