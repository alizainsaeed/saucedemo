import { Locator, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { POMFixtures } from '../fixtures/pom';
import itemsData from '../test-data/items.json';

export const getUserByName = (loginPage: LoginPage, name: string) => {
  const user = loginPage.users.find((u: any) => u.name === name);
  if (!user) {
    throw new Error(`User data not found for: ${name}`);
  }

  return user;
};

export async function seedData(pom: POMFixtures) {
  await pom.inventoryPage.goto();

  for (const item of itemsData.items) {
    const cartItem = await pom.inventoryPage.findItem(item.name);
    const removeButton = cartItem.getByRole('button', {
      name: 'Remove',
      exact: true,
    });

    await addItemToCart(pom, item.name, removeButton);
  }
}

export async function seedCompletedData(pom: POMFixtures) {
  await pom.inventoryPage.goto();

  for (const item of itemsData.items) {
    const cartItem = await pom.inventoryPage.findItem(item.name);
    const removeButton = cartItem.getByRole('button', {
      name: 'Remove',
      exact: true,
    });

    await addItemToCart(pom, item.name, removeButton);
  }

  await pom.checkoutPage.goto();
  await pom.checkoutPage.firstName.fill('John');
  await pom.checkoutPage.lastName.fill('Doe');
  await pom.checkoutPage.zipCode.fill('19400');
  await pom.checkoutPage.submitButton.click();
  await expect(pom.checkoutPage.page).toHaveURL('/checkout-step-two.html');
  await pom.checkoutPage.finishButton.click();
  await expect(pom.checkoutPage.page).toHaveURL('/checkout-complete.html');
}

export async function addItemToCart(
  pom: POMFixtures,
  item: string,
  removeButton: Locator
) {
  await expect(removeButton).not.toBeVisible();
  await pom.inventoryPage.addToCart(item);
  await expect(removeButton).toBeVisible();
}

export async function RemoveItemFromCart(
  pom: POMFixtures,
  item: string,
  removeButton: Locator
) {
  await pom.inventoryPage.removeFromCart(item);
  await expect(removeButton).not.toBeVisible();
}
