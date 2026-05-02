import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";

import SearchBar from "../common/SearchBar";

const TITLES = {
  "/": "Dashboard",
  "/analytics": "Crowd Analytics",
  "/campus-map": "Campus Map",
  "/settings": "Account Settings",
};

function Topbar({ search, onSearchChange }) {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "Dashboard";
  const isOnSettings = pathname === "/settings";

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-slate-700 dark:bg-slate-800">
      <h1 className="text-xl font-bold text-brand-900 dark:text-brand-100">{title}</h1>

      <div className="flex flex-1 items-center justify-center px-8">
        {pathname === "/campus-map" ? (
          <div id="topbar-search" className="relative w-full max-w-md">
            <SearchBar value={search} onChange={onSearchChange} />
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/settings"
          aria-label="Account settings"
          aria-current={isOnSettings ? "page" : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
            isOnSettings
              ? "bg-brand-900 text-white"
              : "bg-slate-100 text-slate-500 hover:bg-brand-900 hover:text-white dark:bg-slate-700 dark:text-slate-400"
          }`}
        >
          <User size={18} />
        </Link>
      </div>
    </header>
  );
}

export default Topbar;
