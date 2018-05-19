const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ToFileStream = require('../../mynode/stream/toFileStream.js');
const toFileStream = new ToFileStream();

var app = express();

app.use(cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
// app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/api_set', (req, res) => {
	let {params, query} = req;
	console.log({params, query});
	toFileStream.write({path: './node/webpush/pushSubscription.json', content: JSON.stringify({
			endpoint: query.endpoint,
			auth: query.auth,
			p256dh: query.p256dh
        })
	});
	toFileStream.end(() => console.log('All files created'));
	res.send({code: 200})
});

//work with body-parser
app.post('/api_set', (req, res) => {
    let {params, query, body} = req;
    console.log({params, query, body});
	toFileStream.write({path: './node/webpush/pushSubscription.json', content: JSON.stringify({
			endpoint: body.endpoint,
			auth: body.auth,
			p256dh: body.p256dh
		})
	});
	toFileStream.end(() => console.log('All files created'));
    // res.send({code: 200})
	res.sendStatus(200)
});

app.use(function(req, res, next) {
    var err = new Error('Sorry Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('<p>'+err.message+'</p>');
});

var port = 8083;
app.set('port', port);

var http = require('http');
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
