const express = require('express');
const { getStats } = require('./db')

const { createDNSServer } = require('./dns')

createDNSServer();

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/stats', (req,res) => {
    res.json(getStats());
});

app.listen(PORT, () => {
    console.log(`Web server running at http://localhost:${PORT}`);
})
