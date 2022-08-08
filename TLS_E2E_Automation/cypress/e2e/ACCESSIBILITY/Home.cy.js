
const indicators = {
	critical: '🟥',
	serious: '🟧',
	moderate: '🟨',
	minor: '🟩',
};

let fileName = 'default';

function logViolations( violations ) {
	//pathOfFile = '';
	terminalLog( violations );
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

const terminalLog = ( violations ) => {
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
			ELEMENT: id,
			ISSUES: help,
			ISSUES_DESCRIPTION: description,
			HELP_URL: helpUrl,
		} ) );

	cy.task( 'table', violationData );

	//Create the directory with current date
	const today = new Date();

	const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
	const dir = './' + date;

	cy.writeFile( dir + '/' + fileName + '.json', violationData );
};

describe( 'Accessiblity testing for ALL pages', () => {
	it( 'Accessibilty test for Home Page', function() {
		cy.clickTLSLogo();
		cy.injectAxe();
		fileName = 'Login_Page';
		cy.checkA11y( null, null, logViolations );
	} );

	it( 'Accessibilty test for Current Issue Page', function() {
		cy.get( '.tls-header-navigation__menu-list > div > a' ).first().click();
		cy.injectAxe();
		fileName = 'CurrentIssue_Page';
		cy.checkA11y( null, null, logViolations );
	} );
} );
