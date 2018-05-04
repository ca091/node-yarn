const ReplaceStream = require('./replaceStream.js');
const replaceStream = new ReplaceStream(process.argv[2], process.argv[3]);

process.stdin
    .pipe(replaceStream)
    .pipe(process.stdout);