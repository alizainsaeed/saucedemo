import itemsData from '../test-data/items.json';
import { test, expect } from '../fixtures/pom';
import { addItemToCart } from '../utils/helpers';

const itemName = itemsData.items[0].name;

test.describe('Cart Page - Verify cart flow', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.inventoryPage.goto();

    for (const item of itemsData.items) {
      const cartItem = await pom.inventoryPage.findItem(item.name);
      const removeButton = cartItem.getByRole('button', {
        name: 'Remove',
        exact: true,
      });
      await addItemToCart(pom, item.name, removeButton);
    }

    await pom.cartPage.goto();
  });

  test.describe('Core cart flow', () => {
    test('Verify if pressing the checkout page redirects to the checkout page', async ({
      pom,
      page,
    }) => {
      await pom.cartPage.checkoutButton.click();
      await expect(page).toHaveURL('/checkout-step-one.html');
    });

    test('Verify if pressing the continue shopping button redirects to the inventory page', async ({
      pom,
      page,
    }) => {
      await pom.cartPage.shoppingButton.click();
      await expect(page).toHaveURL('/inventory.html');
    });

    test('Verify if the user can remove an item from cart', async ({ pom }) => {
      const item = await pom.cartPage.removeCartItem(itemName);
      await expect(item).not.toBeVisible();
    });

    test('Verify if pressing on a cart item name opens the cart product page', async ({
      pom,
      page,
    }) => {
      await expect(pom.cartPage.cartItemName(itemName)).toHaveText(itemName);
      await pom.cartPage.openCartItem(itemName);
      await expect(page).toHaveURL(/inventory-item\.html/);
      await expect(page.getByTestId('inventory-item-name')).toHaveText(
        itemName
      );
    });
  });
});
