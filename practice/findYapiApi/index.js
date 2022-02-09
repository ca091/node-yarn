const fs = require('fs')
const path = require('path')
const bent = require('bent')

const host = 'http://yapi.vhall.domain'
const listMenuUser = '/api/interface/list_menu?project_id=740'
const listMenuLive = '/api/interface/list_menu?project_id=749'
const headers = {
  Cookie: '_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjY4MywiaWF0IjoxNjQ0MjE1MzE3LCJleHAiOjE2NDQ4MjAxMTd9.YU7axoXNMquGmzCU3_m3HIFdXgXStitUmqxto5baygo; _yapi_uid=683'
}

async function getYapiApiUser() {
  const get = bent(host, 'GET', 'json', 200, headers)
  let re = await get(listMenuUser)
  // console.log(re)
  if (re.errcode === 0) {
    parseData(re.data, path.resolve(__dirname, 'apiUser.js'))
  }
}

async function getYapiApiLive() {
  const get = bent(host, 'GET', 'json', 200, headers)
  let re = await get(listMenuLive)
  // console.log(re)
  if (re.errcode === 0) {
    parseData(re.data, path.resolve(__dirname, 'apiLive.js'))
  }
}

function parseData(dataArray, writeFilePath) {
  let re = dataArray.map(i => ({
    id: i._id,
    name: i.name,
    list: i.list.map(a => ({
      // id: a._id,
      title: a.title,
      path: a.path + '::' + a._id,
      method: a.method,
      status: a.status,
    }))
  }))
  fs.writeFile(writeFilePath,
    'const apis = ' + JSON.stringify(re, null, 2),
    'utf8',
    () => {})
}

getYapiApiUser()
getYapiApiLive()

