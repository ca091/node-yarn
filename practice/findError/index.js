const jsPath = 'http://sbc.tonglvhuanqiu.com/static/js/vendor.bd3474c58bdda3752c14.js';
// const jsPath = 'http://sbc.tonglvhuanqiu.com/static/js/app.a3ad6837401f9b5002eb.js';
const {Api} = require('bitutilsofnode');
const spread = 250;

//js错误上报是压缩过的js，不方便定位错误，此方法是为了快速定位错误
function find({line = 1, column}) {
    Api.get(jsPath).then(data => {
        if (line !== 1) {
            data = data.split('\n')[line - 1];
        }
        let str = data.substring(column - spread, column + spread);
        let errorStr = str.substring(spread, spread * 2);
        console.log(str + '\n');
        console.log(errorStr)
    })
}

// find({column: 362633});
find({line: 9, column: 66767});

// Api.get('https://sbc-test.oss-cn-zhangjiakou.aliyuncs.com/test/FY20188824010681.pdf')
// .then(data => {
//     console.log(data)
// })