import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import StatusPill from "../common/StatusPill";
import api from "../../lib/api";
import { canteenDetails } from "../../lib/mockData";

import borjuImg from "../../assets/kantin_borju_image.png";
import sipilImg from "../../assets/kantin_sipil_image.png";
import gkuImg from "../../assets/kantin_gkutimur_image.png";
import menu1 from "../../assets/menu1.png";
import menu2 from "../../assets/menu2.png";
import menu3 from "../../assets/menu3.png";

const CANTEEN_IMAGES = { borju: borjuImg, sipil: sipilImg, gku: gkuImg };
const MENU_IMAGES = [menu1, menu2, menu3];

const calcMins = (people) => Math.max(1, Math.round(people / 1.5));

const deriveStatus = (density) => {
  if (density < 0.3) return { statusTone: "success", status: "Low Flow" };
  if (density < 0.7) return { statusTone: "neutral", status: "Moderate" };
  return { statusTone: "danger", status: "Peak Flow" };
};

function MiniHistogram({ values, activeIndex }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-12 items-end gap-2">
      {values.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-md ${i === activeIndex ? "bg-brand-900" : "bg-slate-200"}`}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function MenuPopup({ src, label, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[80vh] max-w-lg w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={label} className="h-full w-full object-contain" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
        >
          <X size={16} />
        </button>
        <div className="px-4 py-3">
          <p className="text-sm font-semibold text-slate-700">{label}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

function CanteenDetailRail({ activeId }) {
  const [liveData, setLiveData] = useState(null);
  const [menuPopup, setMenuPopup] = useState(null);

  useEffect(() => {
    if (activeId !== "borju") {
      setLiveData(null);
      return;
    }
    let cancelled = false;

    api.get("/canteens").then((res) => {
      const canteens = Array.isArray(res.data?.data) ? res.data.data : [];
      const borju = canteens.find((c) => c.name === "Kantin Borju");
      if (!borju || cancelled) return;

      api.get(`/canteens/${borju.id}/history`, { params: { limit: 5 } }).then((histRes) => {
        if (cancelled) return;
        const history = Array.isArray(histRes.data?.data) ? histRes.data.data : [];
        const latest = history[0];
        const headCount = latest?.head_count ?? 0;
        const density = borju.capacity_max ? headCount / borju.capacity_max : 0;
        const histogram = history.map((h) => h.head_count ?? 0).reverse();

        setLiveData({
          inLine: headCount,
          waitMins: calcMins(headCount),
          histogram: histogram.length > 0 ? histogram : [0],
          histogramActive: histogram.length - 1,
          ...deriveStatus(density),
        });
      }).catch(() => {});
    }).catch(() => {});

    return () => { cancelled = true; };
  }, [activeId]);

  const base = canteenDetails[activeId] ?? canteenDetails.borju;
  const detail = activeId === "borju" && liveData ? { ...base, ...liveData } : base;
  const imgSrc = CANTEEN_IMAGES[activeId];

  return (
    <aside className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      {menuPopup !== null && (
        <MenuPopup
          src={MENU_IMAGES[menuPopup]}
          label={detail.menus[menuPopup]}
          onClose={() => setMenuPopup(null)}
        />
      )}

      <div>
        <h3 className="text-xl font-bold text-slate-800">{detail.name}</h3>
        <div className="mt-3 flex justify-between text-xs">
          <div>
            <p className="text-slate-400">Location</p>
            <p className="mt-0.5 font-semibold text-slate-700">{detail.location}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400">Operational hours</p>
            <p className="mt-0.5 font-semibold text-slate-700">{detail.hours}</p>
          </div>
        </div>
      </div>

      <div className="h-32 overflow-hidden rounded-xl">
        {imgSrc ? (
          <img src={imgSrc} alt={detail.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full bg-gradient-to-br from-slate-300 to-slate-400" />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-emerald-600">{detail.inLine}</p>
          <p className="text-xs text-slate-500">People in line</p>
        </div>
        <StatusPill tone={detail.statusTone}>{detail.status}</StatusPill>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">Wait Time</p>
          <p className="text-sm font-semibold text-slate-700">~{detail.waitMins} mins</p>
        </div>
        <div className="mt-2">
          <MiniHistogram values={detail.histogram} activeIndex={detail.histogramActive} />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700">Menu</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {detail.menus.map((menu, i) => (
            <button
              key={menu}
              type="button"
              onClick={() => setMenuPopup(i)}
              className="relative h-20 overflow-hidden rounded-xl focus:outline-none"
            >
              <img src={MENU_IMAGES[i]} alt={menu} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-end justify-center bg-black/25 pb-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-wide text-white">
                  {menu}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default CanteenDetailRail;
