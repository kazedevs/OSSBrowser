import SearchBar from "@/components/SearchBar";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectFilters from "@/components/ProjectFilters";
import { getPaginatedProjects } from "@/lib/projects";
import { Suspense } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Home(props: {
  searchParams: Promise<{ page?: string; sort?: string; language?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams.page || "1", 10);
  const sort = searchParams.sort || "stars";
  const language = searchParams.language || "all";
  const query = searchParams.q || "";
  const limit = 30;
  
  const { projects, total } = await getPaginatedProjects(currentPage, limit, sort, language, query);
  const totalPages = Math.ceil(total / limit);

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (sort !== "stars") params.set("sort", sort);
    if (language !== "all") params.set("language", language);
    if (query) params.set("q", query);
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <main className="min-h-screen bg-gray-50/30 text-foreground">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="relative pt-24">
          <header className="pb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-2xl mt-10 md:text-4xl font-bold mb-4 tracking-tight text-slate-900">
              Directory of <span className="text-blue-600">Open Source</span> Projects
            </h1>
            <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed font-normal">
              Beautifully curated directory of high-quality open source software. 
              Discover, contribute, and build for the public good.
            </p>
          </header>

          <section className="sticky top-12 z-20 py-8 bg-white/80 backdrop-blur-md mb-12">
            <Suspense fallback={<div className="h-14 w-full max-w-2xl mx-auto bg-gray-50 animate-pulse rounded-xl" />}>
              <SearchBar />
            </Suspense>
          </section>

          {/* Content Section */}
          <section className="pb-32">
            <div className="mb-10 flex items-center justify-between pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <span className="font-normal text-xs text-foreground uppercase tracking-widest">
                  {query ? `Search: "${query}"` : language === 'all' ? 'Latest Additions' : `${language.charAt(0).toUpperCase() + language.slice(1)} Projects`}
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-[#64748b] font-sans text-[10px] font-normal">
                  {total}+
                </span>
              </div>
              
              <Suspense fallback={<div className="h-8 w-24 bg-gray-100 animate-pulse rounded" />}>
                <ProjectFilters />
              </Suspense>
            </div>
            
            <ProjectGrid projects={projects} />

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {currentPage > 1 ? (
                        <PaginationPrevious href={buildUrl(currentPage - 1)} />
                      ) : (
                        <span className="opacity-50 cursor-not-allowed flex items-center gap-1 px-2.5 text-sm font-normal text-[#64748b]">
                          Previous
                        </span>
                      )}
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink 
                          href={buildUrl(p)} 
                          isActive={p === currentPage}
                          className="font-normal"
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      {currentPage < totalPages ? (
                        <PaginationNext href={buildUrl(currentPage + 1)} />
                      ) : (
                        <span className="opacity-50 cursor-not-allowed flex items-center gap-1 px-2.5 text-sm font-normal text-[#64748b]">
                          Next
                        </span>
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
