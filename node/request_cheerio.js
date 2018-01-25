const request = require('request');
const cheerio = require('cheerio');
const NUMS = 30;
let COUNT = 0;
// const url = 'http://www.zhongchou.com/browse/di';
let t1 = Date.now();

for(let i=0; i<NUMS; i++){
    if(i==0)
        path = 'http://www.zhongchou.com/browse/di';
    else
        path = 'http://www.zhongchou.com/browse/di-p' + (i+1);
    request(path, (error, response, body) => {
        var code = response && response.statusCode;
        if(!error && code==200){
            getUrl(body)
        }
    });
}

function getUrl(body) {
    var $ = cheerio.load(body);
    var products = $('a.siteCardICH3').toArray();
    console.log(COUNT+1);
    for(let item of products){
        console.log(item.attribs['title']);
    }
    console.log('\n');
    COUNT+=1;
    if(COUNT==NUMS){
        var t2 = Date.now();
        console.log(`${COUNT}次请求花费时间: ${t2-t1}ms`)
    }
}