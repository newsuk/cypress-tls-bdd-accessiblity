describe('Audits', () => {
  
    beforeEach(() => { 1
      cy.visit('https://www.the-tls.co.uk/');
    });

    it('pa11y audits', () => { 
        cy.pa11y();
    });

    it.only('lighthouse audits', () => {
      const customThresholds = {  
        performance: 70,
        accessibility: 90,
        seo: 90,
        'best-practices': 90,
        pwa: 0,
      };

      const desktopConfig = { 
        extends: 'lighthouse:default',
        /*settings: {
            throttlingMethod: 'devtools',
            //onlyCategories: ['performance'],
          },*/
        formFactor: 'desktop',
        maxWaitForFcp: 15 * 1000,
        maxWaitForLoad: 35 * 1000,
       // formFactor: 'desktop',
        //throttling: constants.throttling.desktopDense4G,
        //screenEmulation: constants.screenEmulationMetrics.desktop,
        emulatedUserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse",
    throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
    },
    screenEmulation: {
       /* mobile: false,
        disable: true,
        width: Cypress.config('viewportWidth'),
        height: Cypress.config('viewportHeight'),
        //deviceScaleRatio: 1,*/
        mobile: false,
  width: 1350,
  height: 940,
 // deviceScaleFactor: 1,
  disabled: true,
      },
      };
      cy.lighthouse(customThresholds, desktopConfig); 
    });
});