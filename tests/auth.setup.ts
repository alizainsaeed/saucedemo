import { test, expect } from "@playwright/test";
import { getUserByName } from "../utils/helpers";
import { LoginPage } from "../pages/LoginPage";

const authSession = 'playwright/.auth/session.json';

test('Authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  const user = getUserByName(loginPage, "valid login");
  await loginPage.login(user.username, user.password);
  await expect(page).toHaveURL(/inventory/);
  
  await page.context().storageState({ path: authSession });
})