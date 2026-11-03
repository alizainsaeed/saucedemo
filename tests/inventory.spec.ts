import { test, expect } from '../fixtures/pom';

test.describe('Inventory Page - Verify inventory flow', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.inventoryPage.goto();
  });

  test.describe('Core Inventory Flow', () => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    test('Verify if an item can be removed from cart', async ({ pom }) => {
      const item = await pom.inventoryPage.findItem(items[0]);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await pom.inventoryPage.addToCart(items[0]);
      await expect(removeButton).toBeVisible();
      await expect(pom.inventoryPage.cartCount).toHaveText('1');

      await pom.inventoryPage.removeFromCart(items[0]);
      await expect(removeButton).not.toBeVisible();
    });

    test('Verify if cart badge goes away when an item is removed from cart', async ({
      pom,
    }) => {
      const item = await pom.inventoryPage.findItem(items[0]);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await pom.inventoryPage.addToCart(items[0]);
      await expect(removeButton).toBeVisible();
      await expect(pom.inventoryPage.cartCount).toHaveText('1');

      await pom.inventoryPage.removeFromCart(items[0]);
      await expect(pom.inventoryPage.cartCount).toBeHidden();
      await expect(removeButton).not.toBeVisible();
    });

    test('Verify if an item can be added to cart', async ({ pom }) => {
      const item = await pom.inventoryPage.findItem(items[0]);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await pom.inventoryPage.addToCart(items[0]);
      await expect(removeButton).toBeVisible();
    });

    test('Verify if cart badge shows up an item is added to cart', async ({
      pom,
    }) => {
      await pom.inventoryPage.addToCart(items[0]);
      await expect(pom.inventoryPage.cartCount).toHaveText('1');
    });

    test('Verify if hamburger menu opens', async ({ pom }) => {
      await pom.inventoryPage.hamburgerIcon.click();
      const menuLink = pom.inventoryPage.page
        .getByTestId('inventory-sidebar-link')
        .first();

      await expect(menuLink).toBeVisible();
    });

    test('Verify if the cart counter increments correctly when an item is already in cart', async ({
      pom,
    }) => {
      await pom.inventoryPage.addToCart(items[0]);
      await pom.inventoryPage.addToCart(items[1]);
      await expect(pom.inventoryPage.cartCount).toHaveText('2');
    });

    test('Verify if the cart counter decrements correctly when an item is already in cart', async ({
      pom,
    }) => {
      await pom.inventoryPage.addToCart(items[0]);
      await pom.inventoryPage.addToCart(items[1]);
      await pom.inventoryPage.removeFromCart(items[1]);
      await expect(pom.inventoryPage.cartCount).toHaveText('1');
    });
  });
});
