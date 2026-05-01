import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import api from "../lib/api";
import BestChoiceCard from "../components/dashboard/BestChoiceCard";
import CanteenStatCard from "../components/dashboard/CanteenStatCard";
import AddFavoriteCard from "../components/dashboard/AddFavoriteCard";
import DashboardRail from "../components/dashboard/DashboardRail";

const TONES = ["danger", "neutral", "success"];
const HISTOGRAMS = [
  { values: [22, 30, 70, 40, 18], active: 2 },
  { values: [55, 65, 90, 70, 60], active: 2 },
  { values: [10, 18, 35, 22, 12], active: 2 },
];
const CAPTIONS = ["Live Now", "Peak Now", "Moderate"];

const pickBestChoice = (canteens) =>
  canteens.reduce(
    (best, cur) =>
      !best || cur.capacity_max > best.capacity_max ? cur : best,
    null
  );

function Dashboard() {
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/canteens");
      const list = Array.isArray(response.data?.data) ? response.data.data : [];
      setCanteens(list);
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
  const others = best ? canteens.filter((c) => c.id !== best.id) : canteens;

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
            <BestChoiceCard canteen={best} />

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-800">
                  Campus Canteens
                </h2>
                <button className="text-xs font-semibold text-brand-700 hover:text-brand-900">
                  View all density map →
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {others.map((canteen, index) => (
                  <CanteenStatCard
                    key={canteen.id}
                    canteen={canteen}
                    tone={TONES[index % TONES.length]}
                    caption={CAPTIONS[index % CAPTIONS.length]}
                    histogram={HISTOGRAMS[index % HISTOGRAMS.length].values}
                    activeIndex={HISTOGRAMS[index % HISTOGRAMS.length].active}
                    mins={8 + index * 2}
                  />
                ))}
                <AddFavoriteCard />
              </div>
            </div>
          </>
        )}
      </div>

      <DashboardRail />
    </div>
  );
}

export default Dashboard;
