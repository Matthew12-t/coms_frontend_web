import { cn } from "../../lib/utils";

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100",
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("mb-4 space-y-1", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-base font-bold text-slate-900", className)} {...props} />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-xs text-slate-500", className)} {...props} />
);
