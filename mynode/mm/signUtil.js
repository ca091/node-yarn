// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';

// const hashDigest = sha256('Message');
// console.log(hashDigest)
// const hmacDigest = Base64.stringify(hashDigest);
// console.log(hmacDigest)

var pem = `-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMWAAWJi2CO1WC8b
ikSQAh6RqwL/vztNsUtdeurLi/0elGE8IzlO2KARxYDsAxYGNdAYSIFTYCVOuLs+
yq/7na2XU/f8U0HEbk9yswDh979m7i36hjJ2ZbUcxqx8T3y3eU7pzhl07aouVL4P
iFsnaoqBwcWOf9F2A1nysdeXK+aTAgMBAAECgYBv8qrWNekF9JjTuuyZCHfrE+63
eHfRCazhZ09xH4duJpM8unXM2iB4OxqUhTMKnOKL3ffbNoNdIk4b9O+26QzqhTGT
rj52ucALQBqjPJwsNnJUqt/D7lLphp4Myyid+QOU/FQq3a6PYEa8Nx7OuT4cwaGG
bi5QaPjx+ZdTK3A6YQJBAPHfUYuYYgGS9LL8Nh/vo/kERqW0jkAlDleH3o0P25YK
QjetCAW3e//4xNXDIXF9AHCQo/T3XpBwZfNMj27Uc78CQQDRCTGzugpZJueGQTPX
rLHO5hsQNKMYTAJqOi1wvbu/X3YbSIUO/58DrGfxcgxBQ+ph6lC2B8+MjlRSP5Ev
1/ItAkBUZp4Y/Tqt2+8BihsE9+WbHo/cgO3mmkev6ZySUsdISxoiPYIAJK/jeZaO
FUJVTM5beU2NTMi11FLvHHcssHwXAkBCv5vWVx68zxZ5IVLrmKKCfanAp/44YPUY
dJFUAdH0zwfIuIR8gJWHN8NNLuzI3mX2dDrnlWDp8fzs8o1q6JrVAkEAhp9lgYxB
Ze8jGQj4IOjJBh1u6X3F3bujWGyJJhqTARynBE05g8PyL8NteVwx9Muh8iQtBnX2
htnawRWmjm0X1Q==
-----END PRIVATE KEY-----`;

import {Signature, KEYUTIL, hex2b64} from 'jsrsasign'
// import {readFile} from 'jsrsasign-util'
// var rs = require('jsrsasign');
// var rsu = require('jsrsasign-util');
// var pem = readFile('pkcs8_private_key.pem');
var prvKey = KEYUTIL.getKey(pem)

// sig.updateString(d);
// var sigVal = sig.sign();
// var sigVal = sig.signString(d);

function sha256WithRsa(d) {
	var sig = new Signature({alg: 'SHA256withRSA'});
	sig.init(prvKey);
	return hex2b64(sig.signString(d));
}

export default sha256WithRsa

// var base64Val = Base64.encode(sigVal)
// console.log(base64Val)
// console.log(window.btoa(sigVal))


