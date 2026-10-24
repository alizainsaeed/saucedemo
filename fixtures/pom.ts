import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type POMFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<POMFixtures>({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    login.goto();
    await use(login);
  },
});

export { expect };
