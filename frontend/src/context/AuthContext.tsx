/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useEffect, useState } from "react";
import api from "@/utils/api";

interface User {
  _id: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  user: User | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  user: null,
  isAdmin: false,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Restore session on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole);

      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  const login = (t: string, r: string) => {
    localStorage.setItem("token", t);
    localStorage.setItem("role", r);

    setToken(t);
    setRole(r);

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${t}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        isAdmin: role === "admin",
        isLoggedIn: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};