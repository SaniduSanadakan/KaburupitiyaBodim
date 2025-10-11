// import { VITE_API_URL } from '../config/config';
export const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
import axios from "axios";

const api = axios.create({
  baseURL:VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // send cookies if using auth cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request interceptor to attach JWT token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("kaburupitiya_auth_token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Optional: Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // For example, handle token expiration
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      // Optionally, redirect or clear auth data
    }
    return Promise.reject(error);
  }
);

export default api;
