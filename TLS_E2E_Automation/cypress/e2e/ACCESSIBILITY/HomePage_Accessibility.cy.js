/// <reference types="cypress" />
function terminalLog( violations ) {
	cy.task( 'logResults', {
		reportName: 'test' || '',
		reportDirectory: './',
	}, { log: false } ).then( ( reportPath ) => {
		Cypress.log( {
			name: 'A11y Report',
			message: `A report with the accessibility findings has been created! View console for the location.`,
			consoleProps: () => {
				return {
					message: `A report of the accessibility findings is available here: file://${ reportPath }`,
				};
			},
		} );
		return cy.wrap( results.violations, { log: false } );
	} );
	// pluck specific keys to keep the table readable
	const violationData = violations.map(
		( { id, impact, description, nodes } ) => ( {
			id,
			impact,
			description,
			nodes: nodes.length,  
		} )
	);

	cy.task( 'table', violationData );
	cy.writeFile( 'cypress/.run/test.json', violationData );
}

describe( 'Accessiblity', () => {
	before( function() {
		cy.injectAxe();
	} );

	it( 'Should load the correct URL', function() {
		cy.checkA11y(
			null, null,
			terminalLog,
		);
	} );
} );
