import { Clock, Users } from "lucide-react";

function BestChoiceCard({ canteen }) {
  if (!canteen) return null;

  const { name, location, capacity_max } = canteen;

  return (
    <div className="rounded-2xl bg-brand-900 px-7 py-6 text-white shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-emerald-300/30 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-200">
            BEST CHOICE FOR YOU
          </span>
          <h2 className="mt-3 text-3xl font-bold">{name}</h2>
          <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} /> Capacity {capacity_max} people
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {location}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-4xl font-extrabold leading-none">
            {capacity_max}
          </p>
          <p className="mt-1 text-[11px] font-semibold tracking-widest text-white/70">
            MAX CAPACITY
          </p>
        </div>
      </div>
    </div>
  );
}

export default BestChoiceCard;
