Feature: Validations on Header and Footer
    Background: Click on TLS logo
        Given User clicks on TLS Logo
    @sanity
    Scenario: Verify Social media buttons and links are visible on Header
        Then Validate the Social media icons and its links

    @sanity
    Scenario: Verify Subscribe,Login button and search icon are visible
        Then Validate Subscribe,Login button and search icon are visible

    @sanity
    Scenario: Verify Archive icon is visible
        Then Validate Archive icon is visible

    @sanity
    Scenario: Verify Shop icon is visible
        Then Validate Shop icon is visible

    @sanity
    Scenario: Verify Explore on Header
        Then Validate Explore title

    @sanity
    Scenario: Verify Explore Categories
        Then Validate Explore title and categories
  
    Scenario: Verify some links in the NEW TO THE TLS? page
        When User navigates to new to tls page
        Then Validate all links in the page

    @sanity
    Scenario: Valiate Footer logo and its main topics
        Then Valiate Footer logo and its topics

    @sanity
    Scenario: Validate Terms and conditions
        Then Validate Terms and conditions, Privacy and Cookie

    @sanity
    Scenario: Validate Podcasts
        Then Validate Apple Podcasts, Spotify and Google Podcasts

    @sanity
    Scenario: Validate Aboutus
      Then Validate page is navigates to Aboutus and its has header and logo
      
    @sanity
    Scenario: Validate the Utags and Tealium check
        And Validate Utag data values
        And Validate appropriate Tealium JS is loading for each environment in home page

