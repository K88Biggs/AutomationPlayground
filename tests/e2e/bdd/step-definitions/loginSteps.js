const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout
} = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('../../../../src/ui/pages/LoginPage');

setDefaultTimeout(30 * 1000);

Before(async function() {
  this.browser = await chromium.launch({ headless: true });
  this.page = await this.browser.newPage();
  await this.page.goto('https://www.saucedemo.com');
  this.loginPage = new LoginPage(this.page);
});

After(async function() {
  if (this.page) {
    await this.page.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});

Given('I navigate to the login page', async function() {
  await this.page.goto('https://www.saucedemo.com');
});

When(
  'I login with username {string} and password {string}',
  async function(username, password) {
    await this.loginPage.login(username, password);
  }
);

Then('I should see the products page', async function() {
  await this.page.waitForSelector('.title', { timeout: 10000 });

  const title = await this.page.locator('.title').textContent();

  if (title !== 'Products') {
    throw new Error(`Expected "Products" but got "${title}"`);
  }
});

Then('the URL should contain {string}', async function(urlPart) {
  const currentURL = this.page.url();

  if (!currentURL.includes(urlPart)) {
    throw new Error(`Expected URL to contain "${urlPart}" but got "${currentURL}"`);
  }
});

Then('I should see the error message {string}', async function(expectedMessage) {
  const errorText = await this.loginPage.errorMessage.textContent();

  if (!errorText.includes(expectedMessage)) {
    throw new Error(
      `Expected error message containing "${expectedMessage}" but got "${errorText}"`
    );
  }
});

Then(
  'I should see the error message containing {string}',
  async function(expectedMessage) {
    const errorText = await this.loginPage.errorMessage.textContent();

    if (!errorText.includes(expectedMessage)) {
      throw new Error(
        `Expected error message containing "${expectedMessage}" but got "${errorText}"`
      );
    }
  }
);
