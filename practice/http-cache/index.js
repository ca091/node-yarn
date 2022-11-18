const http = require('http')
const fs = require('fs')
const path = require('path')
const etag = require('etag')

http.createServer((req, res) => {
  console.log('请求', req.url)
  if (req.url === '/') {
    let html = fs.readFileSync(path.resolve(__dirname, './index.html'))
    const { mtime } = fs.statSync(path.resolve(__dirname, './index.html'))
    // html使用协商缓存
    useLastModified(req, res, html, mtime)
  } else {
    const data = fs.readFileSync(path.resolve(__dirname, './mail.png'))
    res.writeHead(200, {
      'Cache-Control': 'max-age=10',
    })
    res.end(data)
  }
}).listen(8085, () => {
  console.log('8085 已启动')
})

function useLastModified(req, res, data, mtime) {
  // 处理协商缓存，当发现未做修改，则告诉浏览器从缓存读取资源
  const ifModifiedSince = req.headers['if-modified-since']
  if (ifModifiedSince === mtime.toUTCString()) {
    res.statusCode = 304
    res.end() // 无需返回资源
    return
  }
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    'last-modified': mtime.toUTCString() // 文件最后修改时间
  })
  res.end(data)
}

// 根据时间戳的比较会产生问题，=> 采用 ETag
function useEtag(req, res, data) {
  const etagContent = etag(data)
  const ifNoneMatch = req.headers['if-none-match']
  if (ifNoneMatch === etagContent) {
    res.statusCode = 304
    res.end() // 无需返回资源
    return
  }
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    'etag': etagContent // 文件指纹
  })
  res.end(data)
}
