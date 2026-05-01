import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import AppShell from "./components/layout/AppShell";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import CampusMap from "./pages/CampusMap";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CanteenDetail from "./pages/CanteenDetail";

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell />}>
                <Route index element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="campus-map" element={<CampusMap />} />
                <Route path="canteens/:id" element={<CanteenDetail />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;
