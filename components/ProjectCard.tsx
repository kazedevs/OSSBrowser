"use client";

import { GoStar } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ProjectCardProps {
  name: string;
  description: string;
  stars: number;
  languages: string[];
  owner_avatar_url?: string;
  slug: string;
}

export default function ProjectCard({ name, description, stars, languages, owner_avatar_url, slug }: ProjectCardProps) {
  return (
    <Link 
      href={`/projects/${slug}`}
      target="_blank"
      >
    <div className="group relative bg-white border border-border-subtle p-5 transition-all duration-300 flex flex-col gap-4 rounded-xl cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 border border-border-subtle">
            <AvatarImage src={owner_avatar_url} alt={name} />
            <AvatarFallback className="text-[10px] font-bold">{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1 border border-border-subtle px-2 py-1 rounded-lg bg-gray-50/50">
          <GoStar className="text-amber-400 size-3" />
          <span className="font-mono text-[10px] font-bold text-foreground">{(stars / 1000).toFixed(1)}k</span>
        </div>
      </div>
      
      <p className="text-sm text-[#475569] leading-relaxed line-clamp-2 group-hover:text-blue-500/80 transition-colors">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {languages.map((t) => (
          <span key={t} className="font-mono text-[9px] px-2 py-0.5 border border-border-subtle text-[#64748b] rounded-md bg-white group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
            {t}
          </span>
        ))}
      </div>
    </div>
    </Link>
  );
}


