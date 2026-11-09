import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export type POMFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
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
      get checkoutPage() {
        return new CheckoutPage(page);
      },
    };

    await use(fixtures);
  },
});

export { expect } from '@playwright/test';
