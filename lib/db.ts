
import { Pool } from "pg";

const globalForPool = global as unknown as {
    pgPool?: Pool;
};

export const getPool = () => {
    if (!globalForPool.pgPool) {
        globalForPool.pgPool = new Pool({
            connectionString: process.env.DB_URL!,
            ssl: {
                rejectUnauthorized: false,
            },
        });
    }
    return globalForPool.pgPool;
};


