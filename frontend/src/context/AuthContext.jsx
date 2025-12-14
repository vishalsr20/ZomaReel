import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user/check`,
          { withCredentials: true }
        );
        // console.log("Auth Response ",res.data)
        setIsAuthenticated(res.data.authenticated);
        setRole(res.data.role || null);
      } catch (err) {
        setIsAuthenticated(false);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Call this after successful login API
  const login = () => {
    setIsAuthenticated(true);
  };

  // Call this on logout
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthenticated(false);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
