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

function getStats(){
    const total = db.prepare(`SELECT COUNT(*) as count FROM queries`).get().count;
    const blocked = db.prepare(`SELECT COUNT(*) as count FROM queries WHERE blocked = 1`).get().count;
    const recent = db.prepare(`SELECT * FROM queries ORDER BY timestamp DESC LIMIT 50`).all();
    const topBlocked = db.prepare(`SELECT domain, COUNT(*) as count FROM queries WHERE blocked = 1 GROUP BY domain ORDER BY count DESC LIMIT 10`).all();
    return {total, blocked, recent, topBlocked}
}



module.exports = { createTable, logquery, getStats}
