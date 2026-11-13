import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly hamburgerIcon: Locator;
  readonly hamburgerMenu: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;
  readonly inventoryLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerIcon = page.getByRole('button', { name: 'Open Menu' });
    this.hamburgerMenu = page.getByRole('navigation');
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.cartCount = page.getByTestId('shopping-cart-badge');
    this.inventoryLink = page.getByTestId('inventory-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async openHamburgerMenu(): Promise<void> {
    await this.hamburgerIcon.click();
  }
}
