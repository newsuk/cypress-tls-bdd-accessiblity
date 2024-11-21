const { footer, edition, authors } = require('./page_objects.json');

const baseUrl = Cypress.config().baseUrl;

describe('Verify Author Page', () => {
    before(() => {
        cy.viewport(1280, 720);
    });

    // TEST CASE: TDP-4313, TDP-4315, TDP-4316
    it(
        'Verify that Authors page loads without errors \n' +
            'Verify that page title is displayed properly on Authors page \n' +
            'Verify that main section with available authors is displayed properly on Authors page',
        () => {
            cy.visitAs(urls.edition);

            // Click on the Authors link in the footer
            cy.get(footer.authors).click();

            // Verify that the URL contains the authors page URL
            cy.url().should('contain', baseUrl + urls.authors_page);

            // Verify that the page title is visible
            cy.get(authors.title).should('be.visible');
            // Verify that the page paragraph is visible
            cy.get(authors.paragraph).should('be.visible');

            authors.section_titles.forEach((title, index) => {
                // Find the section title and verify that it is visible
                cy.get(`${authors.section} > ${title.selector}`)
                    .eq(index)
                    .should('have.text', title.text)
                    .and('be.visible');

                // Verify that the section contains authors
                cy.get(
                    `${authors.section}:contains(${title.text}) ${authors.article_container}`
                ).should('be.visible');
            });
        }
    );

    // TEST CASE: TDP-4317
    it('Verify that each of the authors are redirected according to the related author name', () => {
        const elements = [
            authors.profile_page_elements.author_head, // Author head element
            authors.profile_page_elements.author_name, // Author name element
            authors.profile_page_elements.author_bio, // Author bio element
            authors.profile_page_elements.button_next, // Next button element
            authors.profile_page_elements.article_list_first_item, // First article list item element
        ];

        cy.visitAs(urls.author_page, 'full-user');

        // Check if each element on the author profile page is visible.
        elements.forEach((element) => {
            cy.get(element).should('be.visible');
        });
    });

    // TEST CASE: TDP-4318, TDP-4319
    it(
        'Verify that Back to top button works properly \n' +
            'Verify that Footer section is present at the bottom of the Authors page',
        () => {
            cy.visitAs(urls.authors_page);

            // Find the footer element and verify that it is visible, exists, and not empty
            cy.get(edition.edition_footer)
                .should('be.visible')
                .and('exist')
                .and('not.be.empty');
            // Click on the 'Back to top' button
            cy.get('.GlobalFooter-backToTop').click({ force: true });
            // Verify that the page is scrolled to the top
            cy.get(authors.title).should('be.visible');
        }
    );
});