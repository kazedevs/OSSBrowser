"use client";

import { FormEvent, useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function SubmitForm() {
    const [repoUrl, setRepoUrl] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
        
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoUrl,
                    email,
                    website
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Submission failed");
            }

            setSuccess(true);
            setRepoUrl("");
            setEmail("");
            setWebsite("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-lg">
            <div className="mb-10 text-left">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Submit an project on oss/browser</h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Share an open-source project with the community. 
                    Submissions are reviewed manually before being added.
                </p>
            </div>

            {success ? (
                <div className="text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300 py-12">
                    <div className="size-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl"><FiCheck /></div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 mb-1">Received!</h2>
                        <p className="text-slate-500 text-sm">Thank you for contributing. We'll review your project soon.</p>
                    </div>
                    <button 
                        onClick={() => setSuccess(false)}
                        className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors cursor-pointer"
                    >
                        Submit another
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Repository URL *</label>
                        <input 
                            type="url" 
                            value={repoUrl} 
                            onChange={(e) => setRepoUrl(e.target.value)} 
                            placeholder="https://github.com/username/repo" 
                            required
                            className="w-full bg-white border border-border-subtle rounded-xl py-3.5 px-4 text-sm text-foreground outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Your Email *</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="maintainer@example.com" 
                            required
                            className="w-full bg-white border border-border-subtle rounded-xl py-3.5 px-4 text-sm text-foreground outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Project Website (Optional)</label>
                        <input 
                            type="text" 
                            value={website} 
                            onChange={(e) => setWebsite(e.target.value)} 
                            placeholder="https://project-site.com" 
                            className="w-full bg-white border border-border-subtle rounded-xl py-3.5 px-4 text-sm text-foreground outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                        />
                    </div>

                    {error && (
                        <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl">
                            <p className="text-xs text-red-600 font-medium text-center">{error}</p>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? "SUBMITTING..." : "SUBMIT PROJECT"}
                    </button>
                </form>
            )}
        </div>
    );
}
