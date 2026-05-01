function Toggle({ value, onChange, accent = "navy" }) {
  const trackOn = accent === "emerald" ? "bg-emerald-500" : "bg-brand-900";
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        value ? trackOn : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          value ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default Toggle;
