"use client"

import { useState, FormEvent, ChangeEvent } from "react";

export default function AddProjectPage() {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const res = await fetch("/api/admin/add-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoUrl
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to add project");
            }

            setMessage(`Project added successfully with ID: ${data.id}`);
            setRepoUrl("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Project</h1>
            <p className="text-gray-600 mb-8 text-sm">Enter GitHub repository URL directly to add it to the directory.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Repository URL</label>
                    <input
                        type="url"
                        value={repoUrl}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/username/repo"
                        required
                        className="w-full p-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                </div>
                
                <button 
                    id="submit-project-btn"
                    type="submit" 
                    disabled={loading}
                    className="w-full p-3 text-black border font-bold text-xs uppercase rounded disabled:bg-gray-400 cursor-pointer"
                >
                    {loading ? "SUBMITTING..." : "SUBMIT PROJECT"}
                </button>
            </form>

            {message && (
                <div id="success-message" className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 text-xs rounded">
                    <strong>Success:</strong> {message}
                </div>
            )}

            {error && (
                <div id="error-message" className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 text-xs rounded">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
                <a href="/admin/submissions" className="text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase">
                    View Submissions →
                </a>
            </div>
        </main>
    );

}