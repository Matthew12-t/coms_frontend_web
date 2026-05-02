import { Users, MapPin } from "lucide-react";

import StatusPill from "../common/StatusPill";

const ACTIVE_BAR = {
  success: "bg-emerald-500",
  danger: "bg-rose-500",
  warning: "bg-amber-500",
  neutral: "bg-brand-900",
};

function MiniHistogram({ values, activeIndex, tone }) {
  const max = Math.max(...values, 1);
  const activeColor = ACTIVE_BAR[tone] ?? ACTIVE_BAR.neutral;
  return (
    <div className="mt-3 flex h-8 items-end gap-1">
      {values.map((v, i) => (
        <div
          key={i}
          className={`w-3 rounded-sm ${
            i === activeIndex ? activeColor : "bg-slate-200"
          }`}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function CanteenStatCard({
  canteen,
  tone = "neutral",
  caption,
  histogram,
  activeIndex = -1,
  mins,
  people,
}) {
  if (!canteen) return null;

  const { name, location, capacity_max } = canteen;
  const count = people ?? capacity_max;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-brand-900">{name}</h3>
          {location ? (
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} />
              {location}
            </p>
          ) : null}
        </div>
        {caption ? <StatusPill tone={tone}>{caption}</StatusPill> : null}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-brand-900">{count}</p>
          <p className="text-[10px] font-semibold tracking-widest text-slate-400">
            PEOPLE
          </p>
        </div>
        {mins ? (
          <p className="text-xs text-slate-500">+{mins} mins wait</p>
        ) : null}
      </div>

      {histogram ? (
        <MiniHistogram values={histogram} activeIndex={activeIndex} tone={tone} />
      ) : (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
          <Users size={12} /> Available now
        </div>
      )}
    </div>
  );
}

export default CanteenStatCard;
