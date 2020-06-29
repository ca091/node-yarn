const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']
const url = 'https://juejin.im/'

;(async () => {
  const browser = await puppeteer.launch({
    devtools: true,
  })
  const page = await browser.newPage()
  //模拟iPhone
  await page.emulate(iPhone)

  // page.on('request', request => {
  //     let resourceType = request.resourceType();
  //     if(resourceType.match(/xhr/)){
  //         console.log({
  //             url: request.url(),
  //             headers: request.headers(),
  //             method: request.method(),
  //             postData: request.postData(),
  //             resourceType
  //         })
  //     }
  // });
  page.on('response', response => {
    let request = response.request()
    let resourceType = request.resourceType()
    if (resourceType.match(/xhr/)) {
      //打印 request
      const log_req = (request, resourceType) => {
        console.log({
          url: request.url(),
          headers: request.headers(),
          method: request.method(),
          postData: request.postData(),
          resourceType,
        })
      }
      //打印 response
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

      // response.text().then(str => {
      //     log(response, str)
      // });

      //处理掘金首页文章的跳转
      if (response.url().match(/get_recommended_entry/g)) {
        response.json().then(obj => {
          for (let i = 0, l = obj.d.length; i < l; i++) {
            setTimeout(() => {
              page.goto(obj.d[i].originalUrl)
            }, 3000 * (i + 1))
          }
        })
      }
    }
  })
  await page.goto(url)
})()
