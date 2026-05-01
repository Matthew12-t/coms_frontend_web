import { useParams } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { fetchCanteen, fetchCanteenHistory } from "../services/canteenService";
import { fetchMenusByCanteen } from "../services/menuService";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import NotifyMeButton from "../components/notifications/NotifyMeButton";
import MenuCatalog from "../components/menu/MenuCatalog";
import { densityTone } from "../lib/utils";

function CanteenDetail() {
  const { id } = useParams();

  const { data: canteen, loading } = useFetch(() => fetchCanteen(id), [id]);
  const { data: history } = useFetch(() => fetchCanteenHistory(id, 24), [id]);
  const { data: menus } = useFetch(() => fetchMenusByCanteen(id), [id]);

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading...</div>;
  }
  if (!canteen) {
    return <div className="p-6 text-sm text-slate-500">Canteen not found</div>;
  }

  const latest = history?.[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{canteen.name}</CardTitle>
              <CardDescription>{canteen.description}</CardDescription>
            </div>
            {latest && <Badge tone={densityTone(latest.density_level)}>{latest.density_level}</Badge>}
          </div>
        </CardHeader>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-500">Capacity</p>
            <p className="font-semibold text-slate-900">{canteen.capacity}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Live count</p>
            <p className="font-semibold text-slate-900">{latest?.head_count ?? 0}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Last update</p>
            <p className="font-semibold text-slate-900">
              {latest ? new Date(latest.created_at).toLocaleTimeString() : "-"}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <NotifyMeButton canteenId={canteen.id} canteenName={canteen.name} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's menu</CardTitle>
          <CardDescription>What's available right now</CardDescription>
        </CardHeader>
        <MenuCatalog menus={menus || []} />
      </Card>
    </div>
  );
}

export default CanteenDetail;
