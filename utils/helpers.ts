import { Locator, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { POMFixtures } from '../fixtures/pom';

export const getUserByName = (loginPage: LoginPage, name: string) => {
  const user = loginPage.users.find((u: any) => u.name === name);
  if (!user) {
    throw new Error(`User data not found for: ${name}`);
  }

  return user;
};

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
