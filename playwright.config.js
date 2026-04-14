// Playwright configuration file
// This controls how tests run (browser, timeouts, reporting, etc.)
// Documentation: https://playwright.dev/docs/test-configuration

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['html']],
  projects: [
    {
      name: 'e2e',
      testDir: './tests/e2e/playwright'
    },
    {
      name: 'api',
      testDir: './tests/api'
    }
  ]
});
