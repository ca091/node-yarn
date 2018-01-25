const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const tabs = ['.vux-tab-item:nth-child(1)', '.vux-tab-item:nth-child(2)', '.vux-tab-item:nth-child(3)'];
const navs = ['nav>div:nth-child(1)', 'nav>div:nth-child(2)', 'nav>div:nth-child(3)', 'nav>div:nth-child(4)'];
const selector_product = '.item-pro';
const selector_bq = '.bq-item';
const selector_to_login = '.login_index_login_by_phone';
const selector_login_input_phone = "input[type=number]";
const selector_login_input_pass = "input[type=password]";
const selector_login_button = '.login_button';

//launch a Chromium instance
//A Browser is created when Puppeteer connects to a Chromium instance, either through puppeteer.launch or puppeteer.connect
//Chromium instance => browser => page
;(async () => {

    const browser = await puppeteer.launch({
        devtools: true
    });
    const page = await browser.newPage();
    //模拟iPhone
    await page.emulate(iPhone);
    
    
    await page.goto('http://sbc.tonglvhuanqiu.com/?#/product');

    // await page.waitForFunction(() => {console.log('waitFor 2000ms')}, {timeout: 2000});//error

    // Wait for the results page to load and display the results.
    const resultSelector = '.product-info-name';
    await page.waitForSelector(resultSelector);

    //Class<ElementHandle>
    let tab0 = await page.$(tabs[0]);
    let tab1 = await page.$(tabs[1]);
    let tab2 = await page.$(tabs[2]);
    // await tab3.click();

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            tab1.click();
            resolve();
            // page.evaluate(ele => ele.click(), tab3);
            // page.click(tabs[2]);
        }, 2000);
    });

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            tab2.click();
            resolve();
        }, 2000);
    });

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            tab0.click();
            resolve();
        }, 2000);
    });

    let product = await page.$(selector_product);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            product.click();
            resolve();
        }, 2000);
    });

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            page.$(selector_bq).then(dom => {
                dom.click();
                resolve();
            });
        }, 2000);
    });

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            page.$(selector_to_login).then(dom => {
                dom.click();
                resolve();
            });
        }, 2000);
    });

    // await page.type(selector_login_input_phone, '18801013774', {delay: 100});
    // await page.type(selector_login_input_pass, '123456', {delay: 100});
    //
    // await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         page.$(selector_login_button).then(dom => {
    //             dom.click();
    //             resolve();
    //         });
    //     }, 1000);
    // });
    
    // await page.evaluate(resultSelector => {
    //     let time = 2000;
    //     let navs = document.querySelectorAll('nav>div');
    //     setTimeout(() => {
    //         navs[1].click();
    //     }, time);
    //
    //     setTimeout(() => {
    //         navs[2].click();
    //     }, time * 2);
    //
    //     setTimeout(() => {
    //         navs[3].click();
    //     }, time * 3);
    //
    //     setTimeout(() => {
    //         navs[0].click();
    //     }, time * 4)
    // }, resultSelector);

    // await browser.close();
})();

// puppeteer.launch().then(async browser => {
//     const page = await browser.newPage();
//     let t_start = Date.now();
//     await page.goto('http://sbc.tonglvhuanqiu.com/?#/product');
//     // page.once('load', () => {
//     //     let t_end = Date.now();
//     //     console.log(`load http://sbc.tonglvhuanqiu.com/?#/product cast: ${t_end-t_start}`)
//     // });
//     //other actions
//     // await page.screenshot({path: 'feiyu.png'});
//     await browser.close();
// });