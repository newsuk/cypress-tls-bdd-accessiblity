/**
 * External dependencies
 */
import {navigateToArchivePage,validateArchivePageIsLoaded,validateSearchFilter, validateYearFilterDropDown,validateSocialMediaAndLoginButton,
verifyShowmore, validateBackToTop, validateAlgoliaNavigation, validateClickHereNotSubscriber, validateFooterLogoAndMainTopics} from '../e2e/tls_page_elements/archivePage'

/**
  * Click the TLS Logo button
  */

describe('Home Page', () => {
    beforeEach(()=>{
        cy.viewport(1024,768);
        
    })
})
    
    describe('static home page', () => {
        before(()=>{
            cy.visit('/',);
        })
        
        it( 'Validate search filter functionality in Archive page', () => {
            navigateToArchivePage();
            validateArchivePageIsLoaded();
            validateSearchFilter();
        });

        it( 'Validate Browse by year of issue  filter functionality in Archive Page and validate X button of browse by year of issue and Validate Explore older TLS issues section and subscribe section', () => {
            validateYearFilterDropDown();
            validateBackToTop();
            verifyShowmore();
            validateAlgoliaNavigation();
            validateClickHereNotSubscriber();
            validateFooterLogoAndMainTopics();
        });

    })


