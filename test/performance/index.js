const fs = require('fs');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const TableBuilder = require('table-builder');;
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
    browser = await navigateToIndex();
    page = (await browser.pages())[0];
    const records = [];

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
      const categories = Object.values(report.lhr.categories);
      const record = {};

      console.log(`Review results for ${TEST_PAGES[i].id}...`);
      record['Page'] =`<a href='./lighthouse-results-${TEST_PAGES[i].id}.html' target='blank'>${TEST_PAGES[i].id}</a>`;

      for(let i = 0; i < categories.length; i += 1) {
        const key = `${categories[i].title}`;
        record[key] = categories[i].score;
        console.log(`Lighthouse scores: ${categories[i].title} ${categories[i].score}`);
      }

      records.push(record);

      console.log('Writing results...');
      fs.writeFileSync(`reports/performance/lighthouse-results-${TEST_PAGES[i].id}.json`, json);
      fs.writeFileSync(`reports/performance/lighthouse-results-${TEST_PAGES[i].id}.html`, html);
    }

    const headers = {
      'Page' : 'Page',
      'Performance': 'Performance',
      'Accessibility': 'Accessibility',
      'Best Practices': 'Best Practices',
      'SEO' : 'SEO',
      'Progressive Web App': 'Progressive Web App'
    };

    const table = (new TableBuilder({'class': 'repor-table'}))
      .setHeaders(headers) // see above json headers section
      .setData(records) // see above json data section
      .render()

    fs.writeFileSync(`reports/performance/lighthouse-report-index.html`, table);

    console.log('Done!');
  } catch (error) {
    console.error('Error!', error);
  } finally {
    await page.close();
    await browser.close();
  }
})();

async function navigateToIndex() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to index...');
    await page.goto(ENV);

    console.log('Starting login, entering username and password...');
    await page.click('#login');
    await page.type('#account', 'test');
    await page.type('#password', 'test');
    await page.click('#submit'),

    // console.log('Logging in....');
    // await Promise.all([
    //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
    // ]);

    console.log('Login success!');
    return browser;
}
