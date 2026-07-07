const express = require('express');
const { getStats } = require('./db')

const { createDNSServer } = require('./dns')

createDNSServer();

const app = express();
const PORT = 3001;

app.get('/stats', (req,res) => {
    res.json(getStats());
});

app.listen(PORT, () => {
    console.log(`Web server running at http://localhost:${PORT}`);
})
