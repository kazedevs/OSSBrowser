import { getPool } from '@/lib/db';
import { fetchGitHubProject } from '@/lib/github';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if(!auth || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const pool = getPool();
  const client = await pool.connect();
  const BATCH_SIZE = Number(process.env.CRON_BATCH_SIZE ?? 10);

  try {
    const res = await client.query(
      `SELECT id, repo_url FROM projects WHERE last_synced_at IS NULL OR last_synced_at < NOW() - INTERVAL '1 day' ORDER BY last_synced_at NULLS FIRST LIMIT $1`,
      [BATCH_SIZE]
    );

    for(const row of res.rows){
      try {
        const project = await fetchGitHubProject(row.repo_url);
        
        await client.query(
          `UPDATE projects SET
            stars = $1,
            forks = $2,
            open_issues = $3,
            last_commit_at = $4,
            languages = $5::jsonb,
            tags = $6,
            contributors = $7::jsonb,
            readme_html = COALESCE($8, readme_html),
            website = $9,
            last_synced_at = NOW()
            WHERE id = $10`,
            [
              project.stars,
              project.forks,
              project.openIssues,
              project.lastCommitAt,
              JSON.stringify(project.languages ?? {}),
              project.tags ?? [],
              JSON.stringify(project.contributors ?? []),
              project.readmeHtml,
              project.website,
              row.id
            ]
        )
      } catch (repoError: any) {
        console.error(`Failed to sync project ${row.repo_url}:`, repoError);
      }
    }

    return NextResponse.json({
      synced: res.rows.length
    });
  } catch (err: any) {
    console.error("Cron sync error:", err);
    return NextResponse.json(
      { error: err.message }, 
      {status: 500}
    );
  } finally {
    client.release();
  }
}
