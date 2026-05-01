function SectionLabel({ children, className = "" }) {
  return (
    <p
      className={`text-[11px] font-semibold tracking-[2px] text-slate-400 ${className}`}
    >
      {children}
    </p>
  );
}

export default SectionLabel;
