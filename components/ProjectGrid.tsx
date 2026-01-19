import { Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-12">
      {projects.map((project) => {
        const topLanguages = project.languages 
          ? Object.keys(project.languages).sort((a, b) => (project.languages as any)[b] - (project.languages as any)[a]).slice(0, 3)
          : project.primary_language ? [project.primary_language] : [];

        return (
          <ProjectCard 
            key={project.id} 
            name={project.repo_name}
            description={project.description}
            stars={project.stars}
            languages={topLanguages}
            owner_avatar_url={project.owner_avatar_url}
            slug={project.slug}
          />
        );
      })}
    </div>
  );
}
