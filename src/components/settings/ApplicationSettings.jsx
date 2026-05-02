import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, LogOut, Loader2 } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-brand-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function resolveErrorMessage(error, fallback) {
  return error?.response?.data?.error ?? error?.message ?? fallback;
}

function ApplicationSettings() {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const themeOptions = [
    { value: "light", label: t("settings.light") },
    { value: "dark",  label: t("settings.dark") },
  ];

  const languageOptions = [
    { value: "en", label: t("settings.english") },
    { value: "id", label: t("settings.indonesian") },
  ];

  const handleLogout = async () => {
    if (loggingOut) return;
    setErrorMessage(null);
    setLoggingOut(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setErrorMessage(resolveErrorMessage(error, t("settings.logoutError")));
      setLoggingOut(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
      <div className="flex items-center gap-2">
        <LayoutGrid size={18} className="text-brand-900 dark:text-brand-100" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t("settings.title")}</h3>
      </div>

      <p className="mt-5 text-[10px] font-semibold tracking-[2px] text-slate-400 dark:text-slate-500">
        {t("settings.appPreferences")}
      </p>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label={t("settings.themeMode")}
          value={theme}
          options={themeOptions}
          onChange={setTheme}
        />
        <SelectField
          label={t("settings.language")}
          value={language}
          options={languageOptions}
          onChange={setLanguage}
        />
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          aria-busy={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-rose-300 py-3 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-500 dark:text-rose-400 dark:hover:bg-rose-950"
        >
          {loggingOut ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <LogOut size={14} />
          )}
          {loggingOut ? t("settings.loggingOut") : t("settings.logout")}
        </button>
        {errorMessage && (
          <p role="alert" className="mt-2 text-center text-xs font-medium text-rose-600 dark:text-rose-400">
            {errorMessage}
          </p>
        )}
        <p className="mt-3 text-center text-[11px] tracking-widest text-slate-400 dark:text-slate-500">
          {t("settings.version")}
        </p>
      </div>
    </div>
  );
}

export default ApplicationSettings;
