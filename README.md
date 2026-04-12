# AutomationPlayground

AutomationPlayground is a UI and API test automation framework built with Playwright and Cucumber for practicing modern test design patterns against the SauceDemo sample application.

## Framework Overview

- `@playwright/test` is used for browser automation and API testing.
- `@cucumber/cucumber` provides BDD support for Gherkin feature files and step definitions.
- `@babel/register` is used so the Cucumber test flow can load modern JavaScript cleanly.
- The framework uses the Page Object Model to keep UI interactions reusable and easier to maintain.

## What This Framework Covers

- End-to-end UI login and checkout scenarios
- Negative-path validation for login and checkout
- API test coverage for sample endpoints under `tests/api`
- BDD scenarios with feature files under `features`
- HTML reporting for both Playwright and Cucumber runs

## Project Structure

```text
AutomationPlayground/
|-- features/
|   |-- login.feature
|   `-- step_definitions/
|       `-- loginSteps.js
|-- pages/
|   `-- LoginPage.js
|-- tests/
|   |-- sauceDemoLogin.spec.js
|   |-- login.spec.js
|   |-- login_simple.spec.js
|   `-- api/
|       |-- posts.spec.js
|       `-- delete.spec.js
|-- cucumber.js
|-- playwright.config.js
|-- package.json
`-- README.md
```

## Design Patterns Used

### Page Object Model

Reusable page actions are centralized in [`pages/LoginPage.js`](/c:/Users/KimBiggs/AutomationPlayground/pages/LoginPage.js) so test files stay focused on behavior and assertions.

### BDD Layer

Business-readable scenarios live in [`features/login.feature`](/c:/Users/KimBiggs/AutomationPlayground/features/login.feature), while the automation logic is implemented in [`features/step_definitions/loginSteps.js`](/c:/Users/KimBiggs/AutomationPlayground/features/step_definitions/loginSteps.js).

### Playwright Configuration

The framework is configured in [`playwright.config.js`](/c:/Users/KimBiggs/AutomationPlayground/playwright.config.js) with:

- `https://www.saucedemo.com` as the base URL
- headless browser execution by default
- screenshots captured on failure
- video retained on failure
- HTML reporting enabled

### Cucumber Configuration

The BDD runner is configured in [`cucumber.js`](/c:/Users/KimBiggs/AutomationPlayground/cucumber.js) with:

- step definition loading from `features/step_definitions/**/*.js`
- Babel registration for runtime support
- progress-bar console output
- HTML report generation to `cucumber-report.html`
- 30-second default step timeout

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

## Available Test Commands

```bash
npm test
npm run test:bdd
npm run test:unit
npm run test:api
npm run headed
npm run report
```

## Command Details

- `npm test` runs the Cucumber BDD suite.
- `npm run test:bdd` runs the same Cucumber BDD flow explicitly.
- `npm run test:unit` runs the Playwright test suite in the `tests` folder.
- `npm run test:api` runs the API-focused Playwright spec for posts.
- `npm run headed` runs Playwright tests with the browser visible.
- `npm run report` opens the Playwright HTML report.

## Reporting

- Playwright generates HTML output in `playwright-report/`.
- Cucumber generates an HTML report in `cucumber-report.html`.
- Failure evidence includes screenshots and retained video for Playwright runs.

## Current Coverage Highlights

- Successful SauceDemo login and purchase flow
- Invalid username and invalid password validation
- Empty field validation for login
- Locked user and performance-user coverage
- Checkout form validation for missing required data
- API tests for sample CRUD-style flows

## Notes

- The framework currently targets SauceDemo as a stable practice application.
- Generated folders such as `node_modules/`, `playwright-report/`, and `test-results/` are excluded from source control.
- This setup is a good base for scaling into CI, cross-browser execution, and richer API coverage.
