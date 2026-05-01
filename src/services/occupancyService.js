import api from "../lib/api";

export const fetchLatestOccupancy = async () => {
  const { data } = await api.get("/occupancy/latest");
  return data?.data ?? [];
};
