import { test, expect } from "../fixtures/pom";

test.describe("Login Page - Verify login flow", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.describe("Successful and Unsuccessful Authentication", () => {
    test("Verify user can login with valid username and password", async ({
      loginPage,
    }) => {
      await loginPage.login("standard_user", "secret_sauce");
      await expect(loginPage.page).toHaveURL(/inventory/);
    });

    test("Verify user cannot login if username is invalid", async ({
      loginPage,
    }) => {
      await loginPage.login("not_a_user", "secret_sauce");
      await expect(loginPage.errorMsg).toContainText(
        "Username and password do not match",
      );
    });

    test("Verify user cannot login if the password is invalid", async ({
      loginPage,
    }) => {
      await loginPage.login("standard_user", "123");
      await expect(loginPage.errorMsg).toContainText(
        "Username and password do not match",
      );
    });

    test("Verify if user cannot login with valid username with different casing", async ({
      loginPage,
    }) => {
      await loginPage.login("Standard_user", "123");
      await expect(loginPage.errorMsg).toContainText(
        "Username and password do not match",
      );
    });

    test("Verify if user cannot login with valid password with different casing", async ({
      loginPage,
    }) => {
      await loginPage.login("standard_user", "Secret_Sauce");
      await expect(loginPage.errorMsg).toContainText(
        "Username and password do not match",
      );
    });
  });

  test.describe("Input Validation & Edge Cases", () => {
    test("Verify username field handles no input", async ({ loginPage }) => {
      await loginPage.login("", "123");
      await expect(loginPage.errorMsg).toContainText("Username is required");
    });

    test("Verify password field handles no input", async ({ loginPage }) => {
      await loginPage.login("123", "");
      await expect(loginPage.errorMsg).toContainText("Password is required");
    });

    const riskyInputs = [
      { label: "leading/trailing spaces", value: " standard_user " },
      { label: "internal spaces", value: "sta ndard_user" },
      { label: "long string", value: "s".repeat(256) },
      { label: "unicode characters", value: "торт" },
      { label: "emoji", value: "🤣" },
    ];

    for (const { label, value } of riskyInputs) {
      test(`Verify risky input for username: ${label}`, async ({
        loginPage,
      }) => {
        await loginPage.login(value, "123");
        await expect(loginPage.errorMsg).toContainText(
          "Username and password do not match",
        );
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
