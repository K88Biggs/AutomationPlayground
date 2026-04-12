# Feature file written in Gherkin syntax for BDD testing
# This describes business requirements in human-readable format
# Non-technical stakeholders can understand and contribute to these tests
# Run with: npm test

# Feature declaration - describes the functionality being tested
Feature: SauceDemo Login Functionality
  # User story format - describes who, what, and why
  As a user
  I want to log in to the SauceDemo application
  So that I can access the product inventory

  # Background runs before each scenario in this feature
  Background:
    Given I navigate to the login page

  # Scenario - describes a specific test case
  Scenario: User can login successfully with valid credentials
    # Given - sets up the initial state (handled by Background)
    # When - describes the action being performed
    When I login with username "standard_user" and password "secret_sauce"
    # Then - describes the expected outcome
    Then I should see the products page
    And the URL should contain "inventory"

  # Another scenario - testing error handling
  Scenario: Locked out user sees error message
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see the error message "Sorry, this user has been locked out"

  # Third scenario - testing invalid credentials
  Scenario: User cannot login with invalid password
    When I login with username "standard_user" and password "wrong_password"
    Then I should see the error message containing "Username and password do not match"
