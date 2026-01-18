import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50/30 text-foreground">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="relative pt-24">
          <header className="pb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-2xl mt-10 md:text-4xl font-bold mb-4 tracking-tight text-slate-900">
              Directory of <span className="text-blue-600">Open Source</span> Projects
            </h1>
            <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed">
              Beautifully curated directory of high-quality open source software. 
              Discover, contribute, and build for the public good.
            </p>
          </header>

          <section className="sticky top-12 z-20 py-8 bg-white/80 backdrop-blur-md mb-12">
            <SearchBar />
          </section>

          {/* Content Section */}
          <section className="pb-32">
            <div className="mb-10 flex items-center justify-between pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <span className="font-bold text-xs text-foreground uppercase tracking-widest">
                  Latest Additions
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-[#64748b] font-mono text-[10px] font-bold">
                  248+
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="font-mono text-[10px] font-bold text-[#64748b] hover:text-blue-600 transition-colors cursor-pointer tracking-wider flex items-center gap-1">
                  FILTER <span className="text-[8px] opacity-50">▼</span>
                </button>
                <button className="font-mono text-[10px] font-bold text-[#64748b] hover:text-blue-600 transition-colors cursor-pointer tracking-wider flex items-center gap-1">
                  SORT <span className="text-[8px] opacity-50">▼</span>
                </button>
              </div>
            </div>
            <ProjectGrid />
          </section>
        </div>
      </div>
    </main>


  );
}


