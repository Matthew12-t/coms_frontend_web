import { useEffect, useState } from "react";

import PeakHoursChart from "../components/analytics/PeakHoursChart";
import AverageDensityChart from "../components/analytics/AverageDensityChart";
import InsightsRail from "../components/analytics/InsightsRail";
import { fetchPeakHours, fetchDailyAverages } from "../services/analyticsService";

const RANGES = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

const RANGE_TO_API = { today: "day", week: "week", month: "month" };

const DAYS_INDEX  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEK_DAYS   = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTH_STEPS = [1, 5, 10, 15, 20, 25, 30];

const formatHourShort = (h) => {
  if (h === 0)  return "12AM";
  if (h === 12) return "12PM";
  return h < 12 ? `${h}AM` : `${h - 12}PM`;
};

const toPeakChartData = (raw) => {
  const byHour = Object.fromEntries(raw.map((r) => [r.hour, r.avg_head_count]));
  return Array.from({ length: 24 }, (_, h) => ({ time: formatHourShort(h), load: byHour[h] ?? 0 }));
};

const toWeekChartData = (raw) => {
  const accum = {};
  for (const { day, avg_head_count } of raw) {
    const name = DAYS_INDEX[new Date(day + "T12:00:00").getDay()];
    if (!accum[name]) accum[name] = { total: 0, count: 0 };
    accum[name].total += avg_head_count;
    accum[name].count += 1;
  }
  return WEEK_DAYS.map((d) => ({
    time: d.slice(0, 3),
    load: accum[d] ? Math.round(accum[d].total / accum[d].count) : 0,
  }));
};

const toMonthChartData = (raw) => {
  const byDate = Object.fromEntries(
    raw.map((r) => [new Date(r.day + "T12:00:00").getDate(), r.avg_head_count])
  );
  return MONTH_STEPS.map((d) => ({ time: String(d), load: byDate[d] ?? 0 }));
};

const toDailyChartData = (raw) => {
  const accum = {};
  for (const { day, avg_head_count } of raw) {
    const name = DAYS_INDEX[new Date(day + "T12:00:00").getDay()];
    if (!accum[name]) accum[name] = { total: 0, count: 0 };
    accum[name].total += avg_head_count;
    accum[name].count += 1;
  }
  const values = Object.values(accum).map((a) => Math.round(a.total / a.count));
  const min = values.length > 0 ? Math.min(...values) : 0;
  return WEEK_DAYS.map((d) => {
    const count = accum[d] ? Math.round(accum[d].total / accum[d].count) : 0;
    return { day: d, count, lowest: count > 0 && count === min };
  });
};

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
  const [peakData, setPeakData] = useState([]);
  const [avgData, setAvgData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchPeakHours({ range: RANGE_TO_API[range] }),
      fetchDailyAverages({}),
    ])
      .then(([peak, avg]) => {
        if (range === "today")       setPeakData(toPeakChartData(peak));
        else if (range === "week")   setPeakData(toWeekChartData(avg));
        else                         setPeakData(toMonthChartData(avg));
        setAvgData(toDailyChartData(avg));
      })
      .finally(() => setLoading(false));
  }, [range]);

  const avgLoad =
    peakData.length > 0
      ? Math.round(peakData.reduce((s, d) => s + d.load, 0) / peakData.length)
      : null;

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
                Live Attendance · Real-time data
              </p>
            </div>
            {avgLoad !== null && (
              <div className="text-right">
                <p className="text-2xl font-bold text-brand-900">{avgLoad}</p>
                <p className="text-[10px] font-semibold tracking-widest text-slate-400">
                  AVG. PEOPLE
                </p>
              </div>
            )}
          </div>

          <div className="mt-2">
            <PeakHoursChart data={peakData} loading={loading} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-end justify-between">
            <h3 className="text-base font-bold text-slate-800">
              Average Count per Day
            </h3>
            <p className="text-xs text-slate-500">Unit: avg people</p>
          </div>
          <div className="mt-4">
            <AverageDensityChart data={avgData} loading={loading} />
          </div>
        </div>
      </div>

      <InsightsRail />
    </div>
  );
}

export default Analytics;
