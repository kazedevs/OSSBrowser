import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OSSBrowser",
  description: "Learn how OSSBrowser handles your data and protects your privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-32">
        <header className="mb-16 pb-12 border-b border-slate-100">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-500 font-normal">Last updated: January 19, 2026</p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">1. Introduction</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                At OSSBrowser, we respect your privacy. This policy explains what information we collect, how we use it, and what choices you have. As a directory of public open-source projects, our data collection is minimal and focused on providing a better discovery experience.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">2. Data We Collect</h2>
            <div className="prose prose-slate max-w-none space-y-4">
              <p className="text-slate-600 leading-relaxed">
                <span className="font-medium text-slate-900 block mb-1">Public Project Data:</span>
                We collect public data from GitHub (stars, forks, descriptions, languages) to display project information. This is information that is already public on GitHub.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <span className="font-medium text-slate-900 block mb-1">User Submissions:</span>
                If you submit a project, we collect the repository URL and any optional information you provide to process your submission.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <span className="font-medium text-slate-900 block mb-1">Analytics:</span>
                We may use minimal, privacy-focused analytics to understand how our site is used. We do not track individual users across the web.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">3. Data Usage</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                We use the data collected to maintain the directory, facilitate project discovery, and improve our services. We do not sell your personal data to third parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">4. Third-Party Services</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                We use GitHub's API to fetch project data. Your use of GitHub is governed by their privacy policy.
              </p>
            </div>
          </section>

          <section className="pt-12 border-t border-slate-100">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Contact</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@ossbrowser.com.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}