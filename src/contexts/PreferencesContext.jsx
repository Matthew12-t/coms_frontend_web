import { createContext, useEffect, useState, useContext } from "react";
import {
  fetchPreferences,
  updatePreferences,
} from "../services/preferencesService";
import { AuthContext } from "./AuthContext";

export const PreferencesContext = createContext({
  preferences: null,
  loading: true,
  save: async () => {},
});

export const PreferencesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPreferences(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchPreferences()
      .then(setPreferences)
      .catch(() => setPreferences(null))
      .finally(() => setLoading(false));
  }, [user]);

  const save = async (payload) => {
    const updated = await updatePreferences(payload);
    setPreferences(updated);
    return updated;
  };

  return (
    <PreferencesContext.Provider value={{ preferences, loading, save }}>
      {children}
    </PreferencesContext.Provider>
  );
};
