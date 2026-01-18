import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const submissions = await pool.query(
      `SELECT * FROM submissions WHERE status = 'pending' ORDER BY created_at DESC`
    );

    return NextResponse.json(submissions.rows);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { message: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
