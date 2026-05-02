function BestChoiceCard({ canteen, people, mins }) {
  if (!canteen) return null;

  const { name, capacity_max } = canteen;
  const comfort = Math.max(0, Math.round((1 - people / capacity_max) * 100));

  return (
    <div className="rounded-2xl bg-brand-900 px-7 py-6 text-white shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-300/20 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-300">
              BEST CHOICE FOR YOU
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold">{name}</h2>
          <p className="mt-1.5 text-sm text-white/70">
            {people} People currently in queue
          </p>
          <p className="mt-1 text-sm font-semibold text-white/90">
            ~ {mins} mins wait
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 px-5 py-4 text-center">
          <p className="text-3xl font-extrabold leading-none">{comfort}%</p>
          <p className="mt-1 text-[10px] font-bold tracking-widest text-white/60">
            COMFORT
          </p>
        </div>
      </div>
    </div>
  );
}

export default BestChoiceCard;
