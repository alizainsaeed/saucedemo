import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export type POMFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
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
    };

    await use(fixtures);
  },
});

export { expect } from '@playwright/test';
