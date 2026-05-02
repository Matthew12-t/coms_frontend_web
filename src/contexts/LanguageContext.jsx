import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    settings: {
      title: "Application Settings",
      appPreferences: "APP PREFERENCES",
      themeMode: "Theme Mode",
      language: "Language",
      light: "Light Mode",
      dark: "Dark Mode",
      english: "English",
      indonesian: "Indonesian",
      logout: "Log Out",
      loggingOut: "Logging Out...",
      logoutError: "Failed to log out. Please try again.",
      version: "C.O.M.S. Desktop Client v2.4.1-stable",
    },
  },
  id: {
    settings: {
      title: "Pengaturan Aplikasi",
      appPreferences: "PREFERENSI APLIKASI",
      themeMode: "Mode Tampilan",
      language: "Bahasa",
      light: "Mode Terang",
      dark: "Mode Gelap",
      english: "Inggris",
      indonesian: "Indonesia",
      logout: "Keluar",
      loggingOut: "Sedang Keluar...",
      logoutError: "Gagal keluar. Silakan coba lagi.",
      version: "C.O.M.S. Desktop Client v2.4.1-stable",
    },
  },
};

const LanguageContext = createContext({ language: "en", setLanguage: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") ?? "en");

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key) => {
    const value = key.split(".").reduce((obj, k) => obj?.[k], translations[language]);
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
