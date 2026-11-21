# Known Bug Reports

This document records application and test-suite defects found by the automated
Playwright suite. Issue status should be updated when a fix is verified in CI.

## BUG-001: Enter-key submission redirects to the cart page

- **Test case:** `CHECKOUT_S1_01`
- **Severity:** Medium
- **Status:** Open
- **Playwright status:** Skipped with `test.fixme`
- **Source:** [`tests/checkout.spec.ts`](../tests/checkout.spec.ts)
- **Matrix:** [Checkout test cases](./test_cases/checkout.md)

### Summary

After entering valid checkout information, pressing Enter while in the postal
code field does not submit the form and continue to checkout step two.

### Current behavior

The application redirects to the cart page instead of advancing to
`/checkout-step-two.html`.

### Expected behavior

Pressing Enter in a filled checkout form should submit the information and
navigate to checkout step two.

### Reproduction

1. Add an item to the cart and open checkout step one.
2. Enter a first name, last name, and postal code.
3. Press Enter in the postal-code field.
4. Observe the resulting page.

### Test location

```text
[CHECKOUT_S1_01] @regression Verify if pressing Enter in a field after filling the form submits the form
```

## BUG-002: Postal code accepts non-numeric letters

- **Test case:** `CHECKOUT_S1_05`
- **Severity:** Medium
- **Status:** Open
- **Playwright status:** Skipped with `test.fixme`
- **Source:** [`tests/checkout.spec.ts`](../tests/checkout.spec.ts)
- **Matrix:** [Checkout test cases](./test_cases/checkout.md)

### Summary

The checkout postal-code field accepts alphabetic input and the application does
not display the expected invalid postal-code validation message.

### Current behavior

Entering `abc` and submitting the form does not produce an `Invalid zip code`
error.

### Expected behavior

The postal-code field should reject letters or display an invalid postal-code
message before advancing checkout.

### Reproduction

1. Open checkout step one with a populated cart.
2. Enter a first name and last name.
3. Enter `abc` in the postal-code field.
4. Submit the form.

### Test location

```text
[CHECKOUT_S1_05] @regression Verify if zip code only accepts numerics
```

## BUG-003: Cart item-name locator resolves multiple elements

- **Test case:** `CART_04`
- **Severity:** Medium
- **Status:** Suspected test defect; needs confirmation
- **Playwright status:** Failing in Chromium CI when reproduced; generally not
  marked `test.fixme`
- **Source:** [`tests/cart.spec.ts`](../tests/cart.spec.ts)
- **Page object:** [`pages/CartPage.ts`](../pages/CartPage.ts)
- **Matrix:** [Cart test cases](./test_cases/cart.md)

### Summary

The `CART_04` assertion uses a broad `getByTestId('inventory-item-name')`
locator. When the cart contains multiple items, that locator resolves to every
item name and Playwright raises a strict-mode violation.

### Failure details

Recent CI runs reported:

- Expected text: `Sauce Labs Backpack`
- Locator resolved to two elements:
  - `Sauce Labs Backpack`
  - `Sauce Labs Bike Light`
- The failure also occurred when WebKit was flaky or interrupted.

Related failed workflow runs:

- [Run 42486958045](https://github.com/alizainsaeed/saucedemo/actions/runs/42486958045)
- [Run 42485508208](https://github.com/alizainsaeed/saucedemo/actions/runs/42485508208)
- [Run 41596476761](https://github.com/alizainsaeed/saucedemo/actions/runs/41596476761)

### Current behavior

The assertion cannot select exactly one cart item name, so the test fails before
opening the product page.

### Expected behavior

`CART_04` should locate only the configured cart item and then verify its text
and product-page navigation.

### Recommended fix

Use the existing item-scoped page-object methods, or scope the text assertion to
the locator returned by `cartItem(itemName)`, rather than querying all elements
with `inventory-item-name`.

## BUG-004: Intermittent WebKit navigation failure

- **Test case:** `CART_01`
- **Severity:** Low
- **Status:** Suspected flaky test or external timing issue; needs confirmation
- **Playwright status:** Flaky in a recent WebKit run
- **Source:** [`tests/cart.spec.ts`](../tests/cart.spec.ts)
- **Matrix:** [Cart test cases](./test_cases/cart.md)

### Summary

A WebKit run marked `CART_01` as flaky after the checkout URL assertion ended
before navigation was observed.

### Related failure details

The run expected `/checkout-step-one.html` but the test ended or the assertion
completed inconsistently.

### Recommended investigation

- Re-run WebKit repeatedly on the checkout navigation test.
- Confirm whether the public SauceDemo site or browser timing is responsible.
- Retain a trace and add an explicit navigation wait only if needed.

## Verification checklist

- [ ] Reproduce application bugs locally in at least one browser.
- [ ] Add or correct locators for test-suite defects.
- [ ] Remove only the matching `test.fixme` once BUG-001 or BUG-002 is fixed.
- [ ] Re-run the affected Chromium, Firefox, and WebKit projects.
- [ ] Update this document and the README status after CI verification.
