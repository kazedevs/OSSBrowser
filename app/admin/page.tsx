"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Management</h2>
          <div className="space-y-4">
            <Link
              href="/admin/add-project"
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">Add Project</h3>
              <p className="text-gray-600 text-sm">
                Submit a new project to the directory
              </p>
            </Link>

            <Link
              href="/admin/submissions"
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">View Submissions</h3>
              <p className="text-gray-600 text-sm">
                Review and manage project submissions
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
