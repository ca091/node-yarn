const path = require('path');
const puppeteer = require('puppeteer');
let url = 'http://www.zhongchou.com/browse/di-p';
let count = 0;

;(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1080,
        height: 1000
    });

    await page.goto('http://www.zhongchou.com/browse/di');
    await page.screenshot({path: 'zhongchou.png', fullPage: true});

    await page.goto(url+(++count));
    await page.screenshot({path: `zhongchou${count}.png`, fullPage: true});

    await page.goto(url+(++count));
    await page.screenshot({path: `zhongchou${count}.png`, fullPage: true});

    await page.goto(url+(++count));
    await page.screenshot({path: `zhongchou${count}.png`, fullPage: true});

    await browser.close();
})();