import { useEffect, useState } from "react";
import { Clock, Star, AlertTriangle } from "lucide-react";

import { fetchCanteens, fetchCanteenHistory } from "../../services/canteenService";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 ${className}`}>
      {children}
    </div>
  );
}

const MOCK_MINS   = [10, 14];
const MOCK_PEOPLE = [54, 20];
const calcMins = (people) => Math.max(1, Math.round(people / 1.5));

function InsightsRail() {
  const [mostVisited, setMostVisited] = useState(null);
  const [criticalPeak, setCriticalPeak] = useState(null);
  const [avgWaitMins, setAvgWaitMins] = useState(null);

  useEffect(() => {
    fetchCanteens().then((canteens) => {
      if (!canteens.length) return;
      Promise.all(canteens.map((c) => fetchCanteenHistory(c.id, 1))).then((histories) => {
        const best = canteens.reduce((a, b) => (a.capacity_max > b.capacity_max ? a : b));
        const bestRealCount = histories[canteens.indexOf(best)]?.[0]?.head_count ?? 0;

        let mockPeopleIdx = 0;
        let mockMinsIdx = 0;
        const withEffective = canteens.map((c) => {
          const isBest = c.id === best.id;
          const headCount = isBest ? bestRealCount : MOCK_PEOPLE[mockPeopleIdx++ % MOCK_PEOPLE.length];
          const mins = isBest ? calcMins(bestRealCount) : MOCK_MINS[mockMinsIdx++ % MOCK_MINS.length];
          return {
            ...c,
            headCount,
            mins,
            density: c.capacity_max ? headCount / c.capacity_max : 0,
          };
        });

        setMostVisited(withEffective.reduce((a, b) => (a.headCount > b.headCount ? a : b)));
        setCriticalPeak(withEffective.reduce((a, b) => (a.density > b.density ? a : b)));
        const totalMins = withEffective.reduce((s, c) => s + c.mins, 0);
        setAvgWaitMins(Math.round(totalMins / withEffective.length));
      });
    });
  }, []);

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
          {avgWaitMins != null ? `${avgWaitMins} mins` : "—"}
        </p>
        <p className="text-xs text-slate-500">Avg. Wait Time</p>
        <p className="mt-2 text-[11px] text-slate-400">Across all canteens right now</p>
      </Card>

      <Card>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-500">
          <Star size={18} />
        </div>
        <p className="mt-4 text-base font-bold text-slate-800">
          {mostVisited?.name ?? "—"}
        </p>
        <p className="text-xs text-slate-500">Most Visited Right Now</p>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400">Current People</span>
          <span className="font-semibold text-slate-700">
            {mostVisited != null ? mostVisited.headCount : "—"}
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
          {criticalPeak?.name ?? "—"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {criticalPeak != null
            ? `${criticalPeak.headCount} people · ${Math.round(criticalPeak.density * 100)}% capacity`
            : "Loading..."}
        </p>

      </Card>
    </div>
  );
}

export default InsightsRail;
