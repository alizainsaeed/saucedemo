import { test, expect } from "../fixtures/pom";
import { getUserByName } from "../utils/helpers";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Page - Verify login flow", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.describe("Core Login Flow", () => {
    test("Verify if alert message can be closed", async ({
      loginPage,
    }) => {
      const user = getUserByName(loginPage, "alert can be closed");
      await loginPage.login(user.username, user.password);
      await loginPage.errorMsg.getByRole("button", { name: "Dismiss error" }).click();
      await expect(loginPage.errorMsg).toBeHidden();
    });

    test("Verify user can login with valid username and password", async ({
      loginPage,
    }) => {
      const user = getUserByName(loginPage, "valid login");
      await loginPage.login(user.username, user.password);
      await expect(loginPage.page).toHaveURL(/inventory/);
    });

    test("Verify user cannot login if username is invalid", async ({
      loginPage,
    }) => {
      const user = getUserByName(loginPage, "invalid username");
      await loginPage.login(user.username, user.password);
      await expect(loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test("Verify user cannot login if the password is invalid", async ({
      loginPage,
    }) => {
      const user = getUserByName(loginPage, "invalid password");
      await loginPage.login(user.username, user.password);
      await expect(loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test("Verify if user cannot login with valid username with different casing", async ({
      loginPage,
    }) => {
      const user = getUserByName(loginPage, "valid username different casing");
      await loginPage.login(user.username, user.password);
      await expect(loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test("Verify if user cannot login with valid password with different casing", async ({
      loginPage,
    }) => {
      const user = getUserByName(loginPage, "valid password different casing");
      await loginPage.login(user.username, user.password);
      await expect(loginPage.errorMsg).toContainText(user.expectedError!);
    });
  });

  test.describe("Input Validation & Edge Cases", () => {
    test("Verify username field handles no input", async ({ loginPage }) => {
      const user = getUserByName(loginPage, "username empty");
      await loginPage.login(user.username, user.password);
      await expect(loginPage.errorMsg).toContainText(user.expectedError!);
    });

    test("Verify password field handles no input", async ({ loginPage }) => {
      const user = getUserByName(loginPage, "password empty");
      await loginPage.login(user.username, user.password);
      await expect(loginPage.errorMsg).toContainText(user.expectedError!);
    });

    const riskyInputs = [
      "leading/trailing spaces",
      "internal spaces",
      "long string",
      "unicode characters",
      "emoji",
    ];

    for (const label of riskyInputs) {
      test(`Verify risky input for username: ${label}`, async ({
        loginPage,
      }) => {
        const user = getUserByName(loginPage, label);
        await loginPage.login(user.username, user.password);
        await expect(loginPage.errorMsg).toContainText(user.expectedError!);
      });
    }
  });

  test.describe("UI & Element Verification", () => {
    test("Verify password field is masked", async ({ loginPage }) => {
      expect(await loginPage.isPasswordMasked()).toBe(true);
    });

    test("Verify placeholder text is shown for username and password fields", async ({
      loginPage,
    }) => {
      expect(await loginPage.getUsernamePlaceholder()).toBe("Username");
      expect(await loginPage.getPasswordPlaceholder()).toBe("Password");
    });

    test("Verify core elements are loaded on initial load", async ({
      loginPage,
    }) => {
      expect(await loginPage.areCoreElementsVisible()).toBe(true);
    });
  });
});
