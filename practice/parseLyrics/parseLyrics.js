//解析歌词文件-生成dom
const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');
fs.readFile(path.resolve(__dirname, './张玉华 - 原谅.lrc'), (err, data) => {
    let originData = iconv.decode(data, 'gbk');
    let arrayP = originData.split('\n');
    let re = ['<section class="lyric">'];
    for(let p of arrayP){
        let pr = p.replace(/\t+/, '').replace(/\r/, '');
        let match = p.match(/\d{2}:\d{2}.\d{2}/);
        if(match){
            let text = pr.slice(10);
            if(text){
                re.push(`  <div><p data-start="${match[0]}">${text}</p></div>`)
            }else{
                re.push(`  <div style="height: 1px;"><p data-start="${match[0]}"></p></div>`)
            }
        }else{
            re.push(`  <div><p>${pr.replace(/\[/, '').replace(/\]/, '')}</p></div>`)
        }
    }
    re.push('</section>');
    // console.log(re)
    fs.writeFile(path.resolve(__dirname, './lyrics.html'), re.join('\n'), err => {
        if(err) console.warn(err);
        else console.log('lyrics.html 已保存');
    });
});