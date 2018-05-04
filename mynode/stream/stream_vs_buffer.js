const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const file = path.resolve(__dirname, '../package-lock.json');

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => console.log('File successfully compressed'))