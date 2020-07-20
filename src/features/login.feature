Feature: Navigation between sites works properly

  Scenario: Login to Home Site Page
    Given I login to SharePoint with given credentials
    And I am on the home page
    When I click on "Start" button
    Then I shoulbe be redirected to testtask page in new tab
