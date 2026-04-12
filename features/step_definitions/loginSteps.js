// Step definitions for login.feature
// This file maps Gherkin steps to actual test code
// Each step definition corresponds to a Given/When/Then in the feature file
// Uses Playwright for browser automation and POM for page interactions

const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

// Set timeout for all steps (30 seconds to handle browser startup)
setDefaultTimeout(30 * 1000);

// Setup - runs before each scenario
Before(async function() {
  // Launch Chromium browser in headless mode
  this.browser = await chromium.launch({ headless: true });

  // Create new browser page
  this.page = await this.browser.newPage();

  // Navigate to the application
  await this.page.goto('https://www.saucedemo.com');

  // Initialize Page Object Model
  this.loginPage = new LoginPage(this.page);
});

// Cleanup - runs after each scenario
After(async function() {
  // Close browser page if it exists
  if (this.page) {
    await this.page.close();
  }

  // Close browser if it exists
  if (this.browser) {
    await this.browser.close();
  }
});

// Given step - sets up initial state (navigation handled in Before hook)
Given('I navigate to the login page', async function() {
  // Navigation already done in Before hook, but step is here for clarity
  await this.page.goto('https://www.saucedemo.com');
});

// When step - performs the login action
When('I login with username {string} and password {string}', async function(username, password) {
  // Use Page Object Model to perform login
  await this.loginPage.login(username, password);
});

// Then step - verifies successful login (products page visible)
Then('I should see the products page', async function() {
  // Wait for title element to be visible
  await this.page.waitForSelector('.title', { timeout: 10000 });

  // Get the title text
  const title = await this.page.locator('.title').textContent();

  // Assert title is "Products"
  if (title !== 'Products') {
    throw new Error(`Expected "Products" but got "${title}"`);
  }
});

// Then step - verifies URL contains expected text
Then('the URL should contain {string}', async function(urlPart) {
  // Get current page URL
  const currentURL = this.page.url();

  // Check if URL contains the expected part
  if (!currentURL.includes(urlPart)) {
    throw new Error(`Expected URL to contain "${urlPart}" but got "${currentURL}"`);
  }
});

// Then step - verifies exact error message
Then('I should see the error message {string}', async function(expectedMessage) {
  // Get error message text from page
  const errorText = await this.loginPage.errorMessage.textContent();

  // Check if error message contains expected text
  if (!errorText.includes(expectedMessage)) {
    throw new Error(`Expected error message containing "${expectedMessage}" but got "${errorText}"`);
  }
});

// Then step - verifies error message contains partial text
Then('I should see the error message containing {string}', async function(expectedMessage) {
  // Get error message text from page
  const errorText = await this.loginPage.errorMessage.textContent();

  // Check if error message contains expected text
  if (!errorText.includes(expectedMessage)) {
    throw new Error(`Expected error message containing "${expectedMessage}" but got "${errorText}"`);
  }
});
