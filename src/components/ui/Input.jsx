import { cn } from "../../lib/utils";

const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-900",
      className
    )}
    {...props}
  />
);

export default Input;
