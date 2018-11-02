// => 解析歌词文件-生成dom

// 误差时间(歌曲播放时与歌词显示存在误差, 修改errorTime以达到最佳显示效果)
// 歌词慢取负
const errorTime = 0;
// 临时变量
let isStart = true;
const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');
fs.readFile(path.resolve(__dirname, './萧风 - 贝多芬的悲伤.lrc'), (err, data) => {
    let originData = iconv.decode(data, 'gbk');
    let arrayP = originData.split('\n');
    let re = ['<section class="lyric">'];
    for(let p of arrayP){
        let pr = p.replace(/\t+/, '').replace(/\r/, '');
        let match = p.match(/\d{2}:\d{2}.\d{2}/);
        if(match){
            if(isStart){
                re.push(`  <div><p data-start="00:00.00"></p></div>`);
                isStart = false;
            }
            let text = pr.slice(10);
            if(text){
                re.push(`  <div><p data-start="${correctTimeError(match[0], errorTime)}">${text}</p></div>`)
            }else{
                re.push(`  <div style="height: 1px;"><p data-start="${correctTimeError(match[0], errorTime)}"></p></div>`)
            }
        }else{
            re.push(`  <div><p>${pr.replace(/\[/, '').replace(/\]/, '')}</p></div>`)
        }
    }
    re.push('</section>');
    isStart = true;
    // console.log(re)
    fs.writeFile(path.resolve(__dirname, './lyrics.html'), re.join('\n'), err => {
        if(err) console.warn(err);
        else console.log('lyrics.html 已保存');
    });
});

/**
 * 纠正误差
 * @param timeString
 * @param timeError
 */
function correctTimeError(timeString, timeError) {
    let arrTime = timeString.split(':');
    let intTime = parseInt(arrTime[0]) * 60 + parseFloat(arrTime[1]);
    let resultTime = intTime + timeError;
    let minute = Math.floor(resultTime / 60);
    let second = (resultTime % 60).toFixed(2);
    return `${setDouble(minute)}:${setDouble(second)}`;
}

function setDouble(num) {
    return num < 10 ? '0' + num : num
}