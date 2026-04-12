// Traditional Playwright test file using Page Object Model
// This demonstrates unit testing approach with POM pattern
// Run with: npm run test:unit

// Import Playwright test functions and expect assertions
const { test, expect } = require('@playwright/test');

// Import our Login Page class (Page Object Model)
const { LoginPage } = require('../pages/LoginPage');

// Group related tests together in a describe block
test.describe('SauceDemo Login Tests', () => {

  // Positive test case - happy path scenario
  test('User can login successfully', async ({ page }) => {
    // page is automatically provided by Playwright's test runner

    // Create instance of LoginPage with the browser page
    const loginPage = new LoginPage(page);

    // Navigate to the application
    await loginPage.goto();

    // Perform login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login by checking URL contains 'inventory'
    await expect(page).toHaveURL(/inventory/);

    // Verify we're on the products page by checking the title
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // Negative test case - testing error handling
  test('Locked out user sees error message', async ({ page }) => {
    // Create page object instance
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Attempt login with locked out user credentials
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Verify error message is displayed
    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out'
    );
  });

  // Functional test - testing cart functionality after login
  test('User can add item to cart', async ({ page }) => {
    // Create page object instance
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Assertion: Cart badge should show 1 item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

});
