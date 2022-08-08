const report = require( 'multiple-cucumber-html-reporter' );
const fs = require( 'fs' );

fs.readFile( 'cypress/.run/results.json', function read( err, data ) {
	if ( err ) {
		throw err;
	}
	const runInfos = JSON.parse( data );
	report.generate( {
		jsonDir: './reports',
		reportPath: './reports/TLS-Cucumber-results.html',
		metadata: {
			browser: {
				name: runInfos.browserName,
				version: runInfos.browserVersion,
			},
			device: 'Cypress',
			platform: {
				name: 'Mac Big Sur',
			},
		},
		customData: {
			title: 'Run info',
			data: [
				{ label: 'Project', value: 'TLS' },
				{ label: 'Environment', value: 'Dev/Uat' },
				{ label: 'Run', value: 'Sanity Run' },
				{ label: 'Execution Start Time', value: new Date( runInfos.startedTestsAt ).toLocaleString() },
				{ label: 'Execution End Time', value: new Date( runInfos.endedTestsAt ).toLocaleString() },
			],
		},
	} );
} );

