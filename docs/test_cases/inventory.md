# Inventory Test Cases

Inventory cases verify product actions and the resulting cart state, the
inventory navigation menu, and the available sort orders. Each test navigates
to the inventory page before exercising its behavior.

**Automation:** [`tests/inventory.spec.ts`](../../tests/inventory.spec.ts)  
**Page object:** [`pages/InventoryPage.ts`](../../pages/InventoryPage.ts)  
**Product data:** [`test-data/items.json`](../../test-data/items.json)

| Case ID | Automated behavior | Tags |
| --- | --- | --- |
| `INVENTORY_01` | An item can be added to the cart | `@smoke`, `@regression` |
| `INVENTORY_02` | An item can be removed from the cart | `@regression` |
| `INVENTORY_03` | Cart badge appears after adding an item | `@smoke`, `@regression` |
| `INVENTORY_04` | Cart badge disappears after removing the last item | `@regression` |
| `INVENTORY_05` | Inventory hamburger menu opens | `@regression` |
| `INVENTORY_06` | Cart counter increments when another item is added | `@regression` |
| `INVENTORY_07` | Cart counter decrements when an item is removed | `@regression` |
| `INVENTORY_08` | User can log out from inventory | `@regression` |
| `INVENTORY_09` | Inventory sorts by name ascending | `@regression` |
| `INVENTORY_10` | Inventory sorts by name descending | `@regression` |
| `INVENTORY_11` | Inventory sorts by price low-to-high | `@regression` |
| `INVENTORY_12` | Inventory sorts by price high-to-low | `@regression` |
| `INVENTORY_13` | Cart icon opens the cart | `@smoke`, `@regression` |

The sorting cases compare the displayed product names or prices with a sorted
copy of the displayed values. Cart-related checks use the product names and
prices in `test-data/items.json`.

## Source case sheet

[Inventory test cases](https://docs.google.com/spreadsheets/d/12zLmeFsptMof0UDNZAl0u_bWJLpKqj-zGT3WJuhAB64/edit?usp=sharing)