"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto group">
      <button 
        type="submit" 
        className="absolute inset-y-0 left-4 flex items-center hover:text-blue-500 transition-colors"
      >
        <FiSearch className="text-[#94a3b8] size-4 group-focus-within:text-blue-500 transition-colors" />
      </button>
      <input
        type="text"
        placeholder="Browse for projects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white border border-border-subtle rounded-xl py-3.5 pl-12 pr-5 text-sm text-foreground placeholder:text-[#94a3b8] outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-none"
      />
    </form>
  );
}

