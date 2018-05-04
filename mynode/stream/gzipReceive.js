const http = require('http');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const fileReceived = path.resolve(__dirname, './fileReceived.json')

const server = http.createServer((req, res) => {
    const filename = req.headers.filename;
    console.log('File request received: ', filename);
    req
        .pipe(crypto.createDecipher('aes192', 'erluzi'))
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(fileReceived))
        .on('finish', () => {
            res.writeHead(201, {
                'Content-Type': 'text/plain'
            });
            res.end('Ok');
            console.log(`File saved: ${filename}`)
        })
});

server.listen(3000, () => console.log('Listening on 3000'))