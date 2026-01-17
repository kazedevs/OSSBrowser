
import { Pool } from "pg";

const globalForPool = global as unknown as {
    pgPool?: Pool;
};

export const pool = globalForPool.pgPool ?? new Pool({
    connectionString: process.env.DB_URL!,
    ssl: {
        rejectUnauthorized: false,
    },
});

if (process.env.NODE_ENV !== "production") {
    globalForPool.pgPool = pool;
}

