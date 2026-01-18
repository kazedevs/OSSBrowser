import {NextRequest, NextResponse} from "next/server";
import { getPool } from "@/lib/db";
import { fetchGitHubProject } from "@/lib/github";
import { slugify } from "@/lib/slug";


export async function POST(req: NextRequest) {
    try {
        const pool = getPool();
        const body = await req.json();
        const { repoUrl } = body;

        if(!repoUrl || typeof repoUrl !== "string") {
            return NextResponse.json(
                {error: "repoUrl is required"},
                {status: 400}
            );
        } 

        //fetch github data
        const project = await fetchGitHubProject(repoUrl);
        const slug = slugify(project.owner, project.repo);

        const result = await pool.query(
            `INSERT INTO projects (
                slug, repo_url, repo_name, owner, description, 
                stars, forks, open_issues, owner_avatar_url, primary_language, 
                last_commit_at, readme_html, website, last_synced_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
            ON CONFLICT (slug) DO NOTHING
            RETURNING id`,
            [
                slug,                       
                project.repoUrl,            
                project.repo,               // (repo_name)
                project.owner,              
                project.description,        
                project.stars,              
                project.forks,              
                project.openIssues,         
                project.owner_avatar_url,   
                project.primaryLanguage,
                project.lastCommitAt,
                project.readmeHtml,
                project.website,
            ]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                {error: "Project already exists"},
                {status: 409}
            );
        }

        return NextResponse.json(result.rows[0], {status: 201});
    } catch(err: any) {
       console.error("Add project error:", err);
       if(err.code == "23505"){
            return NextResponse.json(
                {error: "Project already exists"},
                {status: 409}
            );
       }
       console.log("Add project error:", err);
       return NextResponse.json({
        error: "Failed to add project",
        details: err.message
       }, {status: 500})
    }
}