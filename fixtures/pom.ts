import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

type POMFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<POMFixtures>({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
  },
  inventoryPage: async ({ page }, use) => {
    const inventory = new InventoryPage(page);
    await use(inventory);
  },
});

export { expect };
