import { Bell } from "lucide-react";

import StatusPill from "../common/StatusPill";
import { mapDetail } from "../../lib/mockData";

function MiniHistogram({ values, activeIndex }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-12 items-end gap-2">
      {values.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-md ${
            i === activeIndex ? "bg-brand-900" : "bg-slate-200"
          }`}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function CanteenDetailRail() {
  return (
    <aside className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div>
        <h3 className="text-xl font-bold text-slate-800">{mapDetail.name}</h3>
        <div className="mt-3 flex justify-between text-xs">
          <div>
            <p className="text-slate-400">Location</p>
            <p className="mt-0.5 font-semibold text-slate-700">
              {mapDetail.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-400">Operational hours</p>
            <p className="mt-0.5 font-semibold text-slate-700">
              {mapDetail.hours}
            </p>
          </div>
        </div>
      </div>

      <div className="h-32 overflow-hidden rounded-xl bg-gradient-to-br from-slate-300 to-slate-400" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-emerald-600">
            {mapDetail.inLine}
          </p>
          <p className="text-xs text-slate-500">People in line</p>
        </div>
        <StatusPill tone="success">{mapDetail.status}</StatusPill>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">Wait Time</p>
          <p className="text-sm font-semibold text-slate-700">
            ~{mapDetail.waitMins} mins
          </p>
        </div>
        <div className="mt-2">
          <MiniHistogram
            values={mapDetail.histogram}
            activeIndex={mapDetail.histogramActive}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700">Menu</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {mapDetail.menus.map((menu) => (
            <div
              key={menu}
              className="flex h-20 items-center justify-center rounded-xl bg-slate-100 px-2 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400"
            >
              {menu}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-900 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-900 hover:text-white"
      >
        <Bell size={14} />
        Notify Me
      </button>
    </aside>
  );
}

export default CanteenDetailRail;
