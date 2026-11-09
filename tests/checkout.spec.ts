import { test, expect } from '../fixtures/pom';
import { seedData } from '../utils/helpers';

test.describe('Checkout page - Verify checkout flow', () => {
  test.beforeEach(async ({ pom }) => {
    await seedData(pom);
    pom.checkoutPage.goto();
  });

  test.describe('Checkout step one', () => {
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
  });
});
