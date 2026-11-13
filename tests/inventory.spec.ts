import { addItemToCart, RemoveItemFromCart } from '../utils/helpers';
import { test, expect } from '../fixtures/pom';
import itemsData from '../test-data/items.json';

test.describe('Inventory Page - Verify inventory flow', () => {
  const backpack = itemsData.items[0].name;
  const bikeLight = itemsData.items[1].name;

  test.beforeEach(async ({ pom }) => {
    await pom.inventoryPage.goto();
  });

  test('[INVENTORY_02] @regression Verify if an item can be removed from cart', async ({
    pom,
  }) => {
    const item = await pom.inventoryPage.findItem(backpack);
    const removeButton = item.getByRole('button', {
      name: 'Remove',
      exact: true,
    });

    await addItemToCart(pom, backpack, removeButton);
    await expect(pom.inventoryPage.cartCount).toHaveText('1');
    await RemoveItemFromCart(pom, backpack, removeButton);
  });

  test('[INVENTORY_04] @regression Verify if cart badge goes away when an item is removed from cart', async ({
    pom,
  }) => {
    const item = await pom.inventoryPage.findItem(backpack);
    const removeButton = item.getByRole('button', {
      name: 'Remove',
      exact: true,
    });

    await addItemToCart(pom, backpack, removeButton);
    await expect(pom.inventoryPage.cartCount).toHaveText('1');

    await RemoveItemFromCart(pom, backpack, removeButton);
    await expect(pom.inventoryPage.cartCount).toBeHidden();
  });

  test('[INVENTORY_01] @smoke @regression Verify if an item can be added to cart', async ({
    pom,
  }) => {
    const item = await pom.inventoryPage.findItem(backpack);
    const removeButton = item.getByRole('button', {
      name: 'Remove',
      exact: true,
    });

    await expect(removeButton).not.toBeVisible();
    await pom.inventoryPage.addToCart(backpack);
    await expect(removeButton).toBeVisible();
  });

  test('[INVENTORY_03] @smoke @regression Verify if cart badge shows up an item is added to cart', async ({
    pom,
  }) => {
    await pom.inventoryPage.addToCart(backpack);
    await expect(pom.inventoryPage.cartCount).toHaveText('1');
  });

  test('[INVENTORY_05] @regression Verify if hamburger menu opens', async ({
    pom,
  }) => {
    await pom.inventoryPage.hamburgerIcon.click();
    await expect(pom.inventoryPage.hamburgerMenu).toBeVisible();
  });

  test('[INVENTORY_06] @regression Verify if the cart counter increments correctly when an item is already in cart', async ({
    pom,
  }) => {
    await pom.inventoryPage.addToCart(backpack);
    await pom.inventoryPage.addToCart(bikeLight);
    await expect(pom.inventoryPage.cartCount).toHaveText('2');
  });

  test('[INVENTORY_07] @regression Verify if the cart counter decrements correctly when an item is already in cart', async ({
    pom,
  }) => {
    await pom.inventoryPage.addToCart(backpack);
    await pom.inventoryPage.addToCart(bikeLight);
    await pom.inventoryPage.removeFromCart(bikeLight);
    await expect(pom.inventoryPage.cartCount).toHaveText('1');
  });

  test('[INVENTORY_08] @regression Verify if the user can log out from their current session', async ({
    pom,
    page,
  }) => {
    await pom.inventoryPage.openHamburgerMenu();
    await expect(pom.inventoryPage.hamburgerMenu).toBeVisible();

    await pom.inventoryPage.logoutLink.click();
    await expect(page).toHaveURL('/');
  });

  test('[INVENTORY_09] @regression Verify if the user can sort the listings alphabetically (ascending order)', async ({
    pom,
  }) => {
    await pom.inventoryPage.filterButton.selectOption('az');
    const actualItems = await pom.inventoryPage.inventoryNames.allInnerTexts();

    const sortedItems = [...actualItems].toSorted((a, b) => a.localeCompare(b));

    expect(actualItems).toEqual(sortedItems);
  });

  test('[INVENTORY_10] @regression Verify if the user can sort the listings alphabetically (descending order)', async ({
    pom,
  }) => {
    await pom.inventoryPage.filterButton.selectOption('za');
    const actualItems = await pom.inventoryPage.inventoryNames.allInnerTexts();

    const sortedItems = [...actualItems].toSorted((a, b) => b.localeCompare(a));

    expect(actualItems).toEqual(sortedItems);
  });

  test('[INVENTORY_11] @regression Verify if the user can sort the listings price-wise (low-to-high)', async ({
    pom,
  }) => {
    await pom.inventoryPage.filterButton.selectOption('lohi');
    const prices = await pom.inventoryPage.inventoryPrices.allInnerTexts();

    const numericPrices: number[] = prices.map((price) =>
      Number(price.replace(/^\$/, ''))
    );

    const sortedPrices: number[] = [...numericPrices].toSorted((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
  });

  test('[INVENTORY_12] @regression Verify if the user can sort the listings price-wise (high-to-low)', async ({
    pom,
  }) => {
    await pom.inventoryPage.filterButton.selectOption('hilo');
    const prices = await pom.inventoryPage.inventoryPrices.allInnerTexts();

    const numericPrices: number[] = prices.map((price) =>
      Number(price.replace(/^\$/, ''))
    );

    const sortedPrices: number[] = [...numericPrices].toSorted((a, b) => b - a);

    expect(numericPrices).toEqual(sortedPrices);
  });

  test('[INVENTORY_13] @smoke @regression Verify if pressing the cart icon opens the cart page', async ({
    pom,
    page,
  }) => {
    await pom.inventoryPage.cartIcon.click();
    await expect(page).toHaveURL(/cart/);
  });
});
