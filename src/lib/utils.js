export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const formatNumber = (value) =>
  typeof value === "number" ? value.toLocaleString() : "0";

export const formatRelativeTime = (iso) => {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const densityTone = (level) => {
  switch (level) {
    case "low":
      return "success";
    case "moderate":
      return "warning";
    case "peak":
      return "danger";
    default:
      return "neutral";
  }
};
