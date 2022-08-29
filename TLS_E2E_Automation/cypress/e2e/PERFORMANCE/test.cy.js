/// <reference types="@cypress-audit/lighthouse" />

  

describe('Lighthouse', () => {
    it('should run performance audits', () => {
        cy.visit("https://www.driving.co.uk/")
        //cy.acceptCookieBanner();
       /* cy.lighthouse(
            {
              performance: 60,
              accessibility: 90,
              'best-practices': 80,
              seo: 80,
            },
            {
              formFactor: 'desktop',
              screenEmulation: {
                mobile: false,
                disable: true,
                width: Cypress.config('viewportWidth'),
                height: Cypress.config('viewportHeight'),
                deviceScaleRatio: 1,
              },
            },
          )*/
          cy.lighthouse();
        })
  });