import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, Map, Settings, User } from "lucide-react";

import { fetchProfile } from "../../services/profileService";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/campus-map", label: "Campus Map", icon: Map },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  const [profile, setProfile] = useState({ full_name: null, student_id: null });

  useEffect(() => {
    fetchProfile().then(setProfile).catch(() => {});
  }, []);

  const displayName = profile.full_name
    ? profile.full_name.split(" ").slice(0, 2).join(" ")
    : "-";

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="px-6 py-7">
        <p className="text-xl font-extrabold tracking-wide text-brand-900 dark:text-brand-100">
          C.O.M.S.
        </p>
        <p className="mt-1 text-[10px] font-semibold tracking-[2px] text-slate-400 dark:text-slate-500">
          CANTEEN OCCUPANCY
          <br />
          MONITORING SYSTEM
        </p>
      </div>

      <nav className="flex-1 px-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-900 dark:bg-slate-700 dark:text-brand-100"
                  : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} />
                <span className={isActive ? "font-semibold" : ""}>{label}</span>
                {isActive ? (
                  <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l bg-brand-900 dark:bg-brand-100" />
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-amber-100 text-amber-500">
            <User size={16} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
              {displayName}
            </p>
            <p className="text-[11px] tracking-wider text-slate-400 dark:text-slate-500">
              ID: {profile.student_id ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
