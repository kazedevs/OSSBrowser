import { getPool } from "./db";

export async function getAllProjects() {
  const pool = getPool();
  const result = await pool.query(
    `SELECT
        id, slug, repo_url, owner, repo_name, description, primary_language, stars, forks, open_issues, last_commit_at, owner_avatar_url
        FROM projects
        ORDER BY stars DESC
        LIMIT 100`
  );
  return result.rows;
}
