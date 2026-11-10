import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipCode: Locator;
  readonly submitButton: Locator;
  readonly alertMsg: Locator;
  readonly cancelButton: Locator;
  readonly hamburgerIcon: Locator;
  readonly hamburgerMenu: Locator;
  readonly cartIcon: Locator;
  readonly inventoryLink: Locator;
  readonly cartCount: Locator;
  readonly dismissButton: Locator;
  readonly logoutLink: Locator;
  readonly finishButton: Locator;
  readonly checkoutItems: Locator;
  readonly cartTitle: Locator;
  readonly cartPrice: Locator;
  readonly subtotalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.getByTestId('inventory-item-name');
    this.cartPrice = page.getByTestId('inventory-item-price');
    this.checkoutItems = page.getByTestId('inventory-item');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.inventoryLink = page.getByTestId('inventory-sidebar-link');
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.cartCount = page.getByTestId('shopping-cart-badge');
    this.dismissButton = page.getByTestId('error-button');
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.subtotalPrice = page.getByTestId('subtotal-label');
    this.zipCode = page.getByPlaceholder('Zip/Postal Code');
    this.submitButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.alertMsg = page.getByRole('alert');
    this.hamburgerIcon = page.getByRole('button', { name: 'Open Menu' });
    this.hamburgerMenu = page.getByRole('navigation');
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout-step-one.html');
  }

  async gotoStepTwo(): Promise<void> {
    await this.page.goto('/checkout-step-two.html');
  }
}
