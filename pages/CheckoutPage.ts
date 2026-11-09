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
  readonly dismissButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.dismissButton = page.getByTestId('error-button');
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
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
}
