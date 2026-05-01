import { Search } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Search canteen..." }) {
  return (
    <label className="flex w-full max-w-md items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm ring-1 ring-slate-100">
      <Search size={16} className="text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
    </label>
  );
}

export default SearchBar;
