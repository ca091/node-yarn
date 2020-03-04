const sourceMap = require('source-map')
const {Api} = require('bitutilsofnode');
const utils = require('util')
const fs = require('fs')
const path = require('path')
const readFile = utils.promisify(fs.readFile)

/**
 * js错误上报是压缩过的js，不方便定位错误，此方法是为了快速定位错误
 * @deprecated
 * @param line
 * @param column
 */
function find({line = 1, column}) {
  const spread = 250;
  Api.get('http://xxx.js').then(data => {
    if (line !== 1) {
      data = data.split('\n')[line - 1];
    }
    let str = data.substring(column - spread, column + spread);
    let errorStr = str.substring(spread, spread * 2);
    console.log(str + '\n');
    console.log(errorStr)
  })
}

/**
 * js错误监控，根据source map文件定位错误源文件
 * @param line
 * @param column
 * @returns {Promise<NullableMappedPosition>}
 */
async function locateError({line = 1, column}) {
  // todo .map不存放到线上，应从本地获取
  // const mapObj = require('./map.js')
  const mapString = await readFile(path.resolve(__dirname, './index.da37bbbeb494d3e6bc17.js.map'))
  const mapObj = JSON.parse(mapString)
  let consumer = await new sourceMap.SourceMapConsumer(mapObj)
  let result = consumer.originalPositionFor({line, column})
  // result like this
  // {
  //   source: 'webpack:///app/es6/class.js',
  //   line: 31,
  //   column: 29,
  //   name: 'value'
  // }
  // 错误发生的源文件索引
  let errorSourceFileIndex = mapObj.sources.map(i => i.replace(/\.\//, '')).indexOf(result.source)
  // 错误发生的源文件内容
  result.sourceContent = mapObj.sourcesContent[errorSourceFileIndex]
  return result
}

locateError({line: 1, column: 3311}).then(result => {
  console.log(result)
})

// find({column: 362633});
// find({line: 9, column: 66767});
// Api.get('https://sbc-test.oss-cn-zhangjiakou.aliyuncs.com/test/FY20188824010681.pdf')
// .then(data => {
//     console.log(data)
// })
