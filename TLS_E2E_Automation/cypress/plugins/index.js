/// <reference types="cypress" />

const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs');
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');
const ReportGenerator = require('lighthouse/report/generator/report-generator');

module.exports = (on) => {
  on('file:preprocessor', cucumber());

  on('before:browser:launch', (browser, launchOptions) => {
    prepareAudit(launchOptions);
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu');
      return launchOptions;
    }
  });

  on('task', {
    lighthouse: lighthouse((lighthouseReport) => {
      fs.writeFileSync('cypress/screenshots/lhreport.html', ReportGenerator.generateReport(lighthouseReport.lhr, 'html'));
    }),
    pa11y: pa11y(),
  });

  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    table(message) {
      console.table(message);
      return null;
    },
  });

  on('after:run', (results) => {
    if (results) {
      fs.mkdirSync('cypress/.run', { recursive: true });
      fs.writeFileSync('cypress/.run/results.json', JSON.stringify(results));
    }
  });
};
