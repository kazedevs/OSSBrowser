
import {NextRequest, NextResponse} from "next/server";
import { pool } from "@/lib/db";
import { fetchGitHubProject } from "@/lib/github";

function slugify(owner: string, repo: string){
    return `${owner}-${repo}`
    .toLowerCase().replace(/[^a-z0-9]/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

export async function POST(req: NextRequest) {
    try {
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
                stars, forks, open_issues, primary_language, 
                last_commit_at, readme_html, status, 
                created_at, updated_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
            ON CONFLICT (slug) DO NOTHING
            RETURNING id`,
            [
                slug,                   
                project.repoUrl,        
                project.repo,           // (repo_name)
                project.owner,          
                project.description,    
                project.stars,          
                project.forks,          
                project.openIssues,     
                project.primaryLanguage,
                project.lastCommitAt,   
                project.readmeHtml,     
                project.status,         
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