import React from 'react';
const indicators = {
	critical: '🟥',
	serious: '🟧',
	moderate: '🟨',
	minor: '🟩',
};

let fileName = 'default';

function logViolations( violations ) {
	terminalLog( violations );
	violations.forEach( ( violation ) => {
		const nodes = Cypress.$( violation.nodes.map( ( node ) => node.target ).join( ',' ) );
		const log = {
			name: `[${ indicators[ violation.impact ] } ${ violation.impact.toUpperCase() }]`,
			consoleProps: () => violation,
			$el: nodes,
			message: `[${ violation.help }](${ violation.helpUrl })`,

		};

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
		'log',`\n${ 'TEST RESULTS' }
		\n${ violations.length } accessibility violation${ violations.length === 1 ? '' : 's'
  } ${ violations.length === 1 ? 'was' : 'were' } detected\n`
		
	);

	const violationData = violations.map(
		( { id, impact, tags, description, nodes, help, helpUrl } ) => ( {
			NO_ISSUES : nodes.length,
			IMPACT: `${ indicators[ impact ] } ${ impact.toUpperCase() }`,
			//TAGS: tags,
			ELEMENT: id,
			ISSUES: help,
			DESCRIPTION: description,
			HELP_URL: helpUrl,
			ELEMENT_LOCATION :JSON.parse(JSON.stringify(nodes)).map((item =>item.target)),
		} ) );
	
	cy.task( 'table',violationData );
	//Create the directory with current date
	const today = new Date();
	const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
	const dir = './' + date;
	cy.writeFile( dir + '/' + fileName + '.json', violationData );
};

const currentIssue = '/issues/current-issue-7/';
const topics = '/topics/long-reads/';
const categories = '/categories/literature/';
const archive = '/archive/';
describe( 'Accessiblity testing for ALL pages', () => {
	it( 'Accessibilty test for Home Page', function() {
		cy.clickTLSLogo();
		cy.acceptCookieBanner();
		cy.injectAxe();
		fileName = 'Home_Page';
		cy.checkA11y( null, null, logViolations );
	} );

	it( 'Accessibilty test for Article Page', function() {
		cy.clickTLSLogo();
		cy.acceptCookieBanner();
		cy.get('.tls-article-label + a.tls-card-headline').first().click();
		cy.injectAxe();
		fileName = 'Article_Page';
		cy.checkA11y( null, null, logViolations );
	} );

	it( 'Accessibilty test for Current Issue Page', function() {
		cy.clickTLSLogo();
		cy.navigateToPage(currentIssue);
		cy.injectAxe();
		fileName = 'CurrentIssue_Page';
		cy.checkA11y( null, null, logViolations );
	} );

	it( 'Accessibilty test for Topics Long Reads Page', function() {
		cy.clickTLSLogo();
		cy.navigateToPage(topics);
		cy.injectAxe();
		fileName = 'Topics_LongReads_Page';
		cy.checkA11y( null, null, logViolations );
	} );

	it( 'Accessibilty test for Categories Page', function() {
		cy.clickTLSLogo();
		cy.navigateToPage(categories);
		cy.injectAxe();
		fileName = 'Categories_Page';
		cy.checkA11y( null, null, logViolations );
	} );

	it( 'Accessibilty test for Archive Page', function() {
		cy.clickTLSLogo();
		cy.navigateToPage(archive);
		cy.injectAxe();
		fileName = 'Archive_Page';
		cy.checkA11y( null, null, logViolations );
	} );	
} );
