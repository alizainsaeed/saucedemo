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
- **Severity:** High
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
