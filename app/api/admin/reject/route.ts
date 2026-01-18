
import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(req: NextRequest) {
    const pool = getPool();
    const client = await pool.connect();

    try {
        const {submissionId} = await req.json();

        if (!submissionId) {
            return NextResponse.json(
                {message: "submissionId is required"},
                {status: 400}
            )
        }

        await client.query("BEGIN");

        const res = await client.query(
            `UPDATE submissions SET status = 'rejected' WHERE id = $1 AND status = 'pending'`,
            [submissionId]
        );

        if(res.rowCount === 0){
            await client.query("ROLLBACK");
            return NextResponse.json(
                {message: "Submission not found or already processed"},
                {status: 404}
            )
        }

        await client.query("COMMIT");
        return NextResponse.json({message: "Submission rejected successfully"});
    } catch (err: any) {
        await client.query("ROLLBACK");
        return NextResponse.json(
            {message: err.message || "Failed to reject submission"},
            {status: 500}
        )
    } finally {
        client.release();
    }
}
