import { Page, Locator } from '@playwright/test';
import users from '../test-data/users.json';
import { BasePage } from './BasePage';

interface User {
  name: string;
  username: string;
  password: string;
  expectedError?: string;
  expectedUrl?: string;
  closeAlert?: boolean;
}

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMsg: Locator;
  readonly users: User[];

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMsg = page.getByRole('alert');
    this.users = users.login;
  }

  async goto(): Promise<void> {
    await this.navigateTo('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isPasswordMasked(): Promise<boolean> {
    const type = await this.passwordInput.getAttribute('type');
    return type === 'password';
  }

  async getUsernamePlaceholder(): Promise<string | null> {
    return await this.usernameInput.getAttribute('placeholder');
  }

  async getPasswordPlaceholder(): Promise<string | null> {
    return await this.passwordInput.getAttribute('placeholder');
  }

  async areCoreElementsVisible(): Promise<boolean> {
    return (
      (await this.usernameInput.isVisible()) &&
      (await this.passwordInput.isVisible()) &&
      (await this.loginButton.isVisible())
    );
  }
}
