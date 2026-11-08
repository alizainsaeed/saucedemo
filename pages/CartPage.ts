import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly shoppingButton: Locator;
  readonly cartList: Locator;
  readonly hamburgerIcon: Locator;
  readonly hamburgerMenu: Locator;
  readonly inventoryLink: Locator;
  readonly logoutLink: Locator;
  readonly cartCount: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerIcon = page.getByRole('button', { name: 'Open Menu' });
    this.hamburgerMenu = page.getByRole('navigation');
    this.checkoutButton = page.getByTestId('checkout');
    this.shoppingButton = page.getByTestId('continue-shopping');
    this.cartList = page.getByTestId('cart-list');
    this.cartCount = page.getByTestId('shopping-cart-badge');
    this.inventoryLink = page.getByTestId('inventory-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.cartItems = page.getByTestId('inventory-item-name');
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
