const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({port: 8080});

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.send('Connected to DNSink server!');


    ws.on('close', () => {
        console.log('Client disconnected');
    })
})

function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === 1) client.send(JSON.stringify(data));
    })
}

module.exports = {broadcast};