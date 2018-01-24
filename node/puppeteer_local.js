const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

;(async () => {
    const browser = await puppeteer.launch({
        devtools: true
    });
    const page = await browser.newPage();
    //模拟iPhone
    await page.emulate(iPhone);
    await page.goto('http://192.168.199.187:5000/app/');
})();