const TONE = {
  success: { bg: "bg-emerald-100", text: "text-emerald-600", dot: "bg-emerald-500" },
  danger: { bg: "bg-rose-100", text: "text-rose-600", dot: "bg-rose-500" },
  warning: { bg: "bg-amber-100", text: "text-amber-600", dot: "bg-amber-500" },
  neutral: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-500" },
};

function StatusPill({ tone = "success", children, dot = false, className = "" }) {
  const t = TONE[tone] ?? TONE.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${t.bg} ${t.text} ${className}`}
    >
      {dot ? <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} /> : null}
      {children}
    </span>
  );
}

export default StatusPill;
