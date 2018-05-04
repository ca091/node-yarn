var crypto = require('crypto')

var md5 = crypto.createHash('md5');


// console.log('hash:', crypto.getHashes())
//
// console.log('cipher:', crypto.getCiphers())

const algorithm = 'aes-256-cbc';
const key = 'erluzi';
const buf = '123465'

function _md5(buf, cb) {
	md5.update(buf)
	cb(md5.digest('hex'))
}

function cipher(algorithm, key, buf, cb) {
	var encrypted = "";
	var cip = crypto.createCipher(algorithm, key);
	encrypted += cip.update(buf, 'binary', 'hex');
	encrypted += cip.final('hex');
	cb(encrypted);
}

function decipher(algorithm, key, encrypted, cb) {
	var decrypted = "";
	var decipher = crypto.createDecipher(algorithm, key);
	decrypted += decipher.update(encrypted, 'hex', 'binary');
	decrypted += decipher.final('binary');
	cb(decrypted);
}


cipher(algorithm, key, 'caoqi', function (data) {
	console.log(data)
})

decipher(algorithm, 'erluzi', 'e9ebf982276b1ab901e23168953617c0', function (data) {
	console.log(data)
})

_md5(buf, function (data) {
	console.log(data)
})
