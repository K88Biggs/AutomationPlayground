Feature: SauceDemo Login Functionality
  As a user
  I want to log in to the SauceDemo application
  So that I can access the product inventory

  Background:
    Given I navigate to the login page

  Scenario: User can login successfully with valid credentials
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page
    And the URL should contain "inventory"

  Scenario: Locked out user sees error message
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see the error message "Sorry, this user has been locked out"

  Scenario: User cannot login with invalid password
    When I login with username "standard_user" and password "wrong_password"
    Then I should see the error message containing "Username and password do not match"
