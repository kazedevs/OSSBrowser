import { getAllProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default async function ProjectGrid() {
  const projects = await getAllProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-12">
      {projects.map((project: any) => (
        <ProjectCard 
          key={project.id} 
          name={project.repo_name}
          description={project.description}
          stars={project.stars}
          tech={project.primary_language ? [project.primary_language] : []}
          owner_avatar_url={project.owner_avatar_url}
        />
      ))}
    </div>
  );
}
