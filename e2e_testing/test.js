const fs = require('fs');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

const PIZZA_PROFILE_URL = 'http://localhost:3000/';

(async() => {
    let browser = null;
    let page = null;

    try {
        browser = await navigateToPizzaProfile();
        page = (await browser.pages())[0];
        console.log('Running lighthouse...');
        const report = await lighthouse(PIZZA_PROFILE_URL, {
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
        fs.writeFileSync('reports/lighthouse-results.json', json);
        fs.writeFileSync('reports/lighthouse-results.html', html);

        console.log('Done!');
    } catch (error) {
        console.error('Error!', error);
    } finally {
        await page.close();
        await browser.close();
    }
})();

async function navigateToPizzaProfile() {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    console.log('Navigating to Pizza Profile...');
    await page.goto(PIZZA_PROFILE_URL);
    console.log('login')

    console.log('Starting login, entering username and password...');
    await page.click('#login');

    await page.type('#account', 'test');
    await page.type('#password', 'test');page.click('#submit'),

    // console.log('Logging in....');
    // await Promise.all([
    //     page.waitForNavigation({ waitUntil: 'networkidle0' }),

    // ]);

    console.log('Pizza profile unlocked!');
    return browser;
}