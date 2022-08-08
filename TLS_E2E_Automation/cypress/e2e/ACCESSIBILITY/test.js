
const indicators = {
	critical: '🟥',
	serious: '🟧',
	moderate: '🟨',
	minor: '🟩',
};

const terminalLog = ( violations, fileName ) => {
	cy.task(
		'log',
		`\n${ 'TEST RESULTS' }
      \n${ violations.length } accessibility violation${ violations.length === 1 ? '' : 's'
} ${ violations.length === 1 ? 'was' : 'were' } detected\n`
	);

	cy.log( 'log', violations );
	const violationData = violations.map(
		( { id, impact, description, nodes, help, helpUrl } ) => ( {
			QUANTITY: nodes.length,
			IMPACT: `${ indicators[ impact ] } ${ impact.toUpperCase() }`,
			RULE_ID: id,
			DESCRIPTION: description,
			HELP: String( help ),
			HELP_URL: helpUrl,

		} )
	);

	cy.task( 'table', violationData );
	cy.writeFile( './'+ fileName + '.json', violationData );
};

function accessiblityViolations( violations, fileName ) {
	terminalLog( violations, fileName );
	violations.forEach( ( violation ) => {
		const nodes = Cypress.$( violation.nodes.map( ( node ) => node.target ).join( ',' ) );
		const log = {
			name: `[${ indicators[ violation.impact ] } ${ violation.impact.toUpperCase() }]`,
			consoleProps: () => violation,
			$el: nodes,
			message: `[${ violation.help }](${ violation.helpUrl })`,

		};
		Cypress.log( log );

		violation.nodes.forEach( ( { target } ) => {
			Cypress.log( {
				name: '-🩸FIXME',
				consoleProps: () => violation,
				$el: Cypress.$( target.join( ',' ) ),
				message: target,
			} );
		} );
	} );
}

describe( 'Accessiblity testing for ALL pages', () => {
	it( 'Accessibilty test for Home Page', function() {
		cy.clickTLSLogo();
		cy.injectAxe();
		cy.checkA11y(
			null, null,
			accessiblityViolations( 'hello' ),
		);
	} );

	it( 'Accessibilty test for Current Issue Page', function() {
		cy.get( '.tls-header-navigation__menu-list > div > a' ).first().click();
		cy.injectAxe();
		cy.checkA11y(
			null, null,
			accessiblityViolations(),
		);
	} );
} );
