import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { fetchGitHubProject } from "@/lib/github";
import { slugify } from "@/lib/slug";

export async function POST(req: NextRequest) {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const { submissionId } = await req.json();

    if (!submissionId) {
      return NextResponse.json(
        { message: "submissionId is required" },
        { status: 400 }
      );
    }

    await client.query("BEGIN");

    // fetch submission
    const submissionResponse = await client.query(
      `SELECT * FROM submissions WHERE id = $1 AND status = 'pending' FOR UPDATE`,
      [submissionId]
    );

    if ((submissionResponse.rowCount ?? 0) === 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { message: "Submission not found or already processed" },
        { status: 404 }
      );
    }

    const submission = submissionResponse.rows[0];

    // prevent duplicate project
    const existingProject = await client.query(
      `SELECT id FROM projects WHERE repo_url = $1 LIMIT 1`,
      [submission.repo_url]
    );

    if ((existingProject.rowCount ?? 0) > 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { message: "Project already exists" },
        { status: 409 }
      );
    }

    // fetch github data
    const project = await fetchGitHubProject(submission.repo_url);

    const slug = slugify(project.owner, project.repo);

    // insert project with extended columns
await client.query(
  `
  INSERT INTO projects (
    repo_url,
    owner,
    repo_name,
    slug,
    description,
    primary_language,
    stars,
    forks,
    open_issues,
    last_commit_at,
    languages,
    readme_html,
    tags,
    contributors,
    owner_avatar_url,
    website,
    last_synced_at
  )
  VALUES (
    $1, $2, $3, $4,
    $5, $6, $7, $8,
    $9, $10, $11,
    $12, $13, $14,
    $15, $16, NOW()
  )
  `,
  [
    project.repoUrl,
    project.owner,
    project.repo,
    slug,
    project.description,
    project.primaryLanguage,
    project.stars,
    project.forks,
    project.openIssues,
    project.lastCommitAt,
    JSON.stringify(project.languages ?? {}),
    project.readmeHtml,
    JSON.stringify(project.tags ?? []),
    JSON.stringify(project.contributors ?? []),
    project.owner_avatar_url,
    project.website,
  ]
);

    // mark submission as approved
    await client.query(
      `UPDATE submissions SET status = 'approved' WHERE id = $1`,
      [submissionId]
    );

    await client.query("COMMIT");

    return NextResponse.json({
      message: "Project approved and published",
      slug
    });
  } catch (error: any) {
    if (client) await client.query("ROLLBACK");
    console.error("Approve error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to approve submission" },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}