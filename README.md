# SauceDemo Automation Project

A Playwright-based browser automation suite for testing the public Sauce Demo application. The project covers login validation, browser session setup, and inventory interactions using a maintainable Page Object Model (POM) structure.

## Overview

This repository uses Playwright with TypeScript to automate key user flows on Sauce Demo. It is designed to demonstrate a clean test automation architecture with:

- Page Object Model for reusable interactions
- Shared test data fixtures and centralised user inputs
- Cross-browser coverage across Chromium, Firefox, and WebKit
- Reusable authenticated session state through Playwright setup
- Validation of login edge cases and UI behaviors
- Inventory page interaction checks for add/remove cart flows

## Scope

The automated coverage currently focuses on:

- successful login with valid credentials
- invalid username and password scenarios
- casing mismatch validation
- required field validation
- leading/trailing spaces, internal spaces, long strings, Unicode, and emoji inputs
- password masking and placeholder verification
- initial page element visibility checks
- dismissible error alert behavior
- inventory item discovery and cart actions

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model pattern
- ESLint and Prettier

## Project Structure

```text
saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   └── test_cases.md
├── fixtures/
│   └── pom.ts
├── pages/
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── test-data/
│   └── users.json
├── tests/
│   ├── auth.setup.ts
│   └── login.spec.ts
├── utils/
│   └── helpers.ts
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── LICENSE.md
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
├── package-lock.json
└── .vscode/
```

### Key directories

- `pages/`: page-specific actions and selectors for the application
- `fixtures/`: Playwright fixtures exposing shared page objects
- `tests/`: browser test files and setup flow
- `test-data/`: reusable username/password and expected-result data
- `utils/`: helper functions used by tests
- `docs/`: supporting project documentation
- `.github/workflows/`: CI configuration for running Playwright tests

## Prerequisites

Before running the suite, ensure the following are installed:

- Node.js 18 or later
- npm or another package manager

## Installation

Clone the repository and install dependencies:

```bash
npm install
npx playwright install --with-deps
```

## Running the Tests

Run the full multi-browser suite:

```bash
npm test
```

Run the UI mode for interactive debugging:

```bash
npm run ui
```

Format project files:

```bash
npm run format
```

Run a single test file:

```bash
npx playwright test tests/login.spec.ts
```

Run a specific browser project:

```bash
npx playwright test --project=chromium
```

Run the setup project independently:

```bash
npx playwright test --project=setup
```

## Authentication and Browser Setup

The project includes a setup test that authenticates a valid user and saves the browser context state to `playwright/.auth/session.json` for reuse in later tests.

The Playwright configuration defines:

- a `setup` project for authentication
- `chromium`, `firefox`, and `webkit` execution projects
- a shared base URL of:

```text
https://saucedemo.com
```

## Test Data

Shared login scenarios are stored in `test-data/users.json` and resolved through `utils/helpers.ts`. This keeps test inputs consistent across multiple spec files and makes adding new validation cases straightforward.

## CI Notes

The repository includes a GitHub Actions workflow in `.github/workflows/playwright.yml` that:

- installs Node.js
- installs project dependencies
- installs Playwright browsers
- runs the Playwright suite on push and pull request events
- uploads the HTML report as a workflow artifact

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

## Contributing

Contributions are welcome. To propose changes:

1. Fork the repository
2. Create a feature branch
3. Make your updates
4. Run the relevant Playwright tests
5. Submit a pull request with a clear summary of the change

## Notes

This project is a practical example of a maintainable Playwright automation suite for a public demo application. It is suitable as a starting point for additional feature coverage, CI pipelines, and more advanced browser automation scenarios.
