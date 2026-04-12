// This file represents the Login Page
// We use Page Object Model to keep tests clean and reusable

class LoginPage {
  constructor(page) {
    this.page = page;

    // Define locators (elements on the page)
    // Using data-test attributes = stable selectors (BEST PRACTICE)
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Navigate to login page
  async goto() {
    await this.page.goto('/');
  }

  // Perform login action
  async login(user, pass) {
    await this.username.fill(user); // Enter username
    await this.password.fill(pass); // Enter password
    await this.loginButton.click(); // Click login
  }
}

module.exports = { LoginPage };
