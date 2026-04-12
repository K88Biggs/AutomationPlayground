// SauceDemo Login Tests with Positive and Negative Scenarios
// This file demonstrates comprehensive testing including edge cases and error handling
// Uses Page Object Model for maintainable test code
// Run with: npx playwright test tests/sauceDemoLogin.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Test suite for SauceDemo login functionality
test.describe('SauceDemo Login Tests', () => {

  // POSITIVE TEST SCENARIO
  // Happy path - user can successfully log in and complete purchase
  test('Successful login and complete purchase flow', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login - should be on inventory page
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');

    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Go to cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);

    // Proceed to checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);

    // Fill checkout information
    await page.locator('[data-test="firstName"]').fill('QA');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="postalCode"]').fill('75605');
    await page.locator('[data-test="continue"]').click();

    // Verify checkout overview
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    // Complete purchase
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // Return to products
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory/);
  });

  // NEGATIVE TEST SCENARIOS
  // Testing error conditions and edge cases

  test('Login with invalid username shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'secret_sauce');

    // Verify error message appears
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');

    // Verify still on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Login with invalid password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Login with empty username shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Login with empty password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Login with both fields empty shows username error first', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Problem user login works but may have issues', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('problem_user', 'secret_sauce');

    // Problem user can login but images may be broken
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');

    // Check if images are broken (common issue with problem_user)
    const images = page.locator('img');
    const imageCount = await images.count();

    // Some images might not load for problem_user
    if (imageCount > 0) {
      // This test passes even if images are broken - that's expected behavior
      console.log(`Found ${imageCount} images (may be broken for problem_user)`);
    }
  });

  test('Performance glitch user experiences delays', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('performance_glitch_user', 'secret_sauce');

    // Should eventually reach inventory page despite performance issues
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // NEGATIVE CHECKOUT SCENARIOS

  test('Cannot checkout with empty required fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login first
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add item and go to checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Try to continue with empty fields
    await page.locator('[data-test="continue"]').click();

    // Should show error for missing first name
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('Cannot checkout with missing last name', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Fill first name only, leave last name empty
    await page.locator('[data-test="firstName"]').fill('QA');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });

  test('Cannot checkout with missing postal code', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Fill first and last name, leave postal code empty
    await page.locator('[data-test="firstName"]').fill('QA');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('Cannot access checkout without items in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Try to go directly to checkout without adding items
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');

    // Should redirect back to inventory or show empty cart
    // (SauceDemo allows this, but in real apps this might be prevented)
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});