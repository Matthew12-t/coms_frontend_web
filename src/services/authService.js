import api, { setAccessToken } from "../lib/api";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  const session = data?.data?.session;
  if (session?.access_token) setAccessToken(session.access_token);
  return data?.data;
};

export const register = async (email, password) => {
  const { data } = await api.post("/auth/register", { email, password });
  const session = data?.data?.session;
  if (session?.access_token) setAccessToken(session.access_token);
  return data?.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
  setAccessToken(null);
};

export const fetchMe = async () => {
  const { data } = await api.get("/auth/me");
  return data?.data;
};

export const verifyEmailToken = async (token_hash, type) => {
  const { data } = await api.post("/auth/verify-email", { token_hash, type });
  return data?.data;
};

export const exchangeCode = async (code) => {
  const { data } = await api.post("/auth/exchange-code", { code });
  return data?.data;
};
