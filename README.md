# SauceDemo Automation Project

A Playwright-based browser automation project for testing the Sauce Demo login workflow and related UI behavior. The suite validates core authentication flows, validation errors, masking behavior, placeholders, and basic page element visibility using a reusable Page Object Model (POM) structure.

## Overview

This project automates user interactions against the public Sauce Demo application using Playwright and TypeScript. It is designed to demonstrate a clean test automation architecture with:

- Page Object Model (POM) for maintainability
- Shared user data fixtures and reusable test data
- Browser coverage across Chromium, Firefox, and WebKit
- Authentication setup for session reuse
- Validation of login edge cases and expected error states

## Scope

The current automated test coverage focuses primarily on the login experience and includes:

- successful login with valid credentials
- invalid username and password cases
- invalid casing scenarios
- required field validation
- leading/trailing spaces, internal spaces, long strings, Unicode, and emoji inputs
- password masking and placeholder verification
- initial page element visibility checks
- dismissible error alert behavior

## Limitations

This project is intentionally scoped to the public Sauce Demo demo site and is not a full end-to-end test suite for all e-commerce flows. Key limitations include:

- Only the login-related flows are covered at the moment
- Assertions are focused on validation and frontend behavior, not backend APIs
- The project is oriented toward UI automation and browser behavior rather than performance or security testing
- Test data is intentionally limited to the login scenarios defined in the suite

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model pattern

## Project Structure

```text
saucedemo/
├── docs/
│   └── test_cases.md
├── fixtures/
│   └── pom.ts
├── pages/
│   ├── DashboardPage.ts
│   └── LoginPage.ts
├── test-data/
│   └── users.json
├── tests/
│   ├── auth.setup.ts
│   ├── dashboard.spec.ts
│   └── login.spec.ts
├── utils/
│   └── helpers.ts
├── LICENSE.md
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
└── package-lock.json
```

### Key directories

- `pages/`: page-specific actions and selectors for the application
- `fixtures/`: Playwright test fixtures and shared setup objects
- `tests/`: spec files for login/authentication and related flows
- `test-data/`: centralized test input data used by the suite
- `utils/`: helper functions for data retrieval and reuse
- `docs/`: supporting project documentation

## Prerequisites

Before running the tests, ensure the following are installed:

- Node.js 18 or later
- npm or another Node package manager

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running the Tests

Run the full suite:

```bash
npm test
```

Run tests in UI mode:

```bash
npm run ui
```

Run a single test file:

```bash
npx playwright test tests/login.spec.ts
```

Run with a specific browser project:

```bash
npx playwright test --project=chromium
```

## Authentication and Browser Setup

The project includes a setup file that authenticates a user and stores browser context state. This allows test suites to reuse the authenticated session when needed.

The Playwright configuration defines multiple browser projects:

- Chromium
- Firefox
- WebKit

The base URL is configured as:

```text
https://saucedemo.com
```

## Test Data

The shared login payloads are stored in `test-data/users.json` and are consumed through the login page object. This allows the tests to use centralized, consistent user data for both valid and invalid scenarios.

## Browser and Environment Notes

- Tests are configured to use a real browser context against the Sauce Demo site
- Trace capture is enabled on first retry to simplify debugging failed runs
- The suite is designed for local execution and can be extended for CI environments

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

## Contributing

Contributions are welcome. To propose changes:

1. Fork the repository
2. Create a feature branch
3. Make your updates
4. Run the relevant Playwright tests
5. Submit a pull request with a clear summary of the changes

## Notes

This project is a practical example of a maintainable Playwright test automation architecture for a public demo application. It is suitable as a starting point for additional feature coverage, CI integration, and more advanced automation workflows.
