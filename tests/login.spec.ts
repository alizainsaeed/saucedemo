import { test, expect } from '../fixtures/pom';
import { getUserByName } from '../utils/helpers';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Page - Verify login flow', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.loginPage.goto();
  });

  test.describe('Core Login Flow', () => {
    test('[LOGIN_19] @regression Verify if alert message can be closed', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'alert can be closed');
      await pom.loginPage.login(user.username, user.password);
      await pom.loginPage.errorMsg
        .getByRole('button', { name: 'Dismiss error' })
        .click();
      await expect(pom.loginPage.errorMsg).toBeHidden();
    });

    test('[LOGIN_01] @smoke @regression Verify user can login with valid username and password', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'valid login');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.page).toHaveURL(/inventory/);
    });

    test('[LOGIN_02] @regression Verify user cannot login if username is invalid', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'invalid username');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('[LOGIN_03] @regression Verify user cannot login if the password is invalid', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'invalid password');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('[LOGIN_12] @regression Verify if user cannot login with valid username with different casing', async ({
      pom,
    }) => {
      const user = getUserByName(
        pom.loginPage,
        'valid username different casing'
      );
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('[LOGIN_13] @regression Verify if user cannot login with valid password with different casing', async ({
      pom,
    }) => {
      const user = getUserByName(
        pom.loginPage,
        'valid password different casing'
      );
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });
  });

  test.describe('Input Validation & Edge Cases', () => {
    test('[LOGIN_06] @regression Verify username field handles no input', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'username empty');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('[LOGIN_07] @regression Verify password field handles no input', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'password empty');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    const riskyInputs = [
      { label: 'leading/trailing spaces', id: 'LOGIN_09' },
      { label: 'internal spaces', id: 'LOGIN_08' },
      { label: 'long string', id: 'LOGIN_20' },
      { label: 'unicode characters', id: 'LOGIN_21' },
      { label: 'emoji', id: 'LOGIN_04' },
    ];

    for (const { label, id } of riskyInputs) {
      test(`[${id}] @regression Verify risky input for username: ${label}`, async ({
        pom,
      }) => {
        const user = getUserByName(pom.loginPage, label);
        await pom.loginPage.login(user.username, user.password);
        await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
      });
    }
  });

  test.describe('UI & Element Verification', () => {
    test('[LOGIN_15] @regression Verify password field is masked', async ({
      pom,
    }) => {
      expect(await pom.loginPage.isPasswordMasked()).toBe(true);
    });

    test('[LOGIN_16, LOGIN_17] @regression Verify placeholder text is shown for username and password fields', async ({
      pom,
    }) => {
      expect(await pom.loginPage.getUsernamePlaceholder()).toBe('Username');
      expect(await pom.loginPage.getPasswordPlaceholder()).toBe('Password');
    });

    test('[LOGIN_18] @regression Verify core elements are loaded on initial load', async ({
      pom,
    }) => {
      expect(await pom.loginPage.areCoreElementsVisible()).toBe(true);
    });
  });
});
