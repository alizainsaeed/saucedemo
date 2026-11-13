# Automated Test Cases

This page is the index for the automated case matrices. Each page documents the
case IDs, expected behavior, and Playwright tags for a part of the SauceDemo
shopping flow.

| Area                     | Coverage                                                                                                 | Test cases                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Authentication and login | Shared authenticated setup, successful and unsuccessful login, input validation, and login-page elements | [Authentication and login](./test_cases/login.md) |
| Inventory                | Cart actions, cart badge, navigation, logout, and product sorting                                        | [Inventory](./test_cases/inventory.md)            |
| Cart                     | Cart contents, item removal, checkout navigation, and menu actions                                       | [Cart](./test_cases/cart.md)                      |
| Checkout                 | Checkout form validation, order summary, completion, and PDF download                                    | [Checkout](./test_cases/checkout.md)              |

## Tags and status

- `@smoke` identifies the selected critical-path tests. These tests are also
  tagged `@regression`.
- `@regression` identifies tests included in the tagged regression run.
- `test.fixme` cases document known application behavior that does not currently
  meet the expected result. Playwright reports them as skipped until the issue
  is resolved and the test is re-enabled.

Run the smoke subset with `npm run test:smoke`, the tagged regression suite with
`npm run test:regression`, or the configured browser projects with `npm test`.
See the [documentation index](./README.md) for additional commands and suite
notes.
