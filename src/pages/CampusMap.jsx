import InteractiveMap from "../components/maps/InteractiveMap";
import CanteenDetailRail from "../components/maps/CanteenDetailRail";

function CampusMap() {
  return (
    <div className="grid h-full grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
      <InteractiveMap />
      <CanteenDetailRail />
    </div>
  );
}

export default CampusMap;
