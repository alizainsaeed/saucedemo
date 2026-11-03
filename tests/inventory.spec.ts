import { test, expect } from '../fixtures/pom';

test.describe('Inventory Page - Verify inventory flow', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.inventoryPage.goto();
  });

  test.describe('Core Inventory Flow', () => {
    const itemName = 'Sauce Labs Backpack';

    test('Verify if an item can be removed from cart', async ({ pom }) => {
      const item = await pom.inventoryPage.findItem(itemName);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await pom.inventoryPage.addToCart(itemName);
      await expect(removeButton).toBeVisible();
      await expect(pom.inventoryPage.cartCount).toHaveText('1');

      await pom.inventoryPage.removeFromCart(itemName);
      await expect(removeButton).not.toBeVisible();
    });

    test('Verify if cart badge goes away when an item is removed from cart', async ({
      pom,
    }) => {
      const item = await pom.inventoryPage.findItem(itemName);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await pom.inventoryPage.addToCart(itemName);
      await expect(removeButton).toBeVisible();
      await expect(pom.inventoryPage.cartCount).toHaveText('1');

      await pom.inventoryPage.removeFromCart(itemName);
      await expect(pom.inventoryPage.cartCount).toBeHidden();
      await expect(removeButton).not.toBeVisible();
    });

    test('Verify if an item can be added to cart', async ({ pom }) => {
      const item = await pom.inventoryPage.findItem(itemName);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await pom.inventoryPage.addToCart(itemName);
      await expect(removeButton).toBeVisible();
    });

    test('Verify if cart badge shows up an item is added to cart', async ({
      pom,
    }) => {
      await pom.inventoryPage.addToCart(itemName);
      await expect(pom.inventoryPage.cartCount).toHaveText('1');
    });

    test('Verify if hamburger menu opens', async ({ pom }) => {
      await pom.inventoryPage.hamburgerIcon.click();
      const menuLink = pom.inventoryPage.page
        .getByTestId('inventory-sidebar-link')
        .first();

      await expect(menuLink).toBeVisible();
    });
  });
});
