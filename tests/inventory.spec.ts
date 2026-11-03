import { test, expect } from '../fixtures/pom';

test.describe('Inventory Page - Verify inventory flow', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test.describe('Core Inventory Flow', () => {
    const itemName = 'Sauce Labs Backpack';

    test('Verify if an item can be removed from cart', async ({
      inventoryPage,
    }) => {
      const item = await inventoryPage.findItem(itemName);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await inventoryPage.addToCart(itemName);
      await expect(removeButton).toBeVisible();
      await expect(inventoryPage.cartCount).toHaveText('1');

      await inventoryPage.removeFromCart(itemName);
      await expect(removeButton).not.toBeVisible();
    });

    test('Verify if cart badge goes away when an item is removed from cart', async ({
      inventoryPage,
    }) => {
      const item = await inventoryPage.findItem(itemName);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await inventoryPage.addToCart(itemName);
      await expect(removeButton).toBeVisible();
      await expect(inventoryPage.cartCount).toHaveText('1');

      await inventoryPage.removeFromCart(itemName);
      await expect(inventoryPage.cartCount).toBeHidden();
      await expect(removeButton).not.toBeVisible();
    });

    test('Verify if an item can be added to cart', async ({
      inventoryPage,
    }) => {
      const item = await inventoryPage.findItem(itemName);
      const removeButton = item.getByRole('button', {
        name: 'Remove',
        exact: true,
      });

      await expect(removeButton).not.toBeVisible();
      await inventoryPage.addToCart(itemName);
      await expect(removeButton).toBeVisible();
    });

    test('Verify if cart badge shows up an item is added to cart', async ({
      inventoryPage,
    }) => {
      await inventoryPage.addToCart(itemName);
      await expect(inventoryPage.cartCount).toHaveText('1');
    });
  });
});
