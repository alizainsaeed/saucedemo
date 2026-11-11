import { test, expect } from '../fixtures/pom';
import { seedCompletedData, seedData } from '../utils/helpers';
import itemsData from '../test-data/items.json';

test.describe('Checkout page - Verify checkout flow', () => {
  test.describe('Checkout step one', () => {
    test.beforeEach(async ({ pom }) => {
      await seedData(pom);
      await pom.checkoutPage.goto();
    });

    test('Verify that the site shows an error when no name is entered', async ({
      pom,
    }) => {
      await pom.checkoutPage.lastName.fill('Doe');
      await pom.checkoutPage.zipCode.fill('19400');
      await pom.checkoutPage.submitButton.click();
      await expect(pom.checkoutPage.alertMsg).toContainText(
        'First Name is required'
      );
    });

    test('Verify that the site shows an error when no last name is entered', async ({
      pom,
    }) => {
      await pom.checkoutPage.firstName.fill('John');
      await pom.checkoutPage.zipCode.fill('19400');
      await pom.checkoutPage.submitButton.click();
      await expect(pom.checkoutPage.alertMsg).toContainText(
        'Last Name is required'
      );
    });

    test('Verify that the site shows an error when no zip code is entered', async ({
      pom,
    }) => {
      await pom.checkoutPage.firstName.fill('John');
      await pom.checkoutPage.lastName.fill('Doe');
      await pom.checkoutPage.submitButton.click();
      await expect(pom.checkoutPage.alertMsg).toContainText(
        'Postal Code is required'
      );
    });

    test('Verify if pressing cancel routes the user to the cart page', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.cancelButton.click();
      await expect(page).toHaveURL('/cart.html');
    });

    test('Verify if the user can open the hamburger menu', async ({ pom }) => {
      await pom.checkoutPage.hamburgerIcon.click();
      await expect(pom.checkoutPage.hamburgerMenu).toBeVisible();
    });

    test('Verify if the user can open the cart', async ({ pom, page }) => {
      await pom.checkoutPage.cartIcon.click();
      await expect(page).toHaveURL('/cart.html');
    });

    test('Verify if the error message popup can be closed', async ({ pom }) => {
      await pom.checkoutPage.firstName.fill('John');
      await pom.checkoutPage.lastName.fill('Doe');
      await pom.checkoutPage.submitButton.click();
      await pom.checkoutPage.dismissButton.click();
      await expect(pom.checkoutPage.alertMsg).not.toBeVisible();
    });

    test('Verify if the cart counter is accurately displayed', async ({
      pom,
    }) => {
      const items = itemsData.items.length;
      await expect(pom.checkoutPage.cartCount).toHaveText(String(items));
    });

    test('Verify if pressing Enter in a field after filling the form submits the form', async ({
      pom,
      page,
    }) => {
      test.fixme(
        true,
        'BUG: Pressing the enter key redirects the user to the cart page.'
      );

      await pom.checkoutPage.firstName.fill('John');
      await pom.checkoutPage.lastName.fill('Doe');
      await pom.checkoutPage.zipCode.fill('19400');
      await pom.checkoutPage.zipCode.press('Enter');
      await expect(page).toHaveURL('/checkout-step-two.html');
    });

    test('Verify if zip code only accepts numerics', async ({ pom }) => {
      test.fixme(
        true,
        'BUG: The user can input letters too with no validation being performed.'
      );

      await pom.checkoutPage.firstName.fill('John');
      await pom.checkoutPage.lastName.fill('Doe');
      await pom.checkoutPage.zipCode.fill('abc');
      await pom.checkoutPage.submitButton.click();
      await expect(pom.checkoutPage.alertMsg).toContainText('Invalid zip code');
    });
  });

  test.describe('Checkout step two', () => {
    test.beforeEach(async ({ pom }) => {
      await seedData(pom);
      await pom.checkoutPage.gotoStepTwo();
    });

    test('Verify if the hamburger menu opens', async ({ pom }) => {
      await pom.checkoutPage.hamburgerIcon.click();
      await expect(pom.checkoutPage.hamburgerMenu).toBeVisible();
    });

    test('Verify if the user can navigate to the inventory page through the hamburger menu', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.hamburgerIcon.click();
      await expect(pom.checkoutPage.hamburgerMenu).toBeVisible();

      await pom.checkoutPage.inventoryLink.click();
      await expect(page).toHaveURL('/inventory.html');
    });

    test('Verify if the user can logout through the hamburger menu', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.hamburgerIcon.click();
      await expect(pom.checkoutPage.hamburgerMenu).toBeVisible();

      await pom.checkoutPage.logoutLink.click();
      await expect(page).toHaveURL('/');
    });

    test('Verify if the cart page is opened when the user clicks on the cart icon', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.cartIcon.click();
      await expect(page).toHaveURL('/cart.html');
    });

    test('Verify if pressing Cancel routes the user to the inventory page', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.cancelButton.click();
      await expect(page).toHaveURL('/inventory.html');
    });

    test('Verify if pressing Finish shows the checkout completion page', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.finishButton.click();
      await expect(page).toHaveURL('/checkout-complete.html');
    });

    test('Verify if the cart counter is displayed correctly', async ({
      pom,
    }) => {
      const items = itemsData.items.length;
      await expect(pom.checkoutPage.cartCount).toHaveText(String(items));
    });

    test('Verify if the item(s) added to cart is shown in checkout', async ({
      pom,
    }) => {
      const expectedNames = itemsData.items.map((item) => item.name);
      const expectedPrices = itemsData.items.map(
        (item) => `$${item.price.toFixed(2)}`
      );

      await expect(pom.checkoutPage.cartTitle).toHaveText(expectedNames);
      await expect(pom.checkoutPage.cartPrice).toHaveText(expectedPrices);
    });

    test('Verify if the total is calculated correctly', async ({ pom }) => {
      const subtotal = itemsData.items.reduce(
        (sum, item) => sum + Math.round(item.price * 100),
        0
      );
      const tax = Math.round(subtotal * 0.08);
      const total = subtotal + tax;
      const money = (cents: number) => (cents / 100).toFixed(2);

      await expect(pom.checkoutPage.subtotalPrice).toHaveText(
        `Item total: $${money(subtotal)}`
      );
      await expect(pom.checkoutPage.taxPrice).toHaveText(`Tax: $${money(tax)}`);
      await expect(pom.checkoutPage.totalPrice).toHaveText(
        `Total: $${money(total)}`
      );
    });
  });

  test.describe('Checkout completed', () => {
    test.beforeEach(async ({ pom }) => {
      await seedCompletedData(pom);
    });

    test('Verify if the hamburger menu opens', async ({ pom }) => {
      await pom.checkoutPage.hamburgerIcon.click();
      await expect(pom.checkoutPage.hamburgerMenu).toBeVisible();
    });

    test('Verify if the user can navigate to the inventory page through the hamburger menu', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.hamburgerIcon.click();
      await expect(pom.checkoutPage.hamburgerMenu).toBeVisible();

      await pom.checkoutPage.inventoryLink.click();
      await expect(page).toHaveURL('/inventory.html');
    });

    test('Verify if the user can logout through the hamburger menu', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.hamburgerIcon.click();
      await expect(pom.checkoutPage.hamburgerMenu).toBeVisible();

      await pom.checkoutPage.logoutLink.click();
      await expect(page).toHaveURL('/');
    });

    test('Verify if the cart page is opened when the user clicks on the cart icon', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.cartIcon.click();
      await expect(page).toHaveURL('/cart.html');
    });

    test('Verify if the cart counter is reset', async ({ pom }) => {
      await expect(pom.checkoutPage.cartCount).not.toBeVisible();
    });

    test('Verify if pressing the back home button routes the user to the inventory page', async ({
      pom,
      page,
    }) => {
      await pom.checkoutPage.backHomeButton.click();
      await expect(page).toHaveURL('inventory.html');
    });

    test('Verify if pressing the Generate PDF order downloads the order PDF', async ({
      pom,
      page,
    }) => {
      const downloadPromise = page.waitForEvent('download');
      await pom.checkoutPage.generateButton.click();

      const pdf = await downloadPromise;
      const pdfName = pdf.suggestedFilename();
      expect(pdfName).toContain('swag-labs-order');
    });
  });
});
