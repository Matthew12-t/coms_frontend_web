import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppShell() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Topbar search={search} onSearchChange={setSearch} />
        <main className="flex-1 overflow-y-auto bg-canvas px-8 py-6">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}

export default AppShell;
