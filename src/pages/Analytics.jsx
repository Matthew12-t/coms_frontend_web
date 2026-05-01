import { useState } from "react";

import PeakHoursChart from "../components/analytics/PeakHoursChart";
import AverageDensityChart from "../components/analytics/AverageDensityChart";
import InsightsRail from "../components/analytics/InsightsRail";

const RANGES = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

function RangeTabs({ value, onChange }) {
  return (
    <div className="flex rounded-full bg-slate-100 p-1">
      {RANGES.map((r) => {
        const active = value === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onChange(r.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-white text-brand-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}

function Analytics() {
  const [range, setRange] = useState("today");

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
      <div className="space-y-5">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Campus Activity Trends
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Visualizing real-time density and behavioral patterns.
              </p>
            </div>
            <RangeTabs value={range} onChange={setRange} />
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Campus Peak Hours
              </h3>
              <p className="mt-1 inline-flex items-center gap-2 text-xs text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live Attendance · 08:00 AM - 05:00 PM (Today)
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-brand-900">74%</p>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400">
                AVG. LOAD
              </p>
            </div>
          </div>

          <div className="mt-2">
            <PeakHoursChart />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-end justify-between">
            <h3 className="text-base font-bold text-slate-800">
              Average Density per Day
            </h3>
            <p className="text-xs text-slate-500">Unit: % Occupancy</p>
          </div>
          <div className="mt-4">
            <AverageDensityChart />
          </div>
        </div>
      </div>

      <InsightsRail />
    </div>
  );
}

export default Analytics;
