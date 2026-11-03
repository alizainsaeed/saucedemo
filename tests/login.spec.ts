import { test, expect } from '../fixtures/pom';
import { getUserByName } from '../utils/helpers';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Page - Verify login flow', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.loginPage.goto();
  });

  test.describe('Core Login Flow', () => {
    test('Verify if alert message can be closed', async ({ pom }) => {
      const user = getUserByName(pom.loginPage, 'alert can be closed');
      await pom.loginPage.login(user.username, user.password);
      await pom.loginPage.errorMsg
        .getByRole('button', { name: 'Dismiss error' })
        .click();
      await expect(pom.loginPage.errorMsg).toBeHidden();
    });

    test('Verify user can login with valid username and password', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'valid login');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.page).toHaveURL(/inventory/);
    });

    test('Verify user cannot login if username is invalid', async ({ pom }) => {
      const user = getUserByName(pom.loginPage, 'invalid username');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('Verify user cannot login if the password is invalid', async ({
      pom,
    }) => {
      const user = getUserByName(pom.loginPage, 'invalid password');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('Verify if user cannot login with valid username with different casing', async ({
      pom,
    }) => {
      const user = getUserByName(
        pom.loginPage,
        'valid username different casing'
      );
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('Verify if user cannot login with valid password with different casing', async ({
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
    test('Verify username field handles no input', async ({ pom }) => {
      const user = getUserByName(pom.loginPage, 'username empty');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test('Verify password field handles no input', async ({ pom }) => {
      const user = getUserByName(pom.loginPage, 'password empty');
      await pom.loginPage.login(user.username, user.password);
      await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
    });

    const riskyInputs = [
      'leading/trailing spaces',
      'internal spaces',
      'long string',
      'unicode characters',
      'emoji',
    ];

    for (const label of riskyInputs) {
      test(`Verify risky input for username: ${label}`, async ({ pom }) => {
        const user = getUserByName(pom.loginPage, label);
        await pom.loginPage.login(user.username, user.password);
        await expect(pom.loginPage.errorMsg).toContainText(user.expectedError!);
      });
    }
  });

  test.describe('UI & Element Verification', () => {
    test('Verify password field is masked', async ({ pom }) => {
      expect(await pom.loginPage.isPasswordMasked()).toBe(true);
    });

    test('Verify placeholder text is shown for username and password fields', async ({
      pom,
    }) => {
      expect(await pom.loginPage.getUsernamePlaceholder()).toBe('Username');
      expect(await pom.loginPage.getPasswordPlaceholder()).toBe('Password');
    });

    test('Verify core elements are loaded on initial load', async ({ pom }) => {
      expect(await pom.loginPage.areCoreElementsVisible()).toBe(true);
    });
  });
});
