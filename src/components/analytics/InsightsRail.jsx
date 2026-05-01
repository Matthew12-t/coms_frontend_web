import { Clock, Star, AlertTriangle, Map } from "lucide-react";

import { keyInsights } from "../../lib/mockData";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 ${className}`}>
      {children}
    </div>
  );
}

function InsightsRail() {
  return (
    <div className="space-y-4">
      <p className="text-[11px] font-semibold tracking-[2px] text-slate-400">
        KEY INSIGHTS
      </p>

      <Card>
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Clock size={18} />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
            ↗ Better
          </span>
        </div>
        <p className="mt-4 text-2xl font-bold text-slate-800">
          {keyInsights.waitTimeSaved}
        </p>
        <p className="text-xs text-slate-500">Avg. Wait Time Saved</p>
        <p className="mt-2 text-[11px] text-slate-400">
          Compared to previous semester
        </p>
      </Card>

      <Card>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-500">
          <Star size={18} />
        </div>
        <p className="mt-4 text-base font-bold text-slate-800">
          {keyInsights.mostVisited.name}
        </p>
        <p className="text-xs text-slate-500">Most Visited Location</p>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400">Loyalty Index</span>
          <span className="font-semibold text-slate-700">
            {keyInsights.mostVisited.loyalty}
          </span>
        </div>
      </Card>

      <Card className="bg-rose-50 ring-rose-100">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-white">
            <AlertTriangle size={14} />
          </span>
          <span className="text-[10px] font-bold tracking-widest text-rose-600">
            CRITICAL PEAK
          </span>
        </div>
        <p className="mt-3 text-base font-bold text-slate-800">
          {keyInsights.criticalPeak.canteen}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {keyInsights.criticalPeak.note}{" "}
          <span className="font-semibold text-rose-600">
            {keyInsights.criticalPeak.time}.
          </span>
        </p>
        <button className="mt-3 text-[11px] font-bold tracking-widest text-rose-600">
          SET REMINDER →
        </button>
      </Card>

      <Card className="bg-brand-900 text-white ring-0">
        <p className="text-sm font-bold">Quick Campus View</p>
        <p className="mt-1 text-xs text-white/70">
          3 High Density zones detected.
        </p>
        <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold tracking-widest text-brand-900">
          <Map size={12} />
          OPEN MAP
        </button>
      </Card>
    </div>
  );
}

export default InsightsRail;
