const Database = require("better-sqlite3");
const db = new Database('queries.db');

db.pragma('journal_mode = WAL');

const createTable = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS queries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain TEXT NOT NULL,
        blocked INTEGER NOT NULL,
        client TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )    
    `)
}


createTable();

const insert = db.prepare(`
        INSERT INTO queries (domain, blocked, client) 
        VALUES (@domain, @blocked, @client)
    `);

const logquery = ({domain, blocked, client}) => {
    insert.run({
        domain, blocked: blocked ? 1 : 0, client
    });
}

module.exports = { createTable, logquery }
