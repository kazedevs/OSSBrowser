import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import ProjectHeader from "@/components/ProjectHeader";
import ReadmeContent from "@/components/ReadmeContent";

export default async function ProjectPage({params}: {params: Promise<{slug: string}>}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if(!project){
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-32">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors mb-6 uppercase tracking-widest">
                    <FiArrowLeft /> Back to directory
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
                    <div className="flex flex-col gap-4 min-w-0">
                        <ProjectHeader 
                            owner={project.owner}
                            repo_name={project.repo_name}
                            owner_avatar_url={project.owner_avatar_url}
                            description={project.description}
                            stars={project.stars}
                            forks={project.forks}
                            open_issues={project.open_issues}
                            last_commit_at={project.last_commit_at}
                            website={project.website}
                            repo_url={project.repo_url}
                        />
                        <h2 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest mt-2">Readme</h2>
                        <ReadmeContent html={project.readme_html} />
                    </div>

                    {/* Right Column: Meta Info */}
                    <aside className="flex flex-col gap-10 lg:sticky lg:top-32">
                        {/* Languages */}
                        {project.languages && Object.keys(project.languages).length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest mb-4">Languages</h3>
                                <div className="flex flex-col gap-3">
                                    {Object.entries(project.languages)
                                        .sort(([, a], [, b]) => b - a)
                                        .slice(0, 6)
                                        .map(([name, bytes]) => {
                                            const total = Object.values(project.languages!).reduce((acc, curr) => acc + curr, 0);
                                            const percentage = ((bytes / total) * 100).toFixed(1);
                                            return (
                                                <div key={name} className="flex flex-col gap-1.5">
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="font-normal text-slate-700">{name}</span>
                                                        <span className="font-sans text-slate-400 font-normal">{percentage}%</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-blue-600/60 rounded-full" 
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </section>
                        )}

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 text-[10px] font-normal bg-slate-50 text-slate-600 border border-slate-200 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Contributors */}
                        {project.contributors && project.contributors.length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest mb-4">Contributors</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.contributors.map(c => (
                                        <a 
                                            key={c.login} 
                                            href={c.html_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            title={c.login}
                                        >
                                            <img 
                                                src={c.avatar_url} 
                                                alt={c.login} 
                                                className="size-8 rounded-full border border-border-subtle shadow-sm"
                                            />
                                        </a>
                                    ))}
                                </div>
                                <h3 className="text-[10px] font-normal text-slate-400 uppercase tracking-widest mt-2">Many more...</h3>
                            </section>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    )
}