// How to use an ES6 import in Node.js =>
// 1. change suffix to .mjs and them type `node --experimental-modules index.mjs` in the terminal
// 2. add "type": "module" in the package.json

import { Api } from 'bitutilsofnode'
import { throttlePromise } from './utils.mjs'

const url = 'http://192.168.110.97:3001/posts/1'

let fetchPromiseMap = new Map()

// target: 防止重复执行函数调用
function ft(url) {
  if (fetchPromiseMap.has(url)) {
    return fetchPromiseMap.get(url)
  }

  let promise = Api.get(url)
    .finally(() => {
      fetchPromiseMap.delete(url)
    })

  fetchPromiseMap.set(url, promise)

  return promise
}

function test() {
  // let fn = ft
  // 使用封装的工具方法
  let fn = throttlePromise(Api.get)

  fn(url).then(res => {
    console.log(1, res)
  })

  fn(url).then(res => {
    console.log(2, res)
  })
}

test()

// json-server data.json --host 192.168.110.97 --port 3001

// json-server http://example.com/file.json

// http://localhost:3001/posts/1

// node --experimental-modules index.mjs
