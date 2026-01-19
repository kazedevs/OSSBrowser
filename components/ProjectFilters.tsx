"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "stars";
  const currentLanguage = searchParams.get("language") || "all";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select 
        value={currentLanguage} 
        onValueChange={(val) => updateFilters("language", val)}
      >
        <SelectTrigger className="h-9 w-fit min-w-[100px] text-[10px] font-normal text-[#64748b] uppercase tracking-wider bg-transparent hover:bg-gray-100/50 border-none shadow-none px-3 py-0 transition-all cursor-pointer">
          <SelectValue placeholder="FILTER" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="all">All Languages</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="go">Go</SelectItem>
          <SelectItem value="rust">Rust</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-px h-4 bg-border/60 mx-1" />

      <Select 
        value={currentSort} 
        onValueChange={(val) => updateFilters("sort", val)}
      >
        <SelectTrigger className="h-9 w-fit min-w-[80px] text-[10px] font-normal text-[#64748b] uppercase tracking-wider bg-transparent hover:bg-gray-100/50 border-none shadow-none px-3 py-0 transition-all cursor-pointer">
          <SelectValue placeholder="SORT" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="stars">Most Stars</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="forks">Most Forks</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
