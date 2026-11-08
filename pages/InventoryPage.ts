import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly hamburgerIcon: Locator;
  readonly cartCount: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly inventoryNames: Locator;
  readonly inventoryPrices: Locator;
  readonly filterButton: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page
      .getByTestId('inventory-list')
      .getByTestId('inventory-item');

    this.cartCount = page.getByTestId('shopping-cart-badge');
    this.hamburgerIcon = page.getByRole('button', { name: 'Open Menu' });
    this.hamburgerMenu = page.getByRole('navigation');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.inventoryNames = page.getByTestId('inventory-item-name');
    this.filterButton = page.getByTestId('product-sort-container');
    this.inventoryPrices = page.getByTestId('inventory-item-price');
    this.cartIcon = page.getByTestId('shopping-cart-link');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async findItem(itemName: string): Promise<Locator> {
    const item = this.inventoryItems.filter({
      has: await this.page
        .getByTestId('inventory-item-name')
        .getByText(itemName, { exact: true }),
    });

    await expect(item).toHaveCount(1);
    return item;
  }

  async addToCart(itemName: string): Promise<void> {
    const item = await this.findItem(itemName);
    await item
      .getByRole('button', {
        name: 'Add to cart',
        exact: true,
      })
      .click();
  }

  async removeFromCart(itemName: string): Promise<void> {
    const item = await this.findItem(itemName);
    await item
      .getByRole('button', {
        name: 'Remove',
        exact: true,
      })
      .click();
  }

  async openHamburgerMenu(): Promise<void> {
    await this.hamburgerIcon.click();
  }
}
