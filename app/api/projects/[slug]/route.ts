
import {NextRequest, NextResponse} from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req: NextRequest, {params}: {params: {slug: string}}){
    const {slug} = params;
    const pool = getPool();

    const result = await pool.query(
        `SELECT *
        FROM PROJECTS
        WHERE SLUG = $1
        AND status = 'published'
        LIMIT 1`,
        [slug]
    );

    if(result.rows.length === 0){
        return NextResponse.json(
            {error: "Project not found"},
            {status: 404}
        )
    }

    return NextResponse.json(result.rows[0], {status: 200})
}