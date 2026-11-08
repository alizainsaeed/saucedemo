import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly shoppingButton: Locator;
  readonly cartList: Locator;
  readonly inventoryItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout');
    this.shoppingButton = page.getByTestId('continue-shopping');
    this.cartList = page.getByTestId('cart-list');
    this.inventoryItem = page.getByTestId('inventory-item-name');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async removeCartItem(itemName: string): Promise<Locator> {
    const item = this.cartList.getByTestId('inventory-item').filter({
      hasText: itemName,
    });

    const removeButton = item.getByRole('button', {
      name: 'Remove',
      exact: true,
    });

    await removeButton.click();
    return item;
  }

  async openCartItem(itemName: string): Promise<void> {
    const item = this.cartList.getByTestId('inventory-item').filter({
      hasText: itemName,
    });

    const titleButton = item.getByRole('button', {
      name: `View details for ${itemName}`,
      exact: true,
    });

    await titleButton.click();
  }
}
