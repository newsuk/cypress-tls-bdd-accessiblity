import * as explorePage from '../e2e/tls_page_elements/explorePage';

describe('Generic Page validation', () => {

//Validate the social media icons and links
    it( 'Validate Explore title', () => {
	    explorePage.validateExploreOnTitle();
    });

    it( 'Validate Explore title and categories', () => {
	    explorePage.validateExploreCategories();
    });

    it( 'User navigates to new to tls page', () => {
	    explorePage.navigateToExploreCategoryNEWTOTLS();
    });

    it( 'Validate all links in the page', () => {
	    explorePage.validateNEWTOTLSPageLinks();
    })
});