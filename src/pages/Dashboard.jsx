import { useContext, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import api from "../lib/api";
import BestChoiceCard from "../components/dashboard/BestChoiceCard";
import CanteenStatCard from "../components/dashboard/CanteenStatCard";
import AddFavoriteCard from "../components/dashboard/AddFavoriteCard";
import AddFavoriteModal from "../components/dashboard/AddFavoriteModal";
import DashboardRail from "../components/dashboard/DashboardRail";
import { PreferencesContext } from "../contexts/PreferencesContext";

const MOCK_CONFIGS = [
  { tone: "danger",  caption: "Peak Now", histogram: [55, 65, 90, 70, 60], active: 2, mins: 10, people: 54 },
  { tone: "neutral", caption: "Moderate", histogram: [10, 18, 35, 22, 12], active: 2, mins: 14, people: 20 },
];

const LIVE_CONFIG = {
  tone: "success",
  caption: "Live Now",
  histogram: [22, 30, 70, 40, 18],
  active: 2,
  peopleFallback: 12,
};

const pickBestChoice = (canteens) =>
  canteens.reduce(
    (best, cur) => (!best || cur.capacity_max > best.capacity_max ? cur : best),
    null
  );

const calcMins = (people) => Math.max(1, Math.round(people / 1.5));

function Dashboard() {
  const { preferences, save: savePreferences } = useContext(PreferencesContext);
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveCount, setLiveCount] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingFavorite, setSavingFavorite] = useState(false);

  const favoriteIds = useMemo(
    () => preferences?.favorite_canteen_ids ?? [],
    [preferences]
  );

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/canteens");
      setCanteens(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      setError(err.message ?? "Failed to load canteens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const best = pickBestChoice(canteens);

  useEffect(() => {
    if (!best?.id) return;
    api
      .get(`/canteens/${best.id}/history`, { params: { limit: 1 } })
      .then((res) => {
        const latest = res.data?.data?.[0];
        if (latest?.head_count != null) setLiveCount(latest.head_count);
      })
      .catch(() => {});
  }, [best?.id]);

  const livePeople = liveCount ?? LIVE_CONFIG.peopleFallback;
  const liveMins = calcMins(livePeople);

  const grid = useMemo(() => {
    if (favoriteIds.length === 0) return canteens;
    return canteens.filter((c) => favoriteIds.includes(c.id));
  }, [canteens, favoriteIds]);

  const gridWithConfig = useMemo(() => {
    let mockSeed = 0;
    return grid.map((canteen) => {
      if (canteen.id === best?.id) {
        return {
          canteen,
          tone: LIVE_CONFIG.tone,
          caption: LIVE_CONFIG.caption,
          histogram: LIVE_CONFIG.histogram,
          activeIndex: LIVE_CONFIG.active,
          mins: liveMins,
          people: livePeople,
        };
      }
      const cfg = MOCK_CONFIGS[mockSeed % MOCK_CONFIGS.length];
      mockSeed += 1;
      return {
        canteen,
        tone: cfg.tone,
        caption: cfg.caption,
        histogram: cfg.histogram,
        activeIndex: cfg.active,
        mins: cfg.mins,
        people: cfg.people,
      };
    });
  }, [grid, best?.id, livePeople, liveMins]);

  const mutateFavorites = async (nextIds) => {
    if (!preferences) throw new Error("Please sign in to save favorites.");
    setSavingFavorite(true);
    try {
      await savePreferences({ favorite_canteen_ids: nextIds });
    } finally {
      setSavingFavorite(false);
    }
  };

  const handleAddFavorite = (canteen) => {
    if (favoriteIds.includes(canteen.id)) return Promise.resolve();
    return mutateFavorites([...favoriteIds, canteen.id]);
  };

  const handleRemoveFavorite = (canteen) =>
    mutateFavorites(favoriteIds.filter((id) => id !== canteen.id));

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-100">
            Loading canteens...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center rounded-2xl bg-rose-50 p-8 text-center">
            <p className="text-sm font-semibold text-rose-600">
              Couldn't load canteens
            </p>
            <p className="mt-1 text-xs text-rose-500">{error}</p>
            <button
              type="button"
              onClick={load}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        ) : canteens.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-100">
            No canteens available.
          </div>
        ) : (
          <>
            <BestChoiceCard
              canteen={best}
              people={livePeople}
              mins={liveMins}
            />

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-800">
                  Campus Canteens
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {gridWithConfig.map(({ canteen, ...props }) => (
                  <CanteenStatCard key={canteen.id} canteen={canteen} {...props} />
                ))}
                <AddFavoriteCard onClick={() => setModalOpen(true)} />
              </div>
            </div>
          </>
        )}
      </div>

      <DashboardRail />

      <AddFavoriteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        canteens={canteens}
        favoriteIds={favoriteIds}
        onAdd={handleAddFavorite}
        onRemove={handleRemoveFavorite}
        saving={savingFavorite}
      />
    </div>
  );
}

export default Dashboard;
