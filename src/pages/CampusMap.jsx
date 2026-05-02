import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import InteractiveMap from "../components/maps/InteractiveMap";
import CanteenDetailRail from "../components/maps/CanteenDetailRail";

function CampusMap() {
  const { search, setSearch } = useOutletContext();
  const [activeId, setActiveId] = useState("borju");

  const handleSelect = (id) => {
    setActiveId(id);
    setSearch("");
  };

  return (
    <div className="grid h-full grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
      <InteractiveMap activeId={activeId} search={search} onSelect={handleSelect} />
      <CanteenDetailRail activeId={activeId} />
    </div>
  );
}

export default CampusMap;
