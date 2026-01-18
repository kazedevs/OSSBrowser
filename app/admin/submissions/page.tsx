"use client";

import { useState, useEffect } from "react";

interface Submission {
  id: number;
  repo_url: string;
  submitted_email: string;
  submitted_website: string;
  status: string;
  created_at: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [actionType, setActionType] = useState<string>("");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    setActionType("approve");
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: id })
      });

      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Approval failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setActionLoading(null);
      setActionType("");
    }
  };

  const handleReject = async (id: number) => {
    setActionLoading(id);
    setActionType("reject");
    try {
      const res = await fetch("/api/admin/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: id })
      });

      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Rejection failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setActionLoading(null);
      setActionType("");
    }
  };

  if (loading) {
    return <div className="p-8">Loading submissions...</div>;
  }

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Pending Submissions</h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No pending submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold">Repo URL</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Website</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">From</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <a
                      href={sub.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {sub.repo_url}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {sub.submitted_website || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {sub.submitted_email || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-gray-200 rounded capitalize">
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleApprove(sub.id)}
                        disabled={actionLoading === sub.id}
                        className="px-4 py-2 text-black border text-xs font-semibold rounded hover:text-white disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {actionLoading === sub.id && actionType === "approve" ? "Approving..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleReject(sub.id)}
                        disabled={actionLoading === sub.id}
                        className="px-4 py-2 text-black border text-xs font-semibold rounded disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {actionLoading === sub.id && actionType === "reject" ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}