// Simple Playwright test without Page Object Model
// This demonstrates a basic approach without abstraction layers
// Good for quick tests or when POM would be overkill
// Run with: npx playwright test tests/login_simple.spec.js

// Import Playwright's test and expect functions
const { test, expect } = require('@playwright/test');

// Single test case - no describe block needed for simple tests
test('user can log in successfully', async ({ page }) => {
  // page parameter is automatically injected by Playwright

  // Navigate directly to the login page
  await page.goto('https://www.saucedemo.com/');

  // Fill in the username field using placeholder text
  await page.getByPlaceholder('Username').fill('standard_user');

  // Fill in the password field using placeholder text
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Click the login button using its accessible name
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert that URL contains 'inventory.html' (successful login redirect)
  await expect(page).toHaveURL(/inventory.html/);

  // Assert that 'Products' text is visible on the page
  await expect(page.getByText('Products')).toBeVisible();
});