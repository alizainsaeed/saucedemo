# SauceDemo Playwright Automation

[![Playwright CI](https://github.com/alizainsaeed/saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/alizainsaeed/saucedemo/actions/workflows/playwright.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)

## 1. Overview and Test Strategy

This repository automates browser-based checks of the [SauceDemo](https://www.saucedemo.com/) shopping application. The suite gives contributors a repeatable way to verify key user journeys and catch regressions across supported browsers.

### Framework and stack

- **Test type:** UI and end-to-end browser tests. There are no API or unit test suites in this repository.
- **Language:** TypeScript.
- **Runner and assertions:** Playwright Test (`@playwright/test`).
- **Architecture:** Page Object Model (POM), extended with a shared Playwright fixture.
- **Browsers:** Chromium, Firefox, and WebKit.
- **Reporter:** Playwright HTML reporter (served at https://alizainsaeed.github.io/saucedemo/).
- **Formatting:** Prettier.
- **CI:** GitHub Actions.

### Coverage and scope

The automated checks cover login success and validation, inventory display and sorting, cart actions, checkout validation and totals, navigation, and order completion/download behavior. The implemented cases are listed in [`docs/test_cases.md`](./docs/test_cases.md).

The suite currently does not cover APIs, accessibility audits, performance, security, or other applications/environments. Two checkout behaviors are marked as known application bugs with `test.fixme` in [`tests/checkout.spec.ts`](./tests/checkout.spec.ts): submitting checkout with Enter and validating that the postal code contains only numerals.

#### Coverage by page

| Page                  | Automated coverage                                                                                                                                                                                 | Scope and gaps                                                                                                                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Login                 | Successful and failed login, case sensitivity, empty and risky inputs, error dismissal, password masking, placeholders, and initial core elements ([`tests/login.spec.ts`](./tests/login.spec.ts)) | Covers the login form and its immediate feedback; account-management and authentication service behavior are outside this UI suite.                                  |
| Inventory             | Add/remove items, cart badge updates, menu and logout, and alphabetical and price sorting ([`tests/inventory.spec.ts`](./tests/inventory.spec.ts))                                                 | Sorting is checked for all four available directions. Broader product-detail behavior is not covered.                                                                |
| Cart                  | Item list, item removal and badge update, checkout and continue-shopping navigation, menu, inventory navigation, and logout ([`tests/cart.spec.ts`](./tests/cart.spec.ts))                         | Product-name navigation is checked for its URL and displayed name only; the product-detail page is not comprehensively tested.                                       |
| Checkout - step one   | Required-field validation, error dismissal, cancel/cart navigation, menu, and cart count ([`tests/checkout.spec.ts`](./tests/checkout.spec.ts))                                                    | Enter-key submission and numeric-only postal-code validation are known application bugs and remain marked `test.fixme`. Other form validation rules are not covered. |
| Checkout - step two   | Cart item names and prices, item count, subtotal/tax/total, cancel/finish actions, cart navigation, menu, inventory navigation, and logout ([`tests/checkout.spec.ts`](./tests/checkout.spec.ts))  | Covers the order summary and primary navigation/actions; additional pricing rules and alternate cart contents are not covered.                                       |
| Checkout - completion | Cart badge reset, back-home navigation, order PDF download, cart navigation, menu, inventory navigation, and logout ([`tests/checkout.spec.ts`](./tests/checkout.spec.ts))                         | The PDF check verifies that a download occurs and its filename; PDF contents and other order details are not validated.                                              |

Automate a case when it exercises an important, repeatable user-visible behavior with a clear expected result and can run reliably against the test application. Keep exploratory, subjective, and environment-dependent checks manual unless they can be given stable, deterministic assertions.

## 2. Getting Started and Setup

### Prerequisites

- Node.js LTS (the CI workflow uses `lts/*`) and npm.
- Git.
- Playwright browser binaries. The installation steps below install them locally; Linux may also need Playwright's system dependencies.
- No globally installed Playwright CLI is required; commands use `npx`.

### Install

```bash
git clone https://github.com/alizainsaeed/saucedemo.git
cd saucedemo
npm ci
npx playwright install
```

On Linux, install the browser system dependencies as well:

```bash
npx playwright install --with-deps
```

No `.env` file or project-specific secret is required for the public SauceDemo target.

### First run

Run the login checks in Chromium to verify the local setup:

```bash
npx playwright test tests/login.spec.ts --project=chromium
```

The `chromium` project depends on the `setup` project, which logs in and saves an authenticated browser state before dependent tests run. The login spec clears that state for its own tests so it can check both valid and invalid login behavior.

### Run tests

```bash
npm test                    # Setup and all browser projects
npm run test:chromium       # Setup and Chromium
npm run test:firefox        # Setup and Firefox
npm run test:webkit         # Setup and WebKit
npx playwright test tests/cart.spec.ts --project=chromium
npm run ui                  # Setup, then open Playwright UI mode
npx playwright test --headed
```

The browser projects run in headless mode by default. Use `--headed` for a visible browser or `npm run ui` to select and inspect tests interactively.

## 3. Architecture and Directory Structure

```text
.
├── .github/workflows/  GitHub Actions workflow
├── .vscode/            Workspace editor settings
├── docs/               Test-case reference
├── fixtures/           Shared typed POM fixture
├── pages/              Page objects for login, inventory, cart, checkout
├── playwright/         Generated authentication state (ignored by Git)
├── test-data/          JSON user and item data
├── tests/              Setup and browser test specs
├── utils/              Test-data lookup and flow helpers
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

`playwright-report/` and `test-results/` are generated report and test-output directories and are ignored by Git.

### Page objects and fixtures

[`pages/BasePage.ts`](./pages/BasePage.ts) contains locators and actions shared across pages. The login, inventory, cart, and checkout page classes extend it and expose screen-specific locators and actions. Tests use the shared `pom` fixture from [`fixtures/pom.ts`](./fixtures/pom.ts), which creates page objects around Playwright's per-test `Page`.

Specs live in `tests/` and use Playwright's `test` and `expect` APIs. The `setup` project in [`playwright.config.ts`](./playwright.config.ts) creates an authenticated storage state at `playwright/.auth/session.json`; browser projects depend on setup and load that state. The generated state is excluded from version control.

### Test data

- [`test-data/users.json`](./test-data/users.json) contains the public demo-account inputs and login cases.
- [`test-data/items.json`](./test-data/items.json) contains product names and prices used by inventory, cart, and checkout tests.
- [`utils/helpers.ts`](./utils/helpers.ts) looks up user cases and provides cart/checkout setup helpers.

Data is imported from JSON; there is no database, CSV loader, or external test-data service.

## 4. Coding Standards and Guidelines

### Naming and style

- Name test files `*.spec.ts`; the authentication setup is `auth.setup.ts`.
- Use descriptive test names that state the behavior being checked. Group related checks with `test.describe`.
- Use PascalCase for page-object classes and camelCase for methods, locators, and variables.
- Use descriptive locator names and prefer accessible roles, labels, placeholders, and the configured `data-test` test IDs.
- Follow the existing TypeScript formatting (two spaces, single quotes, trailing commas). Run `npm run format` to format TypeScript files.
- The workflow targets `main` and `master`. No branch-name convention is configured in this repository.

### Test practices

- Assert observable outcomes with Playwright's `expect` matchers, such as URL, visibility, text, and element count.
- Prefer Playwright locators and auto-waiting assertions over fixed delays. Do not add hard-coded sleeps to mask timing problems.
- Use the page objects for screen interactions and shared helpers for repeatable test setup.
- Keep each test independent: establish its own preconditions and avoid relying on another test's changes. Playwright provides an isolated browser context per test; use the setup project's storage state where authentication is needed.
- Avoid implicit assumptions about order or shared cart state; assert the state relevant to the behavior under test.

### Adding a test

1. Add a `*.spec.ts` file in `tests/` or extend the spec for the relevant page.
2. Use the `test` and `expect` exports from `../fixtures/pom` when the test needs page objects.
3. Add or update a page object in `pages/` for reusable page-specific locators/actions.
4. Put reusable inputs in `test-data/` and access them through the existing helper patterns.
5. Set up any required state in the test or its `beforeEach`; do not depend on test execution order.
6. Assert the user-visible result, then run the test in at least one browser before opening a PR.

Example:

```ts
import { test, expect } from '../fixtures/pom';

test('shows the inventory after login', async ({ pom }) => {
  await pom.inventoryPage.goto();
  await expect(pom.inventoryPage.inventoryItems.first()).toBeVisible();
});
```

## 5. Configuration and Environment Management

### Environments

The base URL is currently fixed to `https://www.saucedemo.com` in [`playwright.config.ts`](./playwright.config.ts). There is no environment selector, `.env` loader, or `BASE_URL` override. To run against another deployment, update the configured `baseURL` and confirm that test data and expected page behavior apply to that deployment.

### Playwright settings

- **Projects:** `setup`, `chromium`, `firefox`, and `webkit`; each browser project depends on `setup`.
- **Parallelism:** Tests may run fully in parallel. Locally, Playwright chooses the worker count; when `CI` is set, the config uses one worker.
- **Retries:** Zero locally; two in CI.
- **Focused tests:** Disallowed when `CI` is set (`forbidOnly`).
- **Headless mode:** Playwright's default; use `--headed` to show the browser.
- **Timeouts:** No project-specific test or action timeout is set; Playwright defaults apply.
- **Test ID attribute:** `data-test`.

### Secrets

The current public demo suite needs no private credentials or API tokens. The sample account values in `test-data/users.json` are test inputs for SauceDemo, not production credentials. Never commit private credentials. If private test accounts or services are introduced, supply secrets through the CI platform's secret store or local environment variables, and explicitly configure the test code to read them; this repository does not currently load `.env` files.

## 6. Reporting, Logs, and Debugging

### Reports and failure artifacts

- The HTML report is generated in `playwright-report/`. Open the latest report with:

  ```bash
  npx playwright show-report
  ```

- Test output is written to `test-results/`.
- Locally, tracing is configured to be retained on failure, with screenshots and snapshots included in the trace. Open a trace with `npx playwright show-trace <path-to-trace.zip>`.
- CI disables trace capture. Standalone screenshots, video recording, and browser-console log collection are not configured.
- The setup project's storage state is written under `playwright/.auth/` and is ignored by Git.

### Troubleshooting

- **Browser executable missing:** Run `npx playwright install`; on Linux, use `npx playwright install --with-deps`.
- **Tests fail before browser specs start:** Run the `setup` project directly with `npx playwright test --project=setup` and inspect the login result and `test-results/`.
- **Timeout or flakiness:** Check the failing locator and trace, prefer auto-waiting Playwright assertions, and confirm the target site is reachable. Do not hide timing issues with fixed sleeps.
- **Unexpected authentication state:** Rerun the setup project to regenerate `playwright/.auth/session.json`. Do not commit the generated state.
- **TypeScript or dependency mismatch:** Use the committed lockfile with `npm ci`; after a deliberate dependency update, install browsers for the newly locked Playwright version.

## 7. CI/CD Integration and Maintenance

### GitHub Actions workflow

[`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml) runs on pushes and pull requests targeting `main` or `master` when one of the workflow's configured project paths changes. It checks out the repository, sets up the current Node.js LTS, runs `npm ci`, installs Playwright browsers and Linux dependencies, and executes `npx playwright test --fail-on-flaky-tests`.

After a successful push run, the workflow uploads `playwright-report/` as a GitHub Pages artifact and deploys it. Pull requests do not deploy the report; failed runs do not upload the Pages artifact. To publish reports, enable GitHub Pages with GitHub Actions as the repository's deployment source.

The workflow has no scheduled trigger. Documentation-only changes do not currently match its path filters.

### Dependency updates and maintenance

Dependencies are declared in `package.json` and pinned to the resolved versions by `package-lock.json`. Use `npm ci` for reproducible installs. For a dependency update, change the relevant dependency, update and commit the lockfile, install the matching Playwright browser binaries, and run the affected tests locally and through CI. No automated release or deprecation policy is defined in this project.

## License

This project is licensed under the MIT License. See [`LICENSE.md`](./LICENSE.md).
