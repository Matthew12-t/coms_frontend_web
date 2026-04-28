function CanteenCard({ canteen }) {
  const { name, location, capacity_max } = canteen;

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-slate-100">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-slate-800">{name}</h2>
        <p className="text-sm text-slate-500">{location}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Capacity
        </span>
        <span className="text-sm font-medium text-slate-700">
          {capacity_max}
        </span>
      </div>
    </div>
  );
}

export default CanteenCard;
