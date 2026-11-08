import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly shoppingButton: Locator;
  readonly cartList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout');
    this.shoppingButton = page.getByTestId('continue-shopping');
    this.cartList = page.getByTestId('cart-list');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async removeCartItem(itemName: string): Promise<Locator> {
    const item = this.cartItem(itemName);

    const removeButton = item.getByRole('button', {
      name: 'Remove',
      exact: true,
    });

    await removeButton.click();
    return item;
  }

  async openCartItem(itemName: string): Promise<void> {
    const item = this.cartItem(itemName);

    const titleButton = item.getByRole('button', {
      name: `View details for ${itemName}`,
      exact: true,
    });

    await titleButton.click();
  }

  cartItemName(itemName: string): Locator {
    return this.cartItem(itemName).getByRole('button', {
      name: `View details for ${itemName}`,
      exact: true,
    });
  }

  private cartItem(itemName: string): Locator {
    const titleButton = this.page.getByRole('button', {
      name: `View details for ${itemName}`,
      exact: true,
    });

    return this.cartList
      .getByTestId('inventory-item')
      .filter({ has: titleButton });
  }
}
