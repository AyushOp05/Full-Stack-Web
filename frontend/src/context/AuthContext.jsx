import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loadingProfile, setLoadingProfile] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoadingProfile(false);
        return;
      }

      try {
        const { data } = await api.get("/users/profile");
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } catch (error) {
        console.warn("Profile request failed:", error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  // Keep the demo session simple and reload-friendly.
  const persistSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const signup = async (formData) => {
    const { data } = await api.post("/auth/register", formData);
    persistSession(data);
  };

  const login = async (formData) => {
    const { data } = await api.post("/auth/login", formData);
    persistSession(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loadingProfile, signup, login, logout, isAuthenticated: Boolean(user) }),
    [user, loadingProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
