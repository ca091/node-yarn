const Chance = require('chance');
const http = require('http');

const chance = new Chance();

//res: 可写流
http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    // while(chance.bool({likelihood: 95})){
    //     res.write(chance.string()+'\n')
    // }
    function generateMore() {
        while (chance.bool({ likelihood: 95 })) {
            const shouldContinue = res.write(chance.string({ length: 16 * 1024 - 1 }));
            if (!shouldContinue) {
                console.log('back-pressure');//reason:数据写入速度快于stream的消耗(底层socket)
                return res.once('drain', generateMore);//当缓冲器被清空时
            }
        }
        res.end('\nThe end...\n');
        res.on('finish', () => console.log('All data was sent'))
    }
    generateMore();
}).listen(3000, () => console.log('Listening on 3000'));