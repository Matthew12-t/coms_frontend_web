import { useState } from "react";
import { SlidersHorizontal, Utensils, Landmark } from "lucide-react";

import Toggle from "./Toggle";
import { initialPreferences } from "../../lib/mockData";

const PREF_ICONS = {
  utensils: Utensils,
  landmark: Landmark,
};

function SystemPreferences() {
  const [prefs, setPrefs] = useState(initialPreferences);

  const togglePref = (id) =>
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-brand-900" />
        <h3 className="text-lg font-bold text-slate-800">System Preferences</h3>
      </div>

      <p className="mt-5 text-[10px] font-semibold tracking-[2px] text-slate-400">
        CANTEEN PREFERENCES
      </p>
      <div className="mt-3 space-y-3">
        {prefs.map((pref) => {
          const Icon = PREF_ICONS[pref.icon];
          return (
            <div
              key={pref.id}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-brand-900" />
                <span className="text-sm font-semibold text-brand-900">
                  {pref.name}
                </span>
              </div>
              <Toggle
                value={pref.enabled}
                onChange={() => togglePref(pref.id)}
                accent="emerald"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SystemPreferences;
