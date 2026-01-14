import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const data = await API.get("/auth/me");
      setUser(data.user);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    setLoading(true);
    setError(null);
    try {
      const data = await API.post("/auth/login", credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      setMessage("Login successful");
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(userData) {
    setLoading(true);
    setError(null);
    try {
      const data = await API.post("/auth/register", userData);
      setUser(data.user);
      setIsAuthenticated(true);
      setMessage("Registration successful");
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await API.post("/auth/logout");
    setUser(null);
    setIsAuthenticated(false);
    setMessage("Logged out successfully");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        message,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
    return useContext(AuthContext);
}