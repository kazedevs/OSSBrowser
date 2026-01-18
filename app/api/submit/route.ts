import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoUrl, email, website } = body;

    //validate required field
    if (!repoUrl || typeof repoUrl !== "string") {
      return NextResponse.json(
        { message: "repoUrl is required" },
        { status: 400 }
      );
    }

    //validate GitHub URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(repoUrl);
    } catch {
      return NextResponse.json(
        { message: "Invalid repository URL" },
        { status: 400 }
      );
    }

    if (parsedUrl.hostname !== "github.com") {
      return NextResponse.json(
        { message: "Only GitHub repositories are supported" },
        { status: 400 }
      );
    }

    const pool = getPool();

    const existing = await pool.query(
      `SELECT id FROM submissions WHERE repo_url = $1 LIMIT 1`,
      [repoUrl]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: "This repository is already submitted" },
        { status: 409 }
      );
    }

    await pool.query(
      `
      INSERT INTO submissions (
        repo_url,
        submitted_email,
        submitted_website,
        status
      )
      VALUES ($1, $2, $3, 'pending')
      `,
      [
        repoUrl,
        email || null,
        website || null,
      ]
    );

    return NextResponse.json({
      message: "Project submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting project:", error);
    return NextResponse.json(
      { message: "Failed to submit project" },
      { status: 500 }
    );
  }
}