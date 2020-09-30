const fs = require('fs')
const path = require('path')
const request = require('request')
const superagent = require('superagent')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

const ToFileStream = require('../../mynode/stream/toFileStream.js')

//网易云音乐根地址
const baseUrl = 'http://music.163.com'
//爬取链接, 自己去选择一个分类, 这里暂时不做分页处理
const crawlUrl = 'http://music.163.com/#/discover/playlist/?cat=%E5%8D%8E%E8%AF%AD'
//下载地址
const downloadUrl = 'http://music.163.com/song/media/outer/url?id={{id}}.mp3'
//歌单列表
const el_play_list = '#m-pl-container li'
//歌曲列表, 这个是js渲染完之后的展示, 在页面刚加载完时不存在, 所以不能用这个获取
// const el_song_list = 'table.m-table tr';
// 歌曲列表
const el_song_list = '#song-list-pre-cache .f-hide li'
//下载数达到时停止下载
const mostCount = 6
let downloadCount = 0

//爬取歌单列表,由于爬取内容位于iframe,不能使用此方法
function requestPlayList(url) {
  return new Promise((resolve, reject) => {
    superagent.get(url).set({
      'Connection': 'keep-alive',
    }).end((err, res) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      const $ = cheerio.load(res.text)
      let curList = getCurPlayList($)
      resolve(curList)
    })
  })
}

//得到歌单列表
function getCurPlayList($) {
  let list = []
  $(el_play_list).each((ind, ele) => {
    let _this = $(ele)
    list.push({
      name: _this.find('.dec a').text(),
      href: _this.find('.dec a').attr('href'),
      number: _this.find('.nb').text(),
    })
  })
  return list
}

//得到歌曲列表
function getCurSongList($) {
  let list = []
  $(el_song_list).each((ind, ele) => {
    let _this = $(ele)
    list.push({
      href: _this.find('a').attr('href'),
      name: _this.text(),
    })
  })
  return list
}

//测试爬取的dom结构, 在获取歌曲列表时查看dom, 得到el选择器
function downLoadHtml(content) {
  const toFileStream = new ToFileStream()
  toFileStream.write({path: path.join(__dirname, 'listSong.html'), content: content})
  toFileStream.end(() => console.log('All files created'))
}

//歌曲下载
function requestDownload(item) {
  return new Promise((resolve, reject) => {
    let stream = fs.createWriteStream(path.join(__dirname, item.name + '.mp3'))
    let id = item.href.split('id=')[1]
    let url = downloadUrl.replace(/\{\{id\}\}/g, id)
    console.log(`begin download song ${url}...`)
    superagent.get(url).set({
      'Connection': 'keep-alive',
    }).pipe(stream)
      .on('finish', resolve(`song ${item.name} has downloaded !!`))
      .on('error', reject(`song ${item.name} download fail !!`))
  })

}

//打印 request, 调试使用
const log_req = (request, resourceType) => {
  console.log({
    url: request.url(),
    headers: request.headers(),
    method: request.method(),
    postData: request.postData(),
    resourceType,
  })
}

//打印 response, 调试使用
const log_res = (response, data) => {
  console.log({
    ok: response.ok(),
    status: response.status(),
    url: response.url(),
    // headers: response.headers(),
    data,
  })
  console.log('\n')
}

async function init() {
  const browser = await puppeteer.launch({
    devtools: true,
  })
  const page = await browser.newPage()
  page.on('response', response => {
    let request = response.request()
    let resourceType = request.resourceType()
    let reqUrl = response.url()
    if (resourceType.match(/document/)) {
      //处理歌单列表
      if (reqUrl.indexOf('discover/playlist') !== -1) {
        response.text().then(str => {
          const $ = cheerio.load(str)
          let curList = getCurPlayList($)
          console.log(curList)
          initSong(browser, page, curList).then(d => console.log(d)).catch(e => console.error(e))
          // log_res(response, str)
        })
        //处理歌曲列表, 循环歌单得到
      } else if (reqUrl.indexOf('playlist?id=') !== -1) {
        response.text().then(str => {
          const $ = cheerio.load(str)
          let songList = getCurSongList($)
          console.log(songList)
          downloadSong(songList).then(d => console.log(d)).catch(e => console.error(e))
        })
      }
    }
  })
  await page.goto(crawlUrl)
  return 'init over'
}

async function initSong(browser, page, curList) {
  for (let [index, item] of Object.entries(curList)) {
    if (downloadCount === mostCount) {
      page.close().then(() => browser.close())
      return 'initSong over and downloadSong over' //不再继续遍历歌单
    }
    await page.goto(`${baseUrl}/#${item.href}`, {
      timeout: 10000,
      waitUntil: ['load', 'domcontentloaded'],
    }).catch(e => console.error('initSong', e))//页面请求如果在10s内没有加载完毕，则处理错误，防止循环不能继续执行
  }
  return 'initSong over'
}

async function downloadSong(songList) {
  for (let [index, item] of Object.entries(songList)) {
    if (downloadCount === mostCount) return 'downloadSong over' //停止下载
    await requestDownload(item).then(d => {
      console.log(d)
      ++downloadCount
    }).catch(e => console.error('downloadSong', e))
  }
  return 'downloadSong over'
}

init().then(d => console.log(d)).catch(e => console.error(e))

