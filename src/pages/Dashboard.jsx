import { useEffect, useState } from "react";

import api from "../lib/api";
import CanteenCard from "../components/CanteenCard";

function Dashboard() {
  const [canteens, setCanteens] = useState([]);

  useEffect(() => {
    const fetchCanteens = async () => {
      const { data } = await api.get("/canteens");
      setCanteens(data);
    };

    fetchCanteens();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {canteens.map((canteen) => (
        <CanteenCard key={canteen.id} canteen={canteen} />
      ))}
    </div>
  );
}

export default Dashboard;
