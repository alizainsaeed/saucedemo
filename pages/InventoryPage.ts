import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page
      .getByTestId("inventory-list")
      .getByTestId("inventory-item");
  }

  async goto(): Promise<void> {
    await this.page.goto("/inventory.html");
  }

  async findItem(itemName: string): Promise<Locator> {
    const item = this.inventoryItems.filter({
      has: this.page
        .getByTestId("inventory-item-name")
        .getByText(itemName, { exact: true }),
    });

    await expect(item).toHaveCount(1);
    return item;
  }

  async addToCart(itemName: string): Promise<void> {
    const item = await this.findItem(itemName);
    await item.getByRole("button", { name: "Add to cart", exact: true }).click();
  }
}
