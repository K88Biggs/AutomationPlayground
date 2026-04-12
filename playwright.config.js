// Playwright configuration file
// This controls how tests run (browser, timeouts, reporting, etc.)
// Documentation: https://playwright.dev/docs/test-configuration

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Directory where test files are located
  testDir: './tests',

  // Global test configuration applied to all tests
  use: {
    // Run browser in headless mode (no visible UI)
    // Set to false to see browser during test execution
    headless: true,

    // Base URL for all tests - saves typing in individual tests
    baseURL: 'https://www.saucedemo.com',

    // Capture screenshots only when tests fail
    // Options: 'on', 'off', 'only-on-failure'
    screenshot: 'only-on-failure',

    // Record video only for failed tests
    // Options: 'on', 'off', 'retain-on-failure', 'on-first-retry'
    video: 'retain-on-failure'
  },

  // Test reporting configuration
  // Generates HTML reports in playwright-report/ folder
  reporter: [['html']]
});
