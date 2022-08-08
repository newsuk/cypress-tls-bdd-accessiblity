
Feature: Validations on Search page
        Background: User is clicks on TLS logo
                Given User is clicks on TLS logo
                When User click on search icon
                Then User should be able to navigate to Search page
        @sanity
        Scenario: Navigate to Search page and Verify text using search bar
                Then Entered the text and validate the text is displayed as entered

       @focus
        Scenario: Verify Book name by search bar
                Then Search the Book name and validate the its results

       @focus
        Scenario: Verify Author name by search bar
                Then Search the Author name and validate the its results

        
        Scenario: Verify Article name by search bar
                Then Search the Article and validate the its results

        @sanity
        Scenario: Verify Show more button and its count in search page
                Then Verify Show more button and its count in search page
        @sanity
        Scenario: Validate Tealium check
                Then Validate appropriate Tealium JS is loading for each environment in single search page








