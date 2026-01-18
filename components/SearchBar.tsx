"use client";

import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <FiSearch className="text-[#94a3b8] size-4 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Browse for projects..."
        className="w-full bg-white border border-border-subtle rounded-xl py-3.5 pl-12 pr-5 text-sm text-foreground placeholder:text-[#94a3b8] outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-none"
      />
    </div>

  );
}

