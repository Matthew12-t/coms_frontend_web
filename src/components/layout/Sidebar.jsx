import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, Map, Settings, LifeBuoy } from "lucide-react";

import { profile } from "../../lib/mockData";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/campus-map", label: "Campus Map", icon: Map },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-slate-200 bg-white">
      <div className="px-6 py-7">
        <p className="text-xl font-extrabold tracking-wide text-brand-900">
          C.O.M.S.
        </p>
        <p className="mt-1 text-[10px] font-semibold tracking-[2px] text-slate-400">
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
                  ? "bg-brand-50 text-brand-900"
                  : "text-slate-500 hover:bg-slate-50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} />
                <span className={isActive ? "font-semibold" : ""}>{label}</span>
                {isActive ? (
                  <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l bg-brand-900" />
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-amber-200" />
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {profile.name.split(" ")[0]} {profile.name.split(" ")[1]?.[0]}.
            </p>
            <p className="text-[11px] tracking-wider text-slate-400">
              ID: {profile.studentId}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-900 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <LifeBuoy size={14} />
          Support
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
