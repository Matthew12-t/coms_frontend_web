import { useState } from "react";
import { MapPin, Plus, X, Star, Trash2 } from "lucide-react";

import Button from "../ui/Button";

function ActionRow({ canteen, isFavorited, onAdd, onRemove, busy, disabled }) {
  return (
    <li>
      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-brand-900">{canteen.name}</p>
          {canteen.location ? (
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} />
              {canteen.location}
            </p>
          ) : null}
        </div>

        {isFavorited ? (
          <button
            type="button"
            disabled={disabled || busy}
            onClick={() => onRemove(canteen)}
            aria-label={`Remove ${canteen.name} from favorites`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={14} />
          </button>
        ) : (
          <button
            type="button"
            disabled={disabled || busy}
            onClick={() => onAdd(canteen)}
            aria-label={`Add ${canteen.name} to favorites`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
    </li>
  );
}

function ModalBody({ onClose, canteens, favoriteIds, onAdd, onRemove, saving }) {
  const [error, setError] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  const favorites = canteens.filter((c) => favoriteIds.includes(c.id));
  const available = canteens.filter((c) => !favoriteIds.includes(c.id));

  const wrap = async (fn, canteen) => {
    setError(null);
    setPendingId(canteen.id);
    try {
      await fn(canteen);
    } catch (err) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-fav-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-500" />
              <h2
                id="manage-fav-title"
                className="text-base font-bold text-slate-800"
              >
                Manage Favorites
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Add or remove canteens from your dashboard.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-4 space-y-5">
          {favorites.length > 0 ? (
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400">
                YOUR FAVORITES
              </p>
              <ul className="space-y-2">
                {favorites.map((canteen) => (
                  <ActionRow
                    key={canteen.id}
                    canteen={canteen}
                    isFavorited
                    onRemove={(c) => wrap(onRemove, c)}
                    busy={pendingId === canteen.id}
                    disabled={saving}
                  />
                ))}
              </ul>
            </div>
          ) : null}

          {available.length > 0 ? (
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400">
                ADD CANTEEN
              </p>
              <ul className="space-y-2">
                {available.map((canteen) => (
                  <ActionRow
                    key={canteen.id}
                    canteen={canteen}
                    isFavorited={false}
                    onAdd={(c) => wrap(onAdd, c)}
                    busy={pendingId === canteen.id}
                    disabled={saving}
                  />
                ))}
              </ul>
            </div>
          ) : null}

          {favorites.length === 0 && available.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              No canteens available.
            </p>
          ) : null}

          {error ? (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end border-t border-slate-100 px-6 py-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

function AddFavoriteModal({ open, ...props }) {
  if (!open) return null;
  return <ModalBody {...props} />;
}

export default AddFavoriteModal;
