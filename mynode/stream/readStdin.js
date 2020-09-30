//可读的Streams: 一个可读的Streams表示一个数据源，在Node.js中，它使用stream模块中的Readableabstract类实现
//从可读Streams接收数据有两种方式：non-flowing模式和flowing模式
process.stdin
  .on('readable', () => {
    let chunk
    while ((chunk = process.stdin.read(500)) != null) {
      console.log(`Chunk read: ${chunk.length} \n${chunk.toString()}`)
    }
  })
  .on('end', () => process.stdout.write('End of stream \n'))

function flowingMode() {
  process.stdin
    .on('data', chunk => {
      console.log(`Chunk read: ${chunk.length} \n${chunk.toString()}`)
    })
    .on('end', () => process.stdout.write('End of stream \n'))
}
