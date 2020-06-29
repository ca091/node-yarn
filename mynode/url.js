const {URL} = require('url');
const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

console.log(myURL);

/*
 URL {
     href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
     origin: 'https://sub.host.com:8080',
     protocol: 'https:',
     username: 'user',
     password: 'pass',
     host: 'sub.host.com:8080',
     hostname: 'sub.host.com',
     port: '8080',
     pathname: '/p/a/t/h',
     search: '?query=string',
     searchParams: URLSearchParams { 'query' => 'string' },
     hash: '#hash' }
 */
