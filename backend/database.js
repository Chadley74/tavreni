const sqlite3 = require("sqlite3").verbose();

const databasePath = process.env.NODE_ENV === "test" ? "./tavreni.test.db" : "./tavreni.db";


const db = new sqlite3.Database(databasePath, (error) => {
    if (error) {
        console.error("Unable to connect to the database:", error.message);
    } else {
        console.log(`Connected to the database: ${databasePath}`);
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL,
    status TEXT NOT NULL,
    dueDate TEXT,
    dateCreated TEXT NOT NULL
    )`, (error) => {
        if (error) {
            console.error("Unable to create task table:", error.message);
        } else {
            console.log("Tasks table is ready");
        }
    });
    
module.exports = db;