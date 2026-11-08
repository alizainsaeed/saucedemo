# SauceDemo Playwright Automation

[![Playwright CI](https://github.com/alizainsaeed/saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/alizainsaeed/saucedemo/actions/workflows/playwright.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)

## Overview

This repository contains browser-based automated tests for the [SauceDemo](https://www.saucedemo.com/) web application. The suite uses Playwright Test with TypeScript and a Page Object Model (POM) to cover login validation, initial page content, inventory browsing, and shopping-cart actions.

Coverage includes successful and unsuccessful login attempts, input validation and edge cases, password masking, error-alert behavior, and adding or removing inventory items from the cart. Shared test data and a setup project provide reusable inputs and authenticated browser state for the browser projects.

## Tech Stack & Tools

- **Language:** TypeScript
- **Test framework and assertions:** Playwright Test (`@playwright/test`)
- **Browsers:** Chromium, Firefox, and WebKit
- **Test architecture:** Page Object Model and shared Playwright fixtures
- **Reporter:** Playwright HTML reporter
- **Formatting:** Prettier
- **CI:** GitHub Actions

## Project Directory Structure

```text
.
├── .github/workflows/  # GitHub Actions workflow
├── docs/               # Supporting test documentation
├── fixtures/           # Shared page-object fixtures
├── pages/              # Page objects for login, inventory, and cart
├── playwright/         # Generated authentication state (git-ignored)
├── test-data/          # Test users and item data
├── tests/              # Setup and browser test specs
├── utils/              # Shared test helpers
├── playwright.config.ts
├── package.json
└── README.md
```

`playwright-report/` and `test-results/` are generated output directories; they are git-ignored.

## Prerequisites

- Node.js 18 or later (the CI workflow uses the current Node.js LTS release)
- npm

Playwright's browser binaries must also be installed before running tests.

## Setup & Installation

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/alizainsaeed/saucedemo.git
cd saucedemo
npm ci
npx playwright install
```

On Linux CI or a Linux machine where browser system dependencies are not installed, use:

```bash
npx playwright install --with-deps
```

## Environment Variables

No `.env` file or project-specific secrets are required. The base URL is currently set to `https://www.saucedemo.com` in `playwright.config.ts`.

Playwright uses the standard `CI` environment variable: when it is set, the configuration forbids focused tests, retries failed tests twice, and limits workers to one. GitHub Actions sets this variable automatically.

## Running Tests

Run the complete suite against Chromium, Firefox, and WebKit:

```bash
npm test
```

Run against a single browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Each command runs the setup project first to create the authenticated session used by browser tests. To run setup by itself:

```bash
npx playwright test --project=setup
```

Run one test file, open the interactive UI, or launch tests in headed mode:

```bash
npx playwright test tests/login.spec.ts
npm run ui
npx playwright test --headed
```

## Test Reports & Artifacts

- **HTML report:** generated in `playwright-report/`; open it with `npx playwright show-report`.
- **Test output and failure artifacts:** stored in `test-results/`.
- **Trace, screenshots, and snapshots:** tracing is enabled and retained on failure. Open a generated trace with `npx playwright show-trace <path-to-trace.zip>`.
- **Authentication state:** generated in `playwright/.auth/` by the setup project and excluded from version control.

## CI/CD Integration

The GitHub Actions workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master` when relevant project files change. It checks out the repository, sets up Node.js LTS, installs npm dependencies and Playwright browsers, then runs the full test suite. The `playwright-report/` directory is uploaded as a workflow artifact with a 30-day retention period, including when a run is cancelled.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md).
