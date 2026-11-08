import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

export type POMFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<{ pom: POMFixtures }>({
  pom: async ({ page }, use) => {
    const fixtures: POMFixtures = {
      get loginPage() {
        return new LoginPage(page);
      },
      get inventoryPage() {
        return new InventoryPage(page);
      },
      get cartPage() {
        return new CartPage(page);
      },
    };

    await use(fixtures);
  },
});

export { expect } from '@playwright/test';
