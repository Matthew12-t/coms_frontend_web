import { cn } from "../../lib/utils";

const TONES = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
  neutral: "bg-slate-100 text-slate-700",
};

const Badge = ({ tone = "neutral", className, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
      TONES[tone],
      className
    )}
    {...props}
  />
);

export default Badge;
