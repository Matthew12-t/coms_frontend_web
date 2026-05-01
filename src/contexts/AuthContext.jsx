import { createContext, useEffect, useState } from "react";
import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
  fetchMe,
} from "../services/authService";
import { getAccessToken, setAccessToken } from "../lib/api";

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then(setUser)
      .catch(() => setAccessToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const session = await loginRequest(email, password);
    setUser(session?.user ?? null);
    return session;
  };

  const register = async (email, password) => {
    const result = await registerRequest(email, password);
    return result;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
