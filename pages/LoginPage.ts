import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder("Username");
    this.passwordField = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.errorMsg = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
  }
}
