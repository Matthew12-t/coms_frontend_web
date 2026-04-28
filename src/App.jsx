import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          C.O.M.S Admin Dashboard
        </h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
