import { test, expect } from '@playwright/test';
import { getUserByName } from '../utils/helpers';
import { LoginPage } from '../pages/LoginPage';

const authSession = 'playwright/.auth/session.json';

test(
  '[SETUP_01] Authenticate user',
  { tag: ['@smoke', '@regression'] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const user = getUserByName(loginPage, 'valid login');
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL('/inventory.html');

    await page.context().storageState({ path: authSession });
  }
);
