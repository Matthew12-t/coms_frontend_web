import { Link } from "react-router-dom";
import { Map, AlertTriangle, TrendingUp } from "lucide-react";

import defaultMaps from "../../assets/default_maps.png";

function CardShell({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 ${className}`}>
      {children}
    </div>
  );
}

function DashboardRail() {
  return (
    <div className="space-y-5">
      <CardShell>
        <h3 className="text-sm font-semibold text-brand-900">Live Campus Map</h3>
        <div className="relative mt-4 h-32 overflow-hidden rounded-xl">
          <img
            src={defaultMaps}
            alt="Campus map preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <Link
              to="/campus-map"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-900 shadow hover:bg-slate-50"
            >
              <Map size={14} />
              View Map
            </Link>
          </div>
        </div>
      </CardShell>

      <CardShell>
        <h3 className="text-sm font-semibold text-brand-900">Quick Insights</h3>
        <div className="mt-3 rounded-xl bg-brand-50 px-4 py-3">
          <p className="text-[10px] font-semibold tracking-widest text-brand-700">
            CAMPUS AVERAGE
          </p>
          <p className="mt-1 text-2xl font-bold text-brand-900">65% Density</p>
        </div>
        <div className="mt-3 flex items-start gap-3 rounded-xl bg-rose-50 px-4 py-3">
          <AlertTriangle size={16} className="mt-0.5 text-rose-500" />
          <div>
            <p className="text-sm font-semibold text-rose-600">Kantin Sipil</p>
            <p className="text-xs text-rose-500">Trending busiest now</p>
          </div>
        </div>
      </CardShell>

      <CardShell>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-brand-900">Trend Overview</h3>
          <TrendingUp size={14} className="text-emerald-500" />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Wait time down 6% vs last week.
        </p>
      </CardShell>
    </div>
  );
}

export default DashboardRail;
