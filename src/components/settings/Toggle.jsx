function Toggle({ value, onChange, accent = "navy", label }) {
  const trackOn = accent === "emerald" ? "bg-emerald-500" : "bg-brand-900";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        value ? trackOn : "bg-slate-300"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none ml-0.5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default Toggle;
