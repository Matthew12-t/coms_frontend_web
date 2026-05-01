import { cn } from "../../lib/utils";

const Label = ({ className, ...props }) => (
  <label
    className={cn("block text-xs font-semibold text-slate-700", className)}
    {...props}
  />
);

export default Label;
