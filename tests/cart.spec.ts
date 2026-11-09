import itemsData from '../test-data/items.json';
import { test, expect } from '../fixtures/pom';
import { seedData } from '../utils/helpers';

const itemName = itemsData.items[0].name;

test.describe('Cart Page - Verify cart flow', () => {
  test.beforeEach(async ({ pom }) => {
    await seedData(pom);
    await pom.cartPage.goto();
  });

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
    await expect(page.getByText(itemName, { exact: true })).toBeVisible();
  });

  test('Verify if the user can open the hamburger menu', async ({ pom }) => {
    await pom.cartPage.hamburgerIcon.click();
    await expect(pom.inventoryPage.hamburgerMenu).toBeVisible();
  });

  test('Verify if user can navigate back to the inventory through the hamburger menu link', async ({
    pom,
    page,
  }) => {
    await pom.cartPage.hamburgerIcon.click();
    await pom.cartPage.inventoryLink.click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Verify if user can logout by pressing Logout in the hamburger menu link', async ({
    pom,
    page,
  }) => {
    await pom.cartPage.hamburgerIcon.click();
    await pom.cartPage.logoutLink.click();
    await expect(page).toHaveURL('/');
  });

  test('Verify if the cart badge updates when the user removes a product', async ({
    pom,
  }) => {
    const itemCount = itemsData.items.length - 1;
    const item = await pom.cartPage.removeCartItem(itemName);
    await expect(item).not.toBeVisible();
    await expect(pom.cartPage.cartCount).toHaveText(`${itemCount}`);
  });

  test('Verify if the cart page correctly displays cart items', async ({
    pom,
  }) => {
    const actualItems = await pom.cartPage.cartItems.allInnerTexts();
    const expectedItems = itemsData.items.map((item) => item.name);

    expect(actualItems).toEqual(expectedItems);
  });
});
