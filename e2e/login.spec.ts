import { test, expect } from "../fixtures/pom";

test.describe("Validate login flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://saucedemo.com");
  });

  test("Verify user can login with valid username and password", async ({
    loginPage,
  }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(loginPage.page).toHaveURL(/inventory/);
  });

  test("Verify user cannot login if username is invalid", async ({
    loginPage,
  }) => {
    await loginPage.login("invalid_user", "secret_sauce");
    await expect(loginPage.errorMsg).toContainText(
      "Username and password do not match",
    );
  });
});
