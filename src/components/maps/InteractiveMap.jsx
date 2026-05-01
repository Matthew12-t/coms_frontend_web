import { useState } from "react";
import { MapPin } from "lucide-react";

import { mapPins } from "../../lib/mockData";

function InteractiveMap() {
  const [active, setActive] = useState("borju");

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-2xl bg-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#E2E8F0_0%,#CBD5E1_70%)]" />
      <div className="absolute inset-0">
        {mapPins.map((pin) => {
          const isActive = pin.id === active;
          return (
            <button
              key={pin.id}
              type="button"
              onClick={() => setActive(pin.id)}
              className="absolute flex flex-col items-center"
              style={{
                left: `${pin.x * 100}%`,
                top: `${pin.y * 100}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              {isActive ? (
                <span className="mb-1 whitespace-nowrap rounded-md bg-brand-900 px-2 py-1 text-[10px] font-semibold text-white shadow">
                  {pin.name}
                </span>
              ) : null}
              <MapPin
                size={28}
                strokeWidth={1.5}
                className={isActive ? "text-rose-500" : "text-amber-500"}
                fill={isActive ? "#F43F5E" : "#F59E0B"}
              />
            </button>
          );
        })}
      </div>
      <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow">
        Institut Teknologi Bandung
      </div>
    </div>
  );
}

export default InteractiveMap;
