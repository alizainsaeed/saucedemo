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

### Project structure

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
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Each browser-specific command also selects the `setup` project so authentication is prepared before the browser tests run. The same applies to `npm test` and `npm run ui`.

Run the setup project independently:

```bash
npx playwright test --project=setup
```

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
