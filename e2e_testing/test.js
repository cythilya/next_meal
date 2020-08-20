const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    opts['output'] = 'html';
    opts['output-path'] = 'reports/my-run.html';
    return lighthouse(url, opts, config).then(results => {
      // use results.lhr for the JS-consumable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      const json = reportGenerator.generateReport(results.lhr, 'json');
      const html = reportGenerator.generateReport(results.lhr, 'html');

      fs.writeFileSync('reports/lighthouse-results.json', json);
      fs.writeFileSync('reports/lighthouse-results.html', html);

      return chrome.kill().then(() => results.lhr)
    });
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects']
};

// Usage:
launchChromeAndRunLighthouse('http://localhost:3000', opts).then(results => {
  // Use results!
});