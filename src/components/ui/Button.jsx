import { cn } from "../../lib/utils";

const VARIANTS = {
  primary: "bg-slate-900 text-white hover:bg-slate-800",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = ({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:opacity-50",
      VARIANTS[variant],
      SIZES[size],
      className
    )}
    {...props}
  />
);

export default Button;
