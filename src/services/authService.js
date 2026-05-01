import api, { setAccessToken } from "../lib/api";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  const session = data?.data?.session;
  if (session?.access_token) setAccessToken(session.access_token);
  return data?.data;
};

export const register = async (email, password) => {
  const { data } = await api.post("/auth/register", { email, password });
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
