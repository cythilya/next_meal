const fs = require('fs');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const DEV_HOST = 'http://localhost:3000';
const PROD_HOST = 'https://next-meal.vercel.app';

let context = [];

process.argv.forEach(string => {
  let key  = string.replace(/^--(.*)=.*/, '$1');
  let value = string.replace(/^--.*=(.*)/, '$1');
  switch (key) {
    case 'env':
      context[key] = value;
      break;
  }

});

const ENV = context['env'] === 'DEV' ? DEV_HOST : PROD_HOST;

const TEST_PAGES = [
  {
    id: 'index',
    link: '/',
    needLogin: false,
  },
  {
    id: 'store',
    link: '/store/9857f863-fc1e-4c3b-b482-0207354b1fc0',
    needLogin: false,
  },
  {
    id: 'tag',
    link: '/tag/早午餐',
    needLogin: false,
  },
  {
    id: 'fav',
    link: '/fav',
    needLogin: true,
  },
];

(async() => {
    let browser = null;
    let page = null;

    try {
        browser = await navigateToPizzaProfile();
        page = (await browser.pages())[0];

        console.log('Running Lighthouse...');

        for(let i = 0; i < TEST_PAGES.length; i += 1) {
          const report = await lighthouse(`${ENV}${TEST_PAGES[i].link}`, {
            port: (new URL(browser.wsEndpoint())).port,
            output: 'json',
            logLevel: 'info',
            disableDeviceEmulation: true,
            chromeFlags: ['--disable-mobile-emulation']
        }, config);
        const json = reportGenerator.generateReport(report.lhr, 'json');
        const html = reportGenerator.generateReport(report.lhr, 'html');
        console.log(`Lighthouse scores: ${report.lhr.score}`);
        console.log('Writing results...');
        fs.writeFileSync(`reports/performance/lighthouse-results-${TEST_PAGES[i].id}.json`, json);
        fs.writeFileSync(`reports/performance/lighthouse-results-${TEST_PAGES[i].id}.html`, html);
      }

      console.log('Done!');
    } catch (error) {
        console.error('Error!', error);
    } finally {
        await page.close();
        await browser.close();
    }
})();

async function navigateToPizzaProfile() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to index...');
    await page.goto('http://localhost:3000/');

    console.log('Starting login, entering username and password...');
    await page.click('#login');
    await page.type('#account', 'test');
    await page.type('#password', 'test');page.click('#submit'),

    // console.log('Logging in....');
    // await Promise.all([
    //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
    // ]);

    console.log('Next Meal unlocked!');
    return browser;
}