const url = require('url');
const app = require('express')();
const server = require('http').createServer(app);
const WebSocket = require('ws');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

var wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    const location = url.parse(req.url, true);

    ws.on('message', d => {
        console.log(d)
    });

    ws.send('something')
})

wss.broadcast = d => {
    wss.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN){
            client.send(d)
        }
    })
}


server.listen(8080, () => {
    console.log('listening on %d', server.address().port)
})