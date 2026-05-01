import { useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";

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

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <h1 className="text-xl font-bold text-brand-900">{title}</h1>

      <div className="flex flex-1 items-center justify-center px-8">
        <SearchBar value={search} onChange={onSearchChange} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
        >
          <Bell size={18} />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
        >
          <User size={18} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
