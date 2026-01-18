import Link from "next/link";

export default function AdminPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      <ul style={{ marginTop: "1rem" }}>
        <li>
          <Link href="/admin/add-project">Add Project</Link>
        </li>
        <li>
          <Link href="/admin/submissions">View Submissions</Link>
        </li>
      </ul>
    </main>
  );
}