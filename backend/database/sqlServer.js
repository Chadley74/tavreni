const sql = require("mssql");

/*Read connection settings from environment variables*/
const sqlConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT || 1433),

    option: {
        encrypt: process.env.DB_ENCRYPT !== "false",
        trustServerCertificate: false,
    },

    pool: {
        max: 5,
        min: 0,
        idleTimeoutMillis: 30000,
    },

    connectionTimeout: 30000,
    requestTimeout: 30000,
};

let poolPromise;

/*Create one reusable connection pool and poolPromise prevents a new pool from being created for every request*/
function getPool() {
    if (!poolPromise) {
        poolPromise = new sql.ConnectionPool(sqlConfig).connect().then((pool) => {
            console.log("Connected to Azure SQL Database");
            return pool;
        }).catch((error) => {
            poolPromise = undefined;
            console.error("Azure SQL connection failed:", error.message);
            throw error;
        });
    }

    return poolPromise;
}

/*Allows tests or shutdown logic to close the connection*/
async function closePool() {
    if (!poolPromise) {
        return;
    }

    const pool = await poolPromise;
    await pool.close();
    poolPromise = undefined;
}

module.exports = {
    sql,
    getPool,
    closePool,
};