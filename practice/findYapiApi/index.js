const bent = require('bent')

const host = 'http://yapi.vhall.domain'
const listMenu = '/api/interface/list_menu?project_id=740'
const headers = {
  Cookie: '_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjY4MywiaWF0IjoxNjQ0MjE1MzE3LCJleHAiOjE2NDQ4MjAxMTd9.YU7axoXNMquGmzCU3_m3HIFdXgXStitUmqxto5baygo; _yapi_uid=683'
}

async function getYapiMenus() {
  const get = bent(host, 'GET', 'json', 200, headers)
  let re = await get(listMenu)
  console.log(re)
}

getYapiMenus()
