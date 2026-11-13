import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipCode: Locator;
  readonly submitButton: Locator;
  readonly alertMsg: Locator;
  readonly cancelButton: Locator;
  readonly dismissButton: Locator;
  readonly finishButton: Locator;
  readonly checkoutItems: Locator;
  readonly cartTitle: Locator;
  readonly cartPrice: Locator;
  readonly totalPrice: Locator;
  readonly subtotalPrice: Locator;
  readonly taxPrice: Locator;
  readonly backHomeButton: Locator;
  readonly generateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.backHomeButton = page.getByTestId('back-to-products');
    this.generateButton = page.getByTestId('generate-pdf-order');
    this.cartTitle = page.getByTestId('inventory-item-name');
    this.cartPrice = page.getByTestId('inventory-item-price');
    this.checkoutItems = page.getByTestId('inventory-item');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.dismissButton = page.getByTestId('error-button');
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.subtotalPrice = page.getByTestId('subtotal-label');
    this.taxPrice = page.getByTestId('tax-label');
    this.totalPrice = page.getByTestId('total-label');
    this.zipCode = page.getByPlaceholder('Zip/Postal Code');
    this.submitButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.alertMsg = page.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/checkout-step-one.html');
  }

  async gotoStepTwo(): Promise<void> {
    await this.navigateTo('/checkout-step-two.html');
  }

  async gotoCompleted(): Promise<void> {
    await this.navigateTo('/checkout-complete.html');
  }
}
