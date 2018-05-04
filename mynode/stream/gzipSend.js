const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const http = require('http');
const crypto = require('crypto');

const file = path.resolve(__dirname, '../../package-lock.json');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'PUT',
    headers: {
        filename: path.basename(file),
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip'
    }
};

const req = http.request(options, res => {
    console.log('Server response: ' + res.statusCode)
});

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipher('aes192', 'erluzi'))
    .pipe(req)
    .on('finish', () => {
        console.log('File successfully sent')
    })