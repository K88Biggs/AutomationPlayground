# AutomationPlayground

AutomationPlayground is a Playwright and Cucumber test automation repo organized by test type and reusable support code.

## Framework Overview

- `@playwright/test` is used for browser automation and API testing.
- `@cucumber/cucumber` provides BDD support for Gherkin feature files and step definitions.
- `@babel/register` is used so the Cucumber test flow can load modern JavaScript cleanly.
- The framework uses the Page Object Model to keep UI interactions reusable and easier to maintain.

## What This Framework Covers

- End-to-end UI login and checkout scenarios
- Negative-path validation for login and checkout
- API test coverage under `tests/api`
- BDD scenarios under `tests/e2e/bdd`
- HTML reporting for both Playwright and Cucumber runs

## Project Structure

```text
AutomationPlayground/
|-- src/
|   `-- ui/
|       `-- pages/
|           `-- LoginPage.js
|-- tests/
|   |-- api/
|   |   |-- delete.spec.js
|   |   `-- posts.spec.js
|   |-- e2e/
|   |   |-- bdd/
|   |   |   |-- features/
|   |   |   |   `-- login.feature
|   |   |   `-- step-definitions/
|   |   |       `-- loginSteps.js
|   |   `-- playwright/
|   |       |-- login.spec.js
|   |       |-- login_simple.spec.js
|   |       `-- sauceDemoLogin.spec.js
|   `-- fixtures/
|       |-- api.js
|       |-- checkout.js
|       `-- users.js
|-- cucumber.js
|-- playwright.config.js
|-- package.json
`-- README.md
```

## Design Patterns Used

### Page Object Model

Reusable page actions are centralized in [src/ui/pages/LoginPage.js](/C:/Users/KimBiggs/AutomationPlayground/src/ui/pages/LoginPage.js) so test files stay focused on behavior and assertions.

### BDD Layer

Business-readable scenarios live in [tests/e2e/bdd/features/login.feature](/C:/Users/KimBiggs/AutomationPlayground/tests/e2e/bdd/features/login.feature), while the automation logic is implemented in [tests/e2e/bdd/step-definitions/loginSteps.js](/C:/Users/KimBiggs/AutomationPlayground/tests/e2e/bdd/step-definitions/loginSteps.js).

### Playwright Configuration

The framework is configured in [`playwright.config.js`](/c:/Users/KimBiggs/AutomationPlayground/playwright.config.js) with:

- `https://www.saucedemo.com` as the base URL for UI coverage
- headless browser execution by default
- screenshots captured on failure
- video retained on failure
- separate Playwright projects for `e2e` and `api`

### Cucumber Configuration

The BDD runner is configured in [`cucumber.js`](/c:/Users/KimBiggs/AutomationPlayground/cucumber.js) with:

- feature discovery from `tests/e2e/bdd/features/**/*.feature`
- step definition loading from `tests/e2e/bdd/step-definitions/**/*.js`
- Babel registration for runtime support
- progress-bar console output
- HTML report generation to `reports/cucumber/cucumber-report.html`
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
npm run test:e2e
npm run test:api
npm run headed
npm run report
```

## Command Details

- `npm test` runs all Playwright projects.
- `npm run test:bdd` runs the same Cucumber BDD flow explicitly.
- `npm run test:e2e` runs browser-based Playwright coverage under `tests/e2e/playwright`.
- `npm run test:api` runs API-focused Playwright coverage under `tests/api`.
- `npm run headed` runs the Playwright end-to-end suite with the browser visible.
- `npm run report` opens the Playwright HTML report.

## Reporting

- Playwright generates HTML output in `playwright-report/`.
- Cucumber generates an HTML report in `reports/cucumber/cucumber-report.html`.
- Failure evidence includes screenshots and retained video for Playwright runs.

## Test Data and Fixtures

- Shared user accounts live in `tests/fixtures/users.js`.
- Checkout input data lives in `tests/fixtures/checkout.js`.
- API payloads and endpoint constants live in `tests/fixtures/api.js`.

## Current Coverage Highlights

- Successful SauceDemo login and purchase flow
- Invalid username and invalid password validation
- Empty field validation for login
- Locked user and performance-user coverage
- Checkout form validation for missing required data
- API tests for sample CRUD-style flows
