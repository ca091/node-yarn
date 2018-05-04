const ToFileStream = require('./toFileStream.js');
const toFileStream = new ToFileStream();

toFileStream.write({path: 'file1.txt', content: 'Hello'});
toFileStream.write({path: 'file2.txt', content: 'Node.js'});
toFileStream.write({path: 'file3.txt', content: 'Streams'});
toFileStream.end(() => console.log('All files created'))