import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly inventoryItems: Locator;
  readonly inventoryNames: Locator;
  readonly inventoryPrices: Locator;
  readonly filterButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItems = page
      .getByTestId('inventory-list')
      .getByTestId('inventory-item');

    this.inventoryNames = page.getByTestId('inventory-item-name');
    this.filterButton = page.getByTestId('product-sort-container');
    this.inventoryPrices = page.getByTestId('inventory-item-price');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/inventory.html');
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
}
