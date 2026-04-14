const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/ui/pages/LoginPage');
const { users } = require('../../fixtures/users');

test.describe('SauceDemo Login Tests', () => {
  test('User can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Locked out user sees error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out'
    );
  });

  test('User can add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
