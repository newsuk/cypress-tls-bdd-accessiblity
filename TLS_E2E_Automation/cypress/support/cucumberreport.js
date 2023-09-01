const report = require("multiple-cucumber-html-reporter");



report.generate({
jsonDir: "cypress/cucumber-json", 
reportPath: "./cypress/cucumberreports/cucumber-htmlreport.html",
pageTitle:"TLS Healthcheck",
reportName:"TLS Healthcheck Report",
displayDuration:true,
durationInMS:true,
hideMetadata:true,
scenarioTimestamp: true,
launchReport: true,
ignoreBadJsonFile: true,
scenarioTimestamp: true,
customData: {
    title: 'TLS Healthcheck Info',
    data: [
        {label: 'Product', value:'The TLS'},
        {label: 'Test', value: 'Healthcheck'},
        {label: 'Date', value: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })},
        
    ]
}
});









