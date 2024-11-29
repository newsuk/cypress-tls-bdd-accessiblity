/**
 * External dependencies
 */
import * as archivePage from '../e2e/tls_page_elements/archivePage'

    describe('Static home page', () => {
    
        it( 'Validate search filter functionality in Archive page', () => {
            archivePage.navigateToArchivePage();
            archivePage.validateArchivePageIsLoaded();
            archivePage.validateArchiveTitle();
            archivePage.validateSearchFilter();
        });

        it( 'Validate Browse by year of issue  filter functionality in Archive Page and validate X button of browse by year of issue and Validate Explore older TLS issues section and subscribe section', () => {
            archivePage.validateYearFilterDropDown();
            archivePage.validateBackToTop();
            archivePage.verifyShowmore();
            archivePage.validateAlgoliaNavigation();
            archivePage.validateClickHereNotSubscriber();
            archivePage.validateFooterLogoAndMainTopics();
        });

    })


