# Checkout Test Cases

Checkout coverage is organized around the three user-facing stages: entering
customer details, reviewing the order, and viewing the completed order.

**Automation:** [`tests/checkout.spec.ts`](../../tests/checkout.spec.ts)  
**Page object:** [`pages/CheckoutPage.ts`](../../pages/CheckoutPage.ts)  
**Setup helpers:** [`seedData`](../../utils/helpers.ts) and
[`seedCompletedData`](../../utils/helpers.ts)  
**Product data:** [`test-data/items.json`](../../test-data/items.json)

## Checkout step one

The step-one cases start with a populated cart and check required-field
validation, dismissal of the validation message, and navigation.

| Case ID | Automated behavior | Tags |
| --- | --- | --- |
| `CHECKOUT_S1_01` | Enter-key form submission; known application bug, marked `test.fixme` | `@regression` |
| `CHECKOUT_S1_02` | First name is required | `@regression` |
| `CHECKOUT_S1_03` | Last name is required | `@regression` |
| `CHECKOUT_S1_04` | Postal code is required | `@regression` |
| `CHECKOUT_S1_05` | Postal code accepts numerals only; known application bug, marked `test.fixme` | `@regression` |
| `CHECKOUT_S1_06` | Cancel returns to cart | `@regression` |
| `CHECKOUT_S1_08` | Checkout step-one hamburger menu opens | `@regression` |
| `CHECKOUT_S1_09` | Cart icon opens cart | `@regression` |
| `CHECKOUT_S1_10` | Checkout validation message can be dismissed | `@regression` |
| `CHECKOUT_S1_11` | Cart counter is correct | `@regression` |

`CHECKOUT_S1_01` and `CHECKOUT_S1_05` are marked `test.fixme` because the
current application behavior does not match the expected behavior: pressing
Enter navigates incorrectly, and the postal-code field accepts letters.

## Checkout step two

The step-two cases seed the cart and check the order summary, displayed item
prices, totals, and the primary checkout and navigation actions. The expected
subtotal is based on `test-data/items.json`; the tax assertion uses the
application's current 8% rate.

| Case ID | Automated behavior | Tags |
| --- | --- | --- |
| `CHECKOUT_S2_01` | Checkout step-two hamburger menu opens | `@regression` |
| `CHECKOUT_S2_02` | Checkout menu navigates to inventory | `@regression` |
| `CHECKOUT_S2_03` | User can log out from checkout | `@regression` |
| `CHECKOUT_S2_04` | Cart icon opens cart | `@regression` |
| `CHECKOUT_S2_05` | Cancel returns to inventory | `@regression` |
| `CHECKOUT_S2_06` | Finish completes checkout | `@smoke`, `@regression` |
| `CHECKOUT_S2_07` | Checkout subtotal, tax, and total are correct | `@regression` |
| `CHECKOUT_S2_08` | Checkout shows the expected items and prices | `@regression` |
| `CHECKOUT_S2_09` | Cart counter is correct | `@regression` |

## Checkout completion

The completion cases prepare a successful order before each test. They check
the reset cart counter, return-to-inventory behavior, downloadable order
filename, and remaining navigation options.

| Case ID | Automated behavior | Tags |
| --- | --- | --- |
| `CHECKOUT_CMP_01` | Back Home returns to inventory | `@regression` |
| `CHECKOUT_CMP_02` | Order PDF download starts and has the expected filename | `@regression` |
| `CHECKOUT_CMP_03` | Cart counter resets after order completion | `@regression` |
| `CHECKOUT_CMP_04` | Cart icon opens cart | `@regression` |
| `CHECKOUT_CMP_05` | Completion-page hamburger menu opens | `@regression` |
| `CHECKOUT_CMP_06` | Completion menu navigates to inventory | `@regression` |
| `CHECKOUT_CMP_07` | User can log out from completion page | `@regression` |

The PDF case verifies that a download starts and that its suggested filename
contains `swag-labs-order`. It does not inspect the generated PDF contents.

## Source case sheets

- [Checkout step one](https://docs.google.com/spreadsheets/d/1SIvo8sK9ZgbgVyq-exP7eXT1bUEWxyqo1N-eHzsFzog/edit?usp=sharing)
- [Checkout step two](https://docs.google.com/spreadsheets/d/1YdY8p_JUJZ2UpoxrJZrAG5XCBy0lY54IJNzovCfPMfQ/edit?gid=0#gid=0)
- [Checkout completion](https://docs.google.com/spreadsheets/d/1hB_dxCNfbBrEjdzCeWZUYvRyBUHSFUxsKexWGWwF4rU/edit?usp=sharing)