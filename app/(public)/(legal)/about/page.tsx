import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | OSSBrowser",
  description: "Learn more about OSSBrowser and our mission to curate the best open source projects.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-32">
        <header className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            About <span className="text-blue-600 font-sans">oss/browser</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed font-normal">
            We are on a mission to organize the world&apos;s open source software and make it accessible to everyone.
          </p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Our Vision</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                GitHub is home to over 100 million repositories, but finding high-quality, maintained, and truly impactful projects is becoming increasingly difficult. The "noise" often drowns out the "signal."
              </p>
              <p className="text-slate-600 leading-relaxed">
                OSSBrowser was built to solve this. We curate a directory of high-quality open source projects, focusing on design, documentation, and community health. We want to help developers find their next big contribution or the perfect tool for their next project.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Curation Standards</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                Not every project makes it into our directory. We look for:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><span className="font-medium text-slate-900">Exceptional Design:</span> Tools that value user experience and aesthetics.</li>
                <li><span className="font-medium text-slate-900">Active Maintenance:</span> Projects that are regularly updated and have responsive maintainers.</li>
                <li><span className="font-medium text-slate-900">Solid Documentation:</span> Clear instructions that make it easy to get started.</li>
                <li><span className="font-medium text-slate-900">Community Value:</span> Projects that solve real problems for the community.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Open Source</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                In the spirit of the projects we feature, OSSBrowser itself is a living project. We believe in building in public and contributing back to the ecosystem that empowers us all.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
