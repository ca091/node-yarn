const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable{
    constructor(opts){
        super({
            objectMode: true //stream以对象模式工作
        })
    }

    //此处chunk为对象
    _write(chunk, encoding, callback){
        mkdirp(path.dirname(chunk.path), err => {
            if(err){
                return callback(err)
            }
            fs.writeFile(chunk.path, chunk.content, callback)
        })
    }
}

module.exports = ToFileStream