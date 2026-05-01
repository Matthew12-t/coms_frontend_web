import { Users, MapPin } from "lucide-react";

import StatusPill from "../common/StatusPill";

function MiniHistogram({ values, activeIndex }) {
  const max = Math.max(...values, 1);
  return (
    <div className="mt-3 flex h-8 items-end gap-1">
      {values.map((v, i) => (
        <div
          key={i}
          className={`w-3 rounded-sm ${
            i === activeIndex ? "bg-brand-900" : "bg-slate-200"
          }`}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function CanteenStatCard({ canteen, tone = "neutral", caption, histogram, activeIndex = -1, mins }) {
  if (!canteen) return null;

  const { name, location, capacity_max } = canteen;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-brand-900">{name}</h3>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={12} />
            {location}
          </p>
        </div>
        {caption ? <StatusPill tone={tone}>{caption}</StatusPill> : null}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-brand-900">{capacity_max}</p>
          <p className="text-[10px] font-semibold tracking-widest text-slate-400">
            CAPACITY
          </p>
        </div>
        {mins ? (
          <p className="text-xs text-slate-500">~{mins} mins wait</p>
        ) : null}
      </div>

      {histogram ? (
        <MiniHistogram values={histogram} activeIndex={activeIndex} />
      ) : (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
          <Users size={12} /> Available now
        </div>
      )}
    </div>
  );
}

export default CanteenStatCard;
