import { LayoutGrid, ChevronDown, Globe, LogOut } from "lucide-react";

function Field({ label, value, icon }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <div className="mt-1 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5">
        <span className="text-sm text-slate-700">{value}</span>
        {icon ?? <ChevronDown size={14} className="text-slate-400" />}
      </div>
    </div>
  );
}

function ApplicationSettings() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center gap-2">
        <LayoutGrid size={18} className="text-brand-900" />
        <h3 className="text-lg font-bold text-slate-800">Application Settings</h3>
      </div>

      <p className="mt-5 text-[10px] font-semibold tracking-[2px] text-slate-400">
        APP PREFERENCES
      </p>

      <div className="mt-3 space-y-4">
        <Field label="Theme Mode" value="System Default" />
        <Field
          label="Language"
          value="English (US)"
          icon={<Globe size={14} className="text-slate-400" />}
        />
      </div>

      <div className="mt-auto pt-8">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-rose-300 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
        >
          <LogOut size={14} />
          Log Out
        </button>
        <p className="mt-3 text-center text-[11px] tracking-widest text-slate-400">
          C.O.M.S. Desktop Client v2.4.1-stable
        </p>
      </div>
    </div>
  );
}

export default ApplicationSettings;
