import { getPool } from "./db";
import { redis } from "./redis";

export interface Project {
  id: string;
  owner: string;
  repo_name: string;
  slug: string;
  description: string;
  primary_language: string;
  languages: Record<string, number> | null;
  tags: string[] | null;
  contributors: Array<{login: string, avatar_url: string, html_url: string}> | null;
  stars: number;
  forks: number;
  open_issues: number;
  owner_avatar_url: string;
  website?: string;
  repo_url: string;
  readme_html: string | null;
  last_commit_at?: string;
}

export async function getAllProjects(): Promise<Project[]> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT
        id, slug, repo_url, owner, repo_name, description, primary_language, languages, tags, contributors, stars, forks, open_issues, last_commit_at, owner_avatar_url
        FROM projects
        ORDER BY stars DESC
        LIMIT 100`
  );
  return result.rows;
}

export async function getPaginatedProjects(
  page: number = 1, 
  limit: number = 12,
  sort: string = 'stars',
  language: string = 'all',
  search: string = ''
): Promise<{ projects: Project[], total: number }> {
  const pool = getPool();
  const offset = (page - 1) * limit;

  let whereClauses = [];
  let params: any[] = [];
  
  if (language !== 'all') {
    params.push(language);
    whereClauses.push(`primary_language ILIKE $${params.length}`);
  }

  if (search) {
    params.push(`%${search}%`);
    whereClauses.push(`(repo_name ILIKE $${params.length} OR description ILIKE $${params.length})`);
  }

  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : "";

  let orderBy = "stars DESC";
  if (sort === 'newest') {
    orderBy = "created_at DESC";
  } else if (sort === 'forks') {
    orderBy = "forks DESC";
  }

  const projectsRes = await pool.query(
    `SELECT
        id, slug, repo_url, owner, repo_name, description, primary_language, languages, tags, contributors, stars, forks, open_issues, last_commit_at, owner_avatar_url
        FROM projects
        ${whereClause}
        ORDER BY ${orderBy}
        LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  const countRes = await pool.query(
    `SELECT COUNT(*) FROM projects ${whereClause}`,
    params
  );

  return {
    projects: projectsRes.rows,
    total: parseInt(countRes.rows[0].count, 10)
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const cacheKey = `project:${slug}`;
  
  try {
    const cached = await redis.get<Project>(cacheKey);
    if (cached) return cached;
  } catch (error) {
    console.error("Redis fetch error:", error);
  }

  const pool = getPool();
  const res = await pool.query<Project>(
    `SELECT id, owner, repo_name, slug, description, primary_language, languages, tags, contributors, stars, forks, open_issues, owner_avatar_url, website, repo_url, readme_html, last_commit_at 
     FROM projects 
     WHERE slug = $1 LIMIT 1`,
    [slug]
  );

  if (res.rowCount === 0) return null;

  const project = res.rows[0];

  try {
    await redis.set(cacheKey, project, { ex: 120 }); // 2 minutes cache
  } catch (error) {
    console.error("Redis set error:", error);
  }

  return project;
}
