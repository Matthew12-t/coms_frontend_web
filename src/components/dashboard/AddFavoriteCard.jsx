import { Plus } from "lucide-react";

function AddFavoriteCard() {
  return (
    <button
      type="button"
      className="flex h-full min-h-[170px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white text-slate-400 transition-colors hover:border-brand-500 hover:text-brand-700"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
        <Plus size={18} />
      </span>
      <p className="mt-3 text-sm font-semibold">Add Favorite Canteen</p>
      <p className="mt-1 text-xs">Track campuses you visit most</p>
    </button>
  );
}

export default AddFavoriteCard;
