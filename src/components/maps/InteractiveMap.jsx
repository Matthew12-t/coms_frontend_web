import { createPortal } from "react-dom";

import borjuMap from "../../assets/kantin_borju_map.png";
import sipilMap from "../../assets/kantin_sipil_map.png";
import gkuMap from "../../assets/kantin_gkutimur_map.png";
import { canteenList, canteenDetails } from "../../lib/mockData";

const MAP_IMAGES = { borju: borjuMap, sipil: sipilMap, gku: gkuMap };

function InteractiveMap({ activeId, search, onSelect }) {
  const filtered = search
    ? canteenList.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const detail = canteenDetails[activeId];
  const mapSrc = MAP_IMAGES[activeId];

  const searchTarget = document.getElementById("topbar-search");
  const dropdown =
    filtered.length > 0 && searchTarget
      ? createPortal(
          <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>,
          searchTarget
        )
      : null;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      {dropdown}

      <div className="relative overflow-hidden bg-slate-100">
        {mapSrc ? (
          <img
            src={mapSrc}
            alt={`${detail?.name} map`}
            className="w-full h-auto"
          />
        ) : (
          <div className="flex min-h-[460px] items-center justify-center">
            <p className="text-sm text-slate-400">No map available</p>
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow">
          {detail?.name ?? "Campus Map"}
        </div>
      </div>
    </div>
  );
}

export default InteractiveMap;
