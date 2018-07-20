const jsPath = 'http://sbc.tonglvhuanqiu.com/static/js/app.cde53d14d0bae3ec19c9.js';
const {Api} = require('bitutilsofnode');
const spread = 250;
//js错误上报是压缩过的js，不方便定位错误，此方法就是为了快速定位错误
function find({line=1, column}) {
    Api.get(jsPath).then(data => {
        let str = data.substring(column-spread, column+spread);
        let errorStr = str.substring(spread, spread*2);
        console.log(str+'\n');
        console.log(errorStr)
    })
}

find({column: 362633});