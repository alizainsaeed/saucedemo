# Test Documentation

This folder describes the browser test suite and provides page-by-page
references to the automated test cases.

## Start here

- [Automated test cases](./test_cases.md) is the index to the case matrices.
- [Authentication and login cases](./test_cases/login.md) covers the shared
  login setup and the login page.
- [Inventory cases](./test_cases/inventory.md) covers products, cart updates,
  navigation, and sorting.
- [Cart cases](./test_cases/cart.md) covers the populated cart and its actions.
- [Checkout cases](./test_cases/checkout.md) covers all checkout stages and
  documents the known application issues marked `test.fixme`.

## Running the suite

Install the project's dependencies and Playwright browsers before running
tests:

```bash
npm ci
npx playwright install
```

Use the scripts defined in `package.json`:

| Command                   | What it runs                              |
| ------------------------- | ----------------------------------------- |
| `npm test`                | Setup and all configured browser projects |
| `npm run test:smoke`      | Tests tagged `@smoke`                     |
| `npm run test:regression` | Tests tagged `@regression`                |
| `npm run test:chromium`   | Setup and Chromium                        |
| `npm run test:firefox`    | Setup and Firefox                         |
| `npm run test:webkit`     | Setup and WebKit                          |
| `npm run quality`         | Lint, type-check, and formatting checks   |

To run one spec in one browser, for example:

```bash
npx playwright test tests/cart.spec.ts --project=chromium
```

## How the tests are organized

- Specs are in `tests/`; reusable page objects are in `pages/`.
- The `setup` project logs in with the public demo account and saves browser
  storage state for the browser projects. Login-page tests clear that state so
  they can exercise the unauthenticated flow.
- Test inputs and expected product prices are kept in `test-data/`.
- Cart and checkout specs seed the required cart state before testing their
  page-specific behavior.
- Each test has an isolated browser context. Tests should establish their own
  preconditions rather than depend on execution order.
- Case IDs are included in test titles. `@smoke` tests are also tagged
  `@regression`.

## Results and known limits

Playwright writes the HTML report to `playwright-report/` and test output,
including retained failure traces, to `test-results/`. Open the report with
`npx playwright show-report`; inspect a trace with
`npx playwright show-trace <path-to-trace.zip>`.

The suite targets the public SauceDemo site, so its availability and behavior
are external dependencies. It covers browser-visible shopping flows; it is not
an API, accessibility, performance, or security test suite. For coverage gaps
and known application issues, see the page-specific matrices linked above.
