# Cart Test Cases

Cart cases start with the configured products in the cart, then verify its
contents, item removal, badge updates, and navigation to other parts of the
shopping flow.

**Automation:** [`tests/cart.spec.ts`](../../tests/cart.spec.ts)  
**Page object:** [`pages/CartPage.ts`](../../pages/CartPage.ts)  
**Setup helper:** [`seedData`](../../utils/helpers.ts)  
**Product data:** [`test-data/items.json`](../../test-data/items.json)

| Case ID   | Automated behavior                            | Tags                    |
| --------- | --------------------------------------------- | ----------------------- |
| `CART_01` | Checkout button opens checkout step one       | `@smoke`, `@regression` |
| `CART_02` | Continue-shopping button returns to inventory | `@regression`           |
| `CART_03` | An item can be removed from the cart          | `@regression`           |
| `CART_04` | Cart item name opens its product page         | `@regression`           |
| `CART_05` | Cart hamburger menu opens                     | `@regression`           |
| `CART_06` | Cart menu can navigate to inventory           | `@regression`           |
| `CART_07` | User can log out from cart                    | `@regression`           |
| `CART_08` | Cart badge updates after removing a product   | `@regression`           |
| `CART_09` | Cart displays the expected items              | `@smoke`, `@regression` |

The cart setup is performed in `beforeEach` using the shared product data, so
each case can verify its own expected result without depending on another
test's cart changes.

## Source case sheet

[Cart test cases](https://docs.google.com/spreadsheets/d/1zUga0D558-Frx4-68WYPwKo2BDJZKSrVfQl-CBeidB8/edit?usp=sharing)
