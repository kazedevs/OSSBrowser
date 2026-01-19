import { FiAlertCircle, FiClock } from "react-icons/fi";
import { GoStar, GoRepoForked } from "react-icons/go";
import { ImGithub } from "react-icons/im";
import { CiGlobe } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectHeaderProps {
  owner: string;
  repo_name: string;
  owner_avatar_url: string;
  description: string;
  stars: number;
  forks: number;
  last_commit_at?: string;
  open_issues: number;
  website?: string;
  repo_url: string;
}

export default function ProjectHeader({
  owner,
  repo_name,
  owner_avatar_url,
  description,
  stars,
  forks,
  last_commit_at,
  open_issues,
  website,
  repo_url
}: ProjectHeaderProps) {
  const formattedDate = last_commit_at 
    ? new Date(last_commit_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <header className="border-b border-border-subtle pb-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-5">
          <Avatar className="size-14 border border-border-subtle">
            <AvatarImage src={owner_avatar_url} alt={owner} />
            <AvatarFallback className="font-bold text-sm tracking-tight">{owner.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{owner}</span>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{repo_name}</h1>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed max-w-3xl font-normal">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-border-subtle">
            <GoStar className="text-amber-400 size-4" />
            <span className="font-sans text-xs font-normal text-slate-700">{(stars / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-border-subtle">
            <GoRepoForked className="text-slate-400 size-4" />
            <span className="font-sans text-xs font-normal text-slate-700">{forks.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-border-subtle">
            <FiAlertCircle className="text-slate-400 size-4" />
            <span className="font-sans text-xs font-normal text-slate-700">{open_issues.toLocaleString()}</span>
          </div>
          
          {formattedDate && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-border-subtle">
              <FiClock className="text-slate-400 size-4" />
              <span className="font-sans text-xs font-normal text-slate-700 whitespace-nowrap">Last commit: {formattedDate}</span>
            </div>
          )}
          
          <div className="h-4 w-px bg-slate-200 mx-2" />

          {website && (
            <a 
              href={website}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xl font-bold transition-colors uppercase tracking-wider"
            >
              <CiGlobe />
            </a>
          )}
          <a 
            href={repo_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider"
          >
            <ImGithub />
          </a>
        </div>
      </div>
    </header>
  );
}
